import type { FeatureItem, LandingSection } from "@/src/types/spec";

type FeaturesProps = {
  section: LandingSection;
  primaryColor: string;
  features: FeatureItem[];
};

export default function Features({ section, primaryColor, features }: FeaturesProps) {
  return (
    <section id="features" className="bg-white py-24 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="mb-12 text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">{section.title ?? "Features"}</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={index}
              className="rounded-2xl border border-zinc-200 border-t-2 bg-white p-10 text-left shadow-md transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
              style={{ borderTopColor: `${primaryColor}5C` }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-sky-700" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-zinc-900">{feature.title}</h3>
              <p className="text-sm leading-6 text-zinc-700">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
