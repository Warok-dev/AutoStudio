"""Convert Google Form-style JSON responses into a client brief markdown file."""

import argparse
import json
import re
from pathlib import Path
from typing import Any


DEFAULT_SECTIONS = ["hero", "features", "testimonials", "faq", "cta", "footer"]


def _normalize_key(value: str) -> str:
    return "".join(ch for ch in value.lower() if ch.isalnum())


def _collect_key_values(node: Any) -> list[tuple[str, Any]]:
    pairs: list[tuple[str, Any]] = []
    if isinstance(node, dict):
        for key, value in node.items():
            pairs.append((str(key), value))
            pairs.extend(_collect_key_values(value))
    elif isinstance(node, list):
        for item in node:
            pairs.extend(_collect_key_values(item))
    return pairs


def _pick_value(data: Any, aliases: list[str], default: Any = None) -> Any:
    if data is None:
        return default

    pairs = _collect_key_values(data)
    if not pairs:
        return default

    normalized_aliases = [_normalize_key(alias) for alias in aliases]

    for key, value in pairs:
        normalized_key = _normalize_key(key)
        if normalized_key in normalized_aliases:
            return value

    for key, value in pairs:
        normalized_key = _normalize_key(key)
        if any(alias in normalized_key for alias in normalized_aliases):
            return value

    return default


def _as_text(value: Any, default: str = "") -> str:
    if value is None:
        return default
    if isinstance(value, str):
        text = value.strip()
        return text if text else default
    if isinstance(value, (int, float, bool)):
        return str(value)
    if isinstance(value, list):
        parts = [_as_text(item) for item in value]
        parts = [part for part in parts if part]
        return ", ".join(parts) if parts else default
    if isinstance(value, dict):
        return default
    return default


def _parse_json_if_possible(value: Any) -> Any:
    if isinstance(value, str):
        trimmed = value.strip()
        if trimmed.startswith("{") or trimmed.startswith("["):
            try:
                return json.loads(trimmed)
            except json.JSONDecodeError:
                return value
    return value


def _as_string_list(value: Any, default: list[str] | None = None) -> list[str]:
    value = _parse_json_if_possible(value)
    if isinstance(value, list):
        out = [_as_text(item) for item in value]
        out = [item for item in out if item]
        return out if out else (default or [])
    if isinstance(value, str):
        tokens = re.split(r"[\n,;]+", value)
        out = [token.strip() for token in tokens if token.strip()]
        return out if out else (default or [])
    return default or []


def _extract_colors(data: Any) -> tuple[str, str]:
    primary = _as_text(
        _pick_value(
            data,
            ["primaryColor", "primary color", "primary_colour", "primary colour"],
        )
    )
    accent = _as_text(
        _pick_value(
            data,
            ["accentColor", "accent color", "secondaryColor", "secondary color"],
        )
    )

    colors_obj = _parse_json_if_possible(_pick_value(data, ["colors", "theme", "color palette"]))
    if isinstance(colors_obj, dict):
        if not primary:
            primary = _as_text(colors_obj.get("primary") or colors_obj.get("primaryColor"))
        if not accent:
            accent = _as_text(colors_obj.get("accent") or colors_obj.get("accentColor") or colors_obj.get("secondary"))

    if not primary or not accent:
        colors_text = _as_text(colors_obj if isinstance(colors_obj, str) else None)
        if colors_text:
            hex_codes = re.findall(r"#[0-9a-fA-F]{6}", colors_text)
            if not primary and len(hex_codes) >= 1:
                primary = hex_codes[0]
            if not accent and len(hex_codes) >= 2:
                accent = hex_codes[1]

    return primary or "#1D4ED8", accent or "#F59E0B"


