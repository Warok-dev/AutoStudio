import type { LandingSection } from "@/src/types/spec";

type TestimonialsProps = {
  section: LandingSection;
};

export default function Testimonials({ section }: TestimonialsProps) {
  const items = section.items ?? [];

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-14">
      <h2 className="text-2xl font-semibold">{section.title ?? "Testimonials"}</h2>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {items.map((item, index) => (
          <article key={`${item.name ?? "testimonial"}-${index}`} className="rounded-lg border border-zinc-200 p-5">
            <p className="text-zinc-700">&ldquo;{item.quote}&rdquo;</p>
            <p className="mt-3 text-sm font-semibold text-zinc-900">{item.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
