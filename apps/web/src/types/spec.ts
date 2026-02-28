export type SectionType =
  | "hero"
  | "features"
  | "testimonials"
  | "faq"
  | "cta"
  | "footer";

export type LandingSection = {
  type: SectionType | string;
  title?: string;
  headline?: string;
  subheadline?: string;
  subtext?: string;
  primary?: string;
  secondary?: string;
  note?: string;
  items?: Array<{
    title?: string;
    description?: string;
    name?: string;
    quote?: string;
    q?: string;
    a?: string;
  }>;
  [key: string]: unknown;
};

export type LandingSpec = {
  meta: {
    generated_at_utc: string;
    source_file: string;
  };
  brandName: string;
  tagline: string;
  audience: string;
  theme: {
    primaryColor: string;
    accentColor: string;
    tone: string;
  };
  cta: {
    primary: string;
    secondary: string;
  };
  sections: LandingSection[];
};

export type Spec = LandingSpec;
