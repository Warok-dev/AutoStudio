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

  return (
    <main id="top" className="min-h-screen overflow-x-hidden text-zinc-900" style={{ background: site.theme.pageBackground }}>
      <HeroSection
        brandName={site.brandName}
        briefUrl={site.briefUrl}
        hero={site.hero}
        navigation={site.navigation}
        theme={site.theme}
      />
      <BenefitsSection benefits={site.benefits} theme={site.theme} />
      <AboutSection about={site.about} />
      <OfferSection offer={site.offer} theme={site.theme} />
      <AudienceSection audience={site.audience} />
      <PagesPreviewSection pages={site.pages} theme={site.theme} />
      <FaqSection faq={site.faq} />
      <CTASection cta={site.cta} theme={site.theme} />
    </main>
  );
}
