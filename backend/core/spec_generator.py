"""Generate a clean JSON-ready specification from parsed brief data."""

from datetime import datetime, timezone


def _normalize_heading(heading: str) -> str:
    return heading.strip().lower().replace(" ", "_")


def _first_text(section: dict) -> str:
    content = section.get("content", [])
    return content[0] if content else ""


def _build_section_entry(section_type: str) -> dict:
    return {
        "type": section_type,
        "title": section_type.replace("_", " ").title(),
    }


def generate_spec(parsed_brief: dict) -> dict:
    """Build a landing-page oriented structured spec dictionary."""
    section_map = {
        _normalize_heading(section["heading"]): section for section in parsed_brief.get("sections", [])
    }

    sections_list = section_map.get("sections", {}).get("bullets", [])
    structured_sections = [_build_section_entry(section_type) for section_type in sections_list]

    return {
        "meta": {
            "generated_at_utc": datetime.now(timezone.utc).isoformat(),
            "source_file": parsed_brief.get("source_file", ""),
        },
        "brandName": _first_text(section_map.get("brand", {})),
        "tagline": _first_text(section_map.get("tagline", {})),
        "audience": _first_text(section_map.get("audience", {})),
        "theme": {
            "primaryColor": _first_text(section_map.get("primary_color", {})),
            "accentColor": _first_text(section_map.get("accent_color", {})),
            "tone": _first_text(section_map.get("tone", {})),
        },
        "cta": {
            "primary": _first_text(section_map.get("primary_cta", {})),
            "secondary": _first_text(section_map.get("secondary_cta", {})),
        },
        "sections": structured_sections,
    }
