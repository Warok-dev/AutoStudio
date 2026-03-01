"""Run the full client website generation pipeline from repo root."""

import argparse
import shutil
import subprocess
import sys
from pathlib import Path


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run full pipeline for one client.")
    parser.add_argument("--client", required=True, help="Client identifier (example: pulsedesk)")
    parser.add_argument("--form", required=True, help="Path to form response JSON (example: tools/sample_form_response.json)")
    parser.add_argument(
        "--preview",
        default="TODO_ADD_PREVIEW_URL",
        help="Preview URL passed to make_delivery.py (default: TODO_ADD_PREVIEW_URL)",
    )
    return parser


def run_command(step_label: str, command: list[str], cwd: Path) -> None:
    print(f"{step_label} Running: {' '.join(command)}", flush=True)
    result = subprocess.run(command, cwd=str(cwd), check=False)
    if result.returncode != 0:
        raise RuntimeError(f"{step_label} Failed with exit code {result.returncode}")
    print(f"{step_label} Done", flush=True)


def main() -> None:
    args = build_arg_parser().parse_args()

    client_id = args.client.strip()
    form_path_input = args.form.strip()
    preview_url = args.preview.strip() or "TODO_ADD_PREVIEW_URL"

    if not client_id:
        raise ValueError("Client id cannot be empty.")
    if not form_path_input:
        raise ValueError("Form path cannot be empty.")

    repo_root = Path(__file__).resolve().parent.parent
    form_path = (repo_root / form_path_input).resolve()
    if not form_path.exists():
        raise FileNotFoundError(f"Form JSON not found: {form_path}")

    client_dir = repo_root / "clients" / client_id
    brief_path = client_dir / "brief.md"
    client_spec_path = client_dir / "spec.json"
    web_spec_path = repo_root / "apps" / "web" / "src" / "data" / "spec.json"

    print("Starting full pipeline", flush=True)
    print(f"Client: {client_id}", flush=True)
    print(f"Form: {form_path}", flush=True)

    # 1) form_to_brief -> clients/<client>/brief.md
    run_command(
        "[1/5]",
        [
            sys.executable,
            "tools/form_to_brief.py",
            "--in",
            str(form_path.relative_to(repo_root)),
            "--out",
            str(brief_path.relative_to(repo_root)),
        ],
        repo_root,
    )

    # 2) backend/main.py -> clients/<client>/spec.json
    run_command(
        "[2/5]",
        [
            sys.executable,
            "backend/main.py",
            str(brief_path.relative_to(repo_root)),
            "--out",
            str(client_spec_path.relative_to(repo_root)),
        ],
        repo_root,
    )

    # 3) copy clients/<client>/spec.json -> apps/web/src/data/spec.json
    print("[3/5] Copying generated client spec into web app", flush=True)
    if not client_spec_path.exists():
        raise FileNotFoundError(f"Generated spec not found: {client_spec_path}")
    web_spec_path.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(client_spec_path, web_spec_path)
    print(f"[3/5] Done: {client_spec_path.relative_to(repo_root)} -> {web_spec_path.relative_to(repo_root)}", flush=True)

    # 4) run Next build
    run_command("[4/5]", ["powershell", "-Command", "npm run build"], repo_root / "apps" / "web")

    # 5) make_delivery.py
    run_command(
        "[5/5]",
        [
            sys.executable,
            "tools/make_delivery.py",
            "--client",
            client_id,
            "--preview",
            preview_url,
        ],
        repo_root,
    )

    print("Pipeline completed successfully", flush=True)


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"Pipeline failed: {exc}", flush=True)
        raise SystemExit(1)
