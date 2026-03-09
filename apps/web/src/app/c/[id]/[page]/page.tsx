import Link from "next/link";
import { notFound } from "next/navigation";
import { getBriefDefaults, loadBrief, toPageSlug } from "@/src/app/c/brief";

type ClientSubPageProps = {
  params: Promise<{
    id: string;
    page: string;
  }>;
};

function renderPageContent(page: string, content: ReturnType<typeof getBriefDefaults>) {
  switch (page) {
    case "about":
      return {
        eyebrow: "About",
        title: "What the business does",
        description: content.businessDescription,
        secondaryTitle: "Who it serves",
        secondaryDescription: content.audience,
      };
    case "services":
      return {
        eyebrow: "Services",
        title: "How the offer creates value",
        description: content.mainGoal,
        secondaryTitle: "Approach",
        secondaryDescription:
          "This services page turns the brief into a focused explanation of the offer, the value proposition, and the expected customer outcome.",
      };
    case "pricing":
      return {
        eyebrow: "Pricing",
        title: "Simple package structure",
        description: `Recommended package: ${content.packageName}.`,
        secondaryTitle: "What this pricing page should do",
        secondaryDescription: "Set expectations clearly, reduce friction, and connect the package to the main customer goal.",
      };
    case "contact":
      return {
        eyebrow: "Contact",
        title: "Move the visitor to action",
        description: `Primary CTA: ${content.ctaPrimary}. Secondary CTA: ${content.ctaSecondary}.`,
        secondaryTitle: "Next step",
        secondaryDescription: "Use this page to capture intent, route leads to the right action, and keep the journey simple.",
      };
    case "faq":
      return {
        eyebrow: "FAQ",
        title: "Pre-answer the main objections",
        description: `Support the main goal: ${content.mainGoal}.`,
        secondaryTitle: "Audience context",
        secondaryDescription: `Write answers for ${content.audience.toLowerCase()}.`,
      };
    case "testimonials":
      return {
        eyebrow: "Testimonials",
        title: "Build trust with proof",
        description: "This page is reserved for customer quotes, social proof, and outcome-driven credibility blocks.",
        secondaryTitle: "Positioning",
        secondaryDescription: `Keep the message aligned with ${content.brandName} and its promise: ${content.tagline}`,
      };
    default:
      return {
        eyebrow: "Page",
        title: "Generated page",
        description: content.mainGoal,
        secondaryTitle: "Audience",
        secondaryDescription: content.audience,
      };
  }
}

export default async function ClientSubPage({ params }: ClientSubPageProps) {
  const { id, page } = await params;
  const brief = await loadBrief(id);

  if (!brief) {
    notFound();
  }

  const availablePages = new Set(brief.parsed.pages.map(toPageSlug).filter(Boolean));

  if (!availablePages.has(page) || page === "home") {
    notFound();
  }

  const content = getBriefDefaults(brief.parsed, id);
  const view = renderPageContent(page, content);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_30%,#f4f4f5_100%)] px-6 py-12 text-zinc-900">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <nav className="flex flex-wrap items-center gap-3 border-b border-zinc-200 px-8 py-5 sm:px-10">
            <Link
              href={`/c/${id}`}
              className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Home
            </Link>
            {brief.parsed.pages
              .filter((item) => toPageSlug(item) !== "home")
              .map((item) => {
                const slug = toPageSlug(item);

                return (
                  <Link
                    key={item}
                    href={`/c/${id}/${slug}`}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      slug === page ? "text-white" : "border-zinc-200 text-zinc-700 hover:border-zinc-900 hover:text-zinc-900"
                    }`}
                    style={slug === page ? { backgroundColor: content.accentColor, borderColor: content.accentColor } : undefined}
                  >
                    {item}
                  </Link>
                );
              })}
          </nav>

          <div
            className="px-8 py-12 sm:px-10 sm:py-16"
            style={{ background: `linear-gradient(135deg, ${content.accentColor} 0%, #0f172a 100%)` }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">{view.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">{view.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">{content.brandName}</p>
          </div>

          <div className="grid gap-8 px-8 py-10 sm:px-10 lg:grid-cols-[1.5fr_0.9fr]">
            <section className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">{view.eyebrow}</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900">{view.title}</h2>
              <p className="mt-4 text-base leading-8 text-zinc-700">{view.description}</p>
            </section>

            <aside className="space-y-6">
              <section className="rounded-3xl border border-zinc-200 bg-white p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">{view.secondaryTitle}</p>
                <p className="mt-4 text-base leading-8 text-zinc-700">{view.secondaryDescription}</p>
              </section>
              <section className="rounded-3xl border border-zinc-200 bg-white p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Actions</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="#"
                    className="inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    style={{ backgroundColor: content.accentColor }}
                  >
                    {content.ctaPrimary}
                  </a>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900"
                  >
                    {content.ctaSecondary}
                  </button>
                </div>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
