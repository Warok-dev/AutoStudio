import type { LandingSection } from "@/src/types/spec";

type FaqProps = {
  section: LandingSection;
};

export default function Faq({ section }: FaqProps) {
  const items = section.items ?? [];

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-14">
      <h2 className="text-2xl font-semibold">{section.title ?? "FAQ"}</h2>
      <div className="mt-6 space-y-3">
        {items.map((item, index) => (
          <div key={`${item.q ?? "faq"}-${index}`} className="rounded-lg border border-zinc-200 p-4">
            <p className="font-medium">{item.q}</p>
            <p className="mt-1 text-zinc-600">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
