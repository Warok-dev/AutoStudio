import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

export type ParsedBrief = {
  brandName: string;
  tagline: string;
  businessDescription: string;
  audience: string;
  mainGoal: string;
  packageName: string;
  ctaPrimary: string;
  ctaSecondary: string;
  pages: string[];
  brandColors: {
    primary: string;
  };
};

export type BriefData = {
  raw: string;
  parsed: ParsedBrief;
};

function stripQuotes(value: string) {
  return value.replace(/^["']|["']$/g, "").trim();
}

export function toPageSlug(page: string) {
  return page.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function parseBrief(content: string): ParsedBrief {
  const parsed: ParsedBrief = {
    brandName: "",
    tagline: "",
    businessDescription: "",
    audience: "",
    mainGoal: "",
    packageName: "",
    ctaPrimary: "",
    ctaSecondary: "",
    pages: [],
    brandColors: {
      primary: "#2563eb",
    },
  };

  let currentSection = "";

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.replace(/\t/g, "  ");
    const trimmed = line.trim();

    if (!trimmed) {
      continue;
    }

    if (!line.startsWith(" ")) {
      currentSection = "";
    }

    const match = trimmed.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/);

    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;
    const value = stripQuotes(rawValue);

    if (line.startsWith("  ") && currentSection === "brandColors" && key === "primary" && value) {
      parsed.brandColors.primary = value;
      continue;
    }

    if (!line.startsWith(" ")) {
      currentSection = value ? "" : key;
    }

    switch (key) {
      case "brandName":
        parsed.brandName = value;
        break;
      case "tagline":
        parsed.tagline = value;
        break;
      case "businessDescription":
        parsed.businessDescription = value;
        break;
      case "audience":
        parsed.audience = value;
        break;
      case "mainGoal":
        parsed.mainGoal = value;
        break;
      case "package":
        parsed.packageName = value;
        break;
      case "ctaPrimary":
        parsed.ctaPrimary = value;
        break;
      case "ctaSecondary":
        parsed.ctaSecondary = value;
        break;
      case "pages":
        parsed.pages = value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
        break;
      default:
        break;
    }
  }

  return parsed;
}

export async function loadBrief(id: string): Promise<BriefData | null> {
  if (!/^\d+$/.test(id)) {
    return null;
  }

  const briefPaths = [
    path.resolve(process.cwd(), "..", "..", "clients", id, "brief.md"),
    path.resolve(process.cwd(), "public", "clients", id, "brief.md"),
  ];

  for (const briefPath of briefPaths) {
    if (!existsSync(briefPath)) {
      continue;
    }

    try {
      const raw = await readFile(briefPath, "utf8");

      return {
        raw,
        parsed: parseBrief(raw),
      };
    } catch {
      return null;
    }
  }

  return null;
}

export function getBriefDefaults(parsed: ParsedBrief, id: string) {
  return {
    accentColor: parsed.brandColors.primary || "#2563eb",
    brandName: parsed.brandName || `Client ${id}`,
    tagline: parsed.tagline || "A focused landing page generated from the client brief.",
    businessDescription:
      parsed.businessDescription || "This page summarizes the business and turns the brief into a simple web presence.",
    audience: parsed.audience || "Audience details are not available in this brief yet.",
    mainGoal: parsed.mainGoal || "Present the offer clearly and guide visitors to the primary action.",
    packageName: parsed.packageName || "Custom",
    ctaPrimary: parsed.ctaPrimary || "Get Started",
    ctaSecondary: parsed.ctaSecondary || "Contact Us",
  };
}
