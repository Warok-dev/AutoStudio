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

export type SiteTheme = {
  accentColor: string;
  heroGradient: string;
  pageBackground: string;
  sectionTint: string;
};

export type SiteHero = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
};

export type SiteAbout = {
  eyebrow: string;
  title: string;
  description: string;
};

export type SiteOffer = {
  eyebrow: string;
  title: string;
  description: string;
  highlight: string;
};

export type SiteBenefit = {
  title: string;
  description: string;
};

export type SiteAudience = {
  eyebrow: string;
  title: string;
  description: string;
};

export type SitePagePreview = {
  name: string;
  slug: string;
  description: string;
};

export type SiteFaqItem = {
  question: string;
  answer: string;
};

export type SiteCta = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
};

export type SiteData = {
  brandName: string;
  briefUrl: string;
  navigation: Array<{
    href: string;
    label: string;
  }>;
  hero: SiteHero;
  about: SiteAbout;
  offer: SiteOffer;
  benefits: SiteBenefit[];
  audience: SiteAudience;
  pages: SitePagePreview[];
  faq: SiteFaqItem[];
  cta: SiteCta;
  theme: SiteTheme;
};

function stripQuotes(value: string) {
  return value.replace(/^["']|["']$/g, "").trim();
}

function firstSentence(value: string, fallback: string) {
  const sentence = value
    .split(/[.!?]+/)
    .map((part) => part.trim())
    .find(Boolean);

  return sentence || fallback;
}

function toSentenceCase(value: string) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toLowerCase() + value.slice(1);
}

function deriveBenefits(businessDescription: string, mainGoal: string, audience: string): SiteBenefit[] {
  return [
    {
      title: "Fast launch",
      description: firstSentence(
        businessDescription,
        "Launch a focused marketing site quickly without rewriting the brief from scratch.",
      ),
    },
    {
      title: "Designed to convert",
      description: `Keep the experience centered on ${toSentenceCase(mainGoal)}.`,
    },
    {
      title: "Built for small businesses",
      description: `Shape the message around ${toSentenceCase(audience)} with a clear, credible offer.`,
    },
  ];
}

function derivePageDescription(page: string, defaults: ReturnType<typeof getBriefDefaults>) {
  const slug = toPageSlug(page);

  switch (slug) {
    case "home":
      return `Lead with ${defaults.tagline} and guide visitors toward ${toSentenceCase(defaults.mainGoal)}.`;
    case "about":
      return `Explain what ${defaults.brandName} does and why it matters to ${toSentenceCase(defaults.audience)}.`;
    case "services":
      return `Turn the core offer into a clear service story tied to ${toSentenceCase(defaults.mainGoal)}.`;
    case "pricing":
      return `Frame the ${defaults.packageName} package in a way that reduces friction and supports the main action.`;
    case "contact":
      return `Make it easy to act with ${defaults.ctaPrimary} and a clean secondary path through ${defaults.ctaSecondary}.`;
    case "faq":
      return `Answer the main objections before they slow down ${toSentenceCase(defaults.mainGoal)}.`;
    case "testimonials":
      return "Reinforce trust with proof points, outcomes, and concise customer validation.";
    default:
      return `Support the wider site narrative with a focused page for ${page.toLowerCase()}.`;
  }
}

function deriveFaq(defaults: ReturnType<typeof getBriefDefaults>): SiteFaqItem[] {
  return [
    {
      question: `What does ${defaults.brandName} help with?`,
      answer: `${defaults.brandName} helps ${toSentenceCase(defaults.audience)} by focusing the experience on ${toSentenceCase(defaults.mainGoal)}.`,
    },
    {
      question: "Who is this built for?",
      answer: `The site is designed for ${toSentenceCase(defaults.audience)} and keeps the positioning aligned with the brief's core business description.`,
    },
    {
      question: "What should a visitor do next?",
      answer: `The primary next step is ${defaults.ctaPrimary}, with ${defaults.ctaSecondary} available as a lower-friction fallback.`,
    },
  ];
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

export function buildSiteData(parsed: ParsedBrief, id: string): SiteData {
  const defaults = getBriefDefaults(parsed, id);
  const benefits = deriveBenefits(defaults.businessDescription, defaults.mainGoal, defaults.audience);
  const pages = (parsed.pages.length ? parsed.pages : ["Home", "About", "Services", "Contact"])
    .filter(Boolean)
    .map((page) => ({
      name: page,
      slug: toPageSlug(page),
      description: derivePageDescription(page, defaults),
    }));

  return {
    brandName: defaults.brandName,
    briefUrl: `/clients/${id}/brief.md`,
    navigation: [
      { href: "#about", label: "About" },
      { href: "#offer", label: "Offer" },
      { href: "#pages", label: "Pages" },
      { href: "#faq", label: "FAQ" },
      { href: "#cta", label: "CTA" },
    ],
    hero: {
      eyebrow: "Generated marketing site",
      title: defaults.brandName,
      subtitle: defaults.tagline,
      description: `Built to turn attention from ${toSentenceCase(defaults.audience)} into a clearer path toward ${toSentenceCase(defaults.mainGoal)}.`,
      primaryCta: defaults.ctaPrimary,
      secondaryCta: defaults.ctaSecondary,
    },
    about: {
      eyebrow: "About",
      title: "A clearer story, told with more confidence.",
      description: defaults.businessDescription,
    },
    offer: {
      eyebrow: "Offer",
      title: "What this site should drive",
      description: defaults.mainGoal,
      highlight: `Recommended package: ${defaults.packageName}.`,
    },
    benefits,
    audience: {
      eyebrow: "Audience",
      title: "Designed for the people most likely to act.",
      description: defaults.audience,
    },
    pages,
    faq: deriveFaq(defaults),
    cta: {
      eyebrow: "CTA",
      title: "Ready to turn interest into action?",
      description:
        "Keep the next step obvious and low-friction with one clear primary action, one supportive secondary action, and a layout that feels ready for launch.",
      primaryLabel: defaults.ctaPrimary,
      secondaryLabel: defaults.ctaSecondary,
    },
    theme: {
      accentColor: defaults.accentColor,
      heroGradient: `linear-gradient(135deg, ${defaults.accentColor} 0%, ${defaults.accentColor}dd 18%, #0f172a 78%)`,
      pageBackground: "linear-gradient(180deg,#f8fafc_0%,#ffffff_18%,#f8fafc_52%,#ffffff_100%)",
      sectionTint: "rgba(248,250,252,0.86)",
    },
  };
}
