import type { LandingSection, LandingSpec } from "@/src/types/spec";

type CtaProps = {
  section: LandingSection;
  spec: LandingSpec;
};

export default function Cta({ section, spec }: CtaProps) {
  const headline = section.headline ?? "Ready to simplify your workflow?";
  const subtext = section.subtext ?? "Start today and see what a focused workspace feels like.";
  const primary = section.primary ?? spec.cta.primary;
  const secondary = section.secondary ?? spec.cta.secondary;

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-14 text-center">
      <h2 className="text-3xl font-semibold">{headline}</h2>
      <p className="mx-auto mt-3 max-w-xl text-zinc-600">{subtext}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button className="rounded-md px-5 py-2 text-sm font-semibold text-white" style={{ backgroundColor: spec.theme.primaryColor }}>
          {primary}
        </button>
        <button className="rounded-md border px-5 py-2 text-sm font-semibold" style={{ borderColor: spec.theme.accentColor, color: spec.theme.accentColor }}>
          {secondary}
        </button>
      </div>
    </section>
  );
}
