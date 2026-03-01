import type { FaqItem, LandingSection } from "@/src/types/spec";

type FaqProps = {
  section: LandingSection;
  faq: FaqItem[];
};

export default function Faq({ section, faq }: FaqProps) {
  const subtitle = section.subheadline ?? "";

  return (
    <section id="faq" className="bg-white py-24 md:py-28">
      <div className="max-w-3xl mx-auto px-6 space-y-5">
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">{section.title ?? "FAQ"}</h2>
        {subtitle ? <p className="mb-10 text-zinc-700">{subtitle}</p> : null}
        {faq.map((item, index) => (
          <details key={index} className="group bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <summary className="cursor-pointer list-none text-base font-semibold text-zinc-900">
              <span className="flex items-center justify-between gap-3">
                <span>{item.question}</span>
                <span className="text-zinc-400 transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </span>
            </summary>
            <div className="grid grid-rows-[0fr] transition-all duration-300 group-open:grid-rows-[1fr]">
              <p className="mt-3 overflow-hidden text-zinc-700">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
