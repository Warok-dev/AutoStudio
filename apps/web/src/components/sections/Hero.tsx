import type { LandingSection, LandingSpec } from "@/src/types/spec";

type HeroProps = {
  section: LandingSection;
  spec: LandingSpec;
};

export default function Hero({ section, spec }: HeroProps) {
  const headline = section.headline ?? spec.tagline;
  const subheadline = section.subheadline ?? spec.audience;

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: spec.theme.primaryColor }}>
        {spec.brandName}
      </p>
      <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">{headline}</h1>
      <p className="mx-auto mt-4 max-w-2xl text-zinc-600">{subheadline}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          className="rounded-md px-5 py-2 text-sm font-semibold text-white"
          style={{ backgroundColor: spec.theme.primaryColor }}
        >
          {spec.cta.primary}
        </button>
        <button
          className="rounded-md border px-5 py-2 text-sm font-semibold"
          style={{ borderColor: spec.theme.accentColor, color: spec.theme.accentColor }}
        >
          {spec.cta.secondary}
        </button>
      </div>
    </section>
  );
}
