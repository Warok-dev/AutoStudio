"""Create delivery package files for a client from shared templates."""

import argparse
import shutil
from pathlib import Path


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Create delivery package for a client.")
    parser.add_argument("--client", required=True, help="Client identifier (example: pulsedesk)")
    parser.add_argument("--preview", default="TODO_ADD_PREVIEW_URL", help="Preview URL to include in preview_url.txt")
    return parser


def _copy_template(src: Path, dst: Path) -> None:
    if not src.exists():
        raise FileNotFoundError(f"Template not found: {src}")
    shutil.copyfile(src, dst)


def main() -> None:
    args = build_arg_parser().parse_args()
    client_id = args.client.strip()
    preview_url = args.preview.strip() or "TODO_ADD_PREVIEW_URL"

    if not client_id:
        raise ValueError("Client id cannot be empty.")

    repo_root = Path(__file__).resolve().parent.parent
    templates_dir = repo_root / "deliveries" / "_templates"
    delivery_dir = repo_root / "deliveries" / client_id
    delivery_dir.mkdir(parents=True, exist_ok=True)

    generated_paths: list[Path] = []

    qa_template = templates_dir / "qa_checklist.md"
    qa_target = delivery_dir / "qa_checklist.md"
    _copy_template(qa_template, qa_target)
    generated_paths.append(qa_target)

    handoff_template = templates_dir / "handoff.md"
    handoff_target = delivery_dir / "handoff.md"
    _copy_template(handoff_template, handoff_target)
    generated_paths.append(handoff_target)

    preview_target = delivery_dir / "preview_url.txt"
    preview_target.write_text(f"{preview_url}\n", encoding="utf-8")
    generated_paths.append(preview_target)

    summary_target = delivery_dir / "summary.txt"
    summary_lines = [
        f"Delivery package generated for client: {client_id}",
        "",
        "Files generated:",
    ]
    summary_lines.extend(f"- {path.relative_to(repo_root)}" for path in generated_paths)
    summary_lines.append("")
    summary_lines.append("Preview URL:")
    summary_lines.append(preview_url)
    summary_lines.append("")
    summary_target.write_text("\n".join(summary_lines), encoding="utf-8")
    generated_paths.append(summary_target)

    print(f"Created delivery folder: {delivery_dir}")
    for path in generated_paths:
        print(f"- {path.relative_to(repo_root)}")


if __name__ == "__main__":
    main()