def _extract_cta(data: Any) -> tuple[str, str]:
    primary = _as_text(
        _pick_value(
            data,
            ["primaryCta", "primary cta", "primary call to action", "ctaPrimary"],
        )
    )
    secondary = _as_text(
        _pick_value(
            data,
            ["secondaryCta", "secondary cta", "secondary call to action", "ctaSecondary"],
        )
    )

    cta_value = _parse_json_if_possible(_pick_value(data, ["cta", "calls to action"]))
    if isinstance(cta_value, dict):
        if not primary:
            primary = _as_text(cta_value.get("primary"))
        if not secondary:
            secondary = _as_text(cta_value.get("secondary"))
    elif isinstance(cta_value, str) and not (primary and secondary):
        parts = [part.strip() for part in re.split(r"[\n|,;]+", cta_value) if part.strip()]
        if not primary and len(parts) >= 1:
            primary = parts[0]
        if not secondary and len(parts) >= 2:
            secondary = parts[1]

    return primary or "Start Free Trial", secondary or "Book a Demo"


def _coerce_feature_items(value: Any) -> list[dict[str, str]]:
    value = _parse_json_if_possible(value)
    items: list[dict[str, str]] = []

    if isinstance(value, str):
        for line in _as_string_list(value):
            if "|" in line:
                title, description = [part.strip() for part in line.split("|", 1)]
            else:
                title, description = line, ""
            items.append({"title": title, "description": description})
        return items

    if isinstance(value, dict):
        value = value.get("items", [])

    if isinstance(value, list):
        for item in value:
            if isinstance(item, dict):
                title = _as_text(item.get("title") or item.get("name") or item.get("feature"))
                description = _as_text(item.get("description") or item.get("details") or item.get("text"))
                if title or description:
                    items.append({"title": title or "Feature", "description": description})
            else:
                text = _as_text(item)
                if text:
                    items.append({"title": text, "description": ""})
    return items


def _coerce_testimonial_items(value: Any) -> list[dict[str, str]]:
    value = _parse_json_if_possible(value)
    items: list[dict[str, str]] = []

    if isinstance(value, dict):
        value = value.get("items", [])

    if isinstance(value, str):
        for line in _as_string_list(value):
            parts = [part.strip() for part in line.split("|")]
            quote = parts[0] if parts else ""
            name = parts[1] if len(parts) > 1 else ""
            role = parts[2] if len(parts) > 2 else ""
            if quote:
                items.append({"quote": quote, "name": name, "role": role})
        return items

    if isinstance(value, list):
        for item in value:
            if isinstance(item, dict):
                quote = _as_text(item.get("quote") or item.get("text"))
                name = _as_text(item.get("name") or item.get("author"))
                role = _as_text(item.get("role") or item.get("title"))
                if quote:
                    items.append({"quote": quote, "name": name, "role": role})
            else:
                quote = _as_text(item)
                if quote:
                    items.append({"quote": quote, "name": "", "role": ""})
    return items


def _coerce_faq_items(value: Any) -> list[dict[str, str]]:
    value = _parse_json_if_possible(value)
    items: list[dict[str, str]] = []

    if isinstance(value, dict):
        value = value.get("items", [])

    if isinstance(value, str):
        for line in _as_string_list(value):
            parts = [part.strip() for part in line.split("|", 1)]
            question = parts[0] if parts else ""
            answer = parts[1] if len(parts) > 1 else ""
            if question:
                items.append({"question": question, "answer": answer})
        return items

    if isinstance(value, list):
        for item in value:
            if isinstance(item, dict):
                question = _as_text(item.get("question") or item.get("q"))
                answer = _as_text(item.get("answer") or item.get("a"))
                if question:
                    items.append({"question": question, "answer": answer})
            else:
                question = _as_text(item)
                if question:
                    items.append({"question": question, "answer": ""})
    return items


def _extract_response_object(payload: Any) -> Any:
    if isinstance(payload, list):
        return payload[0] if payload else {}

    if isinstance(payload, dict):
        for key in ["responses", "items", "entries"]:
            value = payload.get(key)
            if isinstance(value, list) and value:
                return value[0]
    return payload


