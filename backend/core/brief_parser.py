"""Parse a markdown brief into a structured intermediate representation."""

from pathlib import Path


def parse_brief(markdown_path: str) -> dict:
    """Read a markdown brief and extract title and section content."""
    path = Path(markdown_path)
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()

    title = ""
    sections = []
    current = {"heading": "General", "content": [], "bullets": []}

    for raw_line in lines:
        line = raw_line.strip()
        if not line:
            continue

        if line.startswith("# "):
            title = line[2:].strip()
            continue

        if line.startswith("## "):
            if current["content"] or current["bullets"] or current["heading"] != "General":
                sections.append(
                    {
                        "heading": current["heading"],
                        "content": current["content"],
                        "bullets": current["bullets"],
                    }
                )
            current = {"heading": line[3:].strip(), "content": [], "bullets": []}
            continue

        if line.startswith("- "):
            current["bullets"].append(line[2:].strip())
        else:
            current["content"].append(line)

    if current["content"] or current["bullets"] or current["heading"] != "General":
        sections.append(
            {
                "heading": current["heading"],
                "content": current["content"],
                "bullets": current["bullets"],
            }
        )

    return {
        "source_file": str(path),
        "title": title or path.stem,
        "sections": sections,
    }
