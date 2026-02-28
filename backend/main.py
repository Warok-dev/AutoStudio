"""CLI entrypoint for generating a JSON spec from a markdown brief."""

import argparse
import json
from pathlib import Path

from core.brief_parser import parse_brief
from core.spec_generator import generate_spec


def build_arg_parser() -> argparse.ArgumentParser:
    """Create CLI argument parser."""
    parser = argparse.ArgumentParser(description="Generate a JSON spec from a markdown brief.")
    parser.add_argument("brief_path", help="Path to the input markdown brief.")
    parser.add_argument("--out", required=True, help="Path for the generated JSON spec.")
    return parser


def main() -> None:
    """Run the brief-to-spec CLI workflow."""
    args = build_arg_parser().parse_args()
    brief_path = Path(args.brief_path)
    out_path = Path(args.out)

    if not brief_path.exists():
        raise FileNotFoundError(f"Brief file not found: {brief_path}")

    parsed_brief = parse_brief(str(brief_path))
    spec = generate_spec(parsed_brief)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(spec, indent=2), encoding="utf-8")

    print(f"Generated spec: {out_path}")


if __name__ == "__main__":
    main()
