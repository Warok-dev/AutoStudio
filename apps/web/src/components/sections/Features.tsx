import type { LandingSection } from "@/src/types/spec";

type FeaturesProps = {
  section: LandingSection;
};

const defaultFeatures = ["Unified dashboard", "Faster project delivery", "Simple collaboration"];

export default function Features({ section }: FeaturesProps) {
  const items = section.items ?? [];

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-14">
      <h2 className="text-2xl font-semibold">{section.title ?? "Features"}</h2>
      <ul className="mt-6 grid gap-3 md:grid-cols-3">
        {items.length > 0
          ? items.map((feature, index) => (
              <li key={`${feature.title ?? "feature"}-${index}`} className="rounded-lg border border-zinc-200 p-4">
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{feature.description}</p>
              </li>
            ))
          : defaultFeatures.map((feature) => (
              <li key={feature} className="rounded-lg border border-zinc-200 p-4">
                {feature}
              </li>
            ))}
      </ul>
    </section>
  );
}
