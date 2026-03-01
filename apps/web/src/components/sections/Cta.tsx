import Button from "@/src/components/ui/Button";
import Section from "@/src/components/ui/Section";
import type { LandingSection, LandingSpec } from "@/src/types/spec";

type CtaProps = {
  section: LandingSection;
  spec: LandingSpec;
};

export default function Cta({ section, spec }: CtaProps) {
  const headline = section.headline ?? spec.tagline;
  const subtext = section.subtext ?? spec.audience;
  const primary = section.primary ?? spec.cta.primary;
  const secondary = section.secondary ?? spec.cta.secondary;

  return (
    <Section tone="white">
      <div className="rounded-2xl border border-zinc-200 px-6 py-14 text-center shadow-xl md:px-10 md:py-16" style={{ backgroundColor: `${spec.theme.primaryColor}0D` }}>
        <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl">{headline}</h2>
        <p className="mx-auto mt-4 max-w-xl text-zinc-600">{subtext}</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button className="px-8 py-3 text-base" primaryColor={spec.theme.primaryColor}>
            {primary}
          </Button>
          <Button className="px-6 py-3 text-base" variant="secondary" accentColor={spec.theme.accentColor}>
            {secondary}
          </Button>
        </div>
      </div>
    </Section>
  );
}
