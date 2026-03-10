import Link from "next/link";
import { buildSiteData, loadBrief } from "@/src/app/c/brief";
import {
  AboutSection,
  AudienceSection,
  BenefitsSection,
  CTASection,
  FaqSection,
  HeroSection,
  OfferSection,
  PagesPreviewSection,
} from "@/src/app/c/site-sections";

type ClientPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ClientBriefPage({ params }: ClientPageProps) {
  const { id } = await params;
  const brief = await loadBrief(id);
  const briefUrl = `/clients/${id}/brief.md`;

  if (!brief) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">Client {id}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Brief introuvable</h1>
          <p className="mt-4 text-base leading-7 text-zinc-300">
            Aucun fichier <code>{briefUrl}</code> n&apos;a ete trouve dans ce deploiement.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
            >
              Return home
            </Link>
            <a
              href={briefUrl}
              className="inline-flex items-center rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Open raw brief
            </a>
          </div>
        </div>
      </main>
    );
  }

  const site = buildSiteData(brief.parsed, id);
  const trustSignals = [
    {
      label: "Positioning",
      value: "Clear offer",
      description: `Sharper messaging for ${site.audience.description.toLowerCase()}.`,
    },
    {
      label: "Structure",
      value: `${site.pages.length} core pages`,
      description: "A small but credible site system, not a single isolated panel.",
    },
    {
      label: "Conversion",
      value: site.cta.primaryLabel,
      description: "One obvious next step, supported by a lower-friction secondary action.",
    },
  ];

  return (
    <main id="top" className="min-h-screen overflow-x-hidden text-zinc-900" style={{ background: site.theme.pageBackground }}>
      <HeroSection
        brandName={site.brandName}
        briefUrl={site.briefUrl}
        hero={site.hero}
        navigation={site.navigation}
        theme={site.theme}
      />
      <section className="relative z-10 -mt-8 border-b border-zinc-200/80 bg-white/88 backdrop-blur">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Trust</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              A sharper, more launch-ready interpretation of the brief.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {trustSignals.map((signal) => (
              <article
                key={signal.label}
                className="rounded-[1.75rem] border border-zinc-200/80 bg-white px-5 py-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{signal.label}</p>
                <p className="mt-3 text-lg font-semibold tracking-tight text-zinc-950">{signal.value}</p>
                <p className="mt-2 text-sm leading-7 text-zinc-600">{signal.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <BenefitsSection benefits={site.benefits} theme={site.theme} />
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.30)_0%,rgba(248,250,252,0.52)_42%,rgba(255,255,255,0.18)_100%)]" />
        <div className="relative border-y border-zinc-200/70">
          <section className="border-b border-zinc-200/70 bg-white/70">
            <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
              <div className="flex max-w-4xl flex-col gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Story arc</p>
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                  From positioning to proof to action, the page now reads as one coherent marketing flow.
                </h2>
                <p className="text-base leading-7 text-zinc-600 sm:text-lg">
                  The brief content stays the same, but the presentation is tighter, more intentional, and closer to what a premium SaaS demo homepage should feel like.
                </p>
              </div>
            </div>
          </section>
          <AboutSection about={site.about} />
          <OfferSection offer={site.offer} theme={site.theme} />
          <AudienceSection audience={site.audience} />
          <PagesPreviewSection pages={site.pages} theme={site.theme} />
        </div>
      </div>
      <FaqSection faq={site.faq} />
      <CTASection cta={site.cta} theme={site.theme} />
    </main>
  );
}