def build_brief_markdown(response_data: Any) -> str:
    brand_name = _as_text(_pick_value(response_data, ["brandName", "brand", "company name"]), "Demo Brand")
    tagline = _as_text(_pick_value(response_data, ["tagline", "slogan"]), "Clear value proposition here.")
    audience = _as_text(_pick_value(response_data, ["audience", "target audience"]), "General audience.")
    tone = _as_text(_pick_value(response_data, ["tone", "brand tone", "voice"]), "Confident, clean, and helpful.")

    primary_color, accent_color = _extract_colors(response_data)
    sections = _as_string_list(_pick_value(response_data, ["sections", "required sections", "page sections"]), DEFAULT_SECTIONS)
    primary_cta, secondary_cta = _extract_cta(response_data)

    features = _coerce_feature_items(_pick_value(response_data, ["features", "key features", "feature list"]))
    testimonials = _coerce_testimonial_items(_pick_value(response_data, ["testimonials", "social proof"]))
    faq = _coerce_faq_items(_pick_value(response_data, ["faq", "frequently asked questions"]))

    lines: list[str] = []
    lines.append("# Client Brief - Landing Page")
    lines.append("")
    lines.append("## Brand")
    lines.append(brand_name)
    lines.append("")
    lines.append("## Tagline")
    lines.append(tagline)
    lines.append("")
    lines.append("## Audience")
    lines.append(audience)
    lines.append("")
    lines.append("## Primary Color")
    lines.append(primary_color)
    lines.append("")
    lines.append("## Accent Color")
    lines.append(accent_color)
    lines.append("")
    lines.append("## Tone")
    lines.append(tone)
    lines.append("")
    lines.append("## Sections")
    for section in sections:
        lines.append(f"- {section}")
    lines.append("")
    lines.append("## Features")
    if features:
        for item in features:
            title = item.get("title", "").strip() or "Feature"
            description = item.get("description", "").strip()
            lines.append(f"- {title}: {description}" if description else f"- {title}")
    else:
        lines.append("- Feature title: Feature description")
    lines.append("")
    lines.append("## Testimonials")
    if testimonials:
        for item in testimonials:
            quote = item.get("quote", "").strip()
            name = item.get("name", "").strip()
            role = item.get("role", "").strip()
            if quote and (name or role):
                suffix = " - ".join(part for part in [name, role] if part)
                lines.append(f'- "{quote}" ({suffix})')
            elif quote:
                lines.append(f'- "{quote}"')
    else:
        lines.append('- "Great product." (Customer Name - Role)')
    lines.append("")
    lines.append("## FAQ")
    if faq:
        for item in faq:
            question = item.get("question", "").strip()
            answer = item.get("answer", "").strip()
            lines.append(f"- Q: {question}")
            lines.append(f"  A: {answer}")
    else:
        lines.append("- Q: Example question?")
        lines.append("  A: Example answer.")
    lines.append("")
    lines.append("## Primary CTA")
    lines.append(primary_cta)
    lines.append("")
    lines.append("## Secondary CTA")
    lines.append(secondary_cta)
    lines.append("")

    return "\n".join(lines)


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Convert Google Form response JSON to brief.md.")
    parser.add_argument("--in", dest="input_path", required=True, help="Path to form response JSON.")
    parser.add_argument("--out", dest="output_path", required=True, help="Path to generated brief.md.")
    return parser


def main() -> None:
    args = build_arg_parser().parse_args()
    input_path = Path(args.input_path)
    output_path = Path(args.output_path)

    if not input_path.exists():
        raise FileNotFoundError(f"Input JSON not found: {input_path}")

    payload = json.loads(input_path.read_text(encoding="utf-8"))
    response_data = _extract_response_object(payload)
    markdown = build_brief_markdown(response_data)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(markdown, encoding="utf-8")
    print(f"Generated brief: {output_path}")


if __name__ == "__main__":
    main()
