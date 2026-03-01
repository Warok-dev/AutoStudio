import type { LandingSection, TestimonialItem } from "@/src/types/spec";

type TestimonialsProps = {
  section: LandingSection;
  testimonials: TestimonialItem[];
};

export default function Testimonials({ section, testimonials }: TestimonialsProps) {
  const subtitle = section.subheadline ?? "";

  return (
    <section id="testimonials" className="bg-slate-50 py-24 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="mb-10 text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">{section.title ?? "Testimonials"}</h2>
        {subtitle ? <p className="-mt-6 mb-12 max-w-2xl text-zinc-700">{subtitle}</p> : null}
        <div className="space-y-12 md:space-y-14">
          {testimonials.map((t, index) => (
            <article key={index} className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-md">
              <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-700" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path
                    d="M8 12H5.5A1.5 1.5 0 0 1 4 10.5V8a4 4 0 0 1 4-4h1M19 12h-2.5a1.5 1.5 0 0 1-1.5-1.5V8a4 4 0 0 1 4-4h1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="text-lg leading-relaxed text-zinc-900">{t.quote}</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-semibold text-zinc-800">
                  {(t.author ?? "U").charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-zinc-950">{t.author}</p>
                  {t.role ? <p className="text-sm text-zinc-700">{t.role}</p> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
