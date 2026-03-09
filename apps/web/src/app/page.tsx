import Header from "@/src/components/Header";
import Cta from "@/src/components/sections/Cta";
import Faq from "@/src/components/sections/Faq";
import Features from "@/src/components/sections/Features";
import Footer from "@/src/components/sections/Footer";
import Hero from "@/src/components/sections/Hero";
import Testimonials from "@/src/components/sections/Testimonials";
import { loadSpec } from "@/src/lib/loadSpec";
import type { FaqItem, FeatureItem, LandingSection, Spec, TestimonialItem } from "@/src/types/spec";
import Link from "next/link";

type SectionData = {
  features: FeatureItem[];
  testimonials: TestimonialItem[];
  faq: FaqItem[];
};

function renderSection(section: LandingSection, index: number, spec: Spec, data: SectionData) {
  const key = `${section.type}-${index}`;

  switch (section.type) {
    case "hero":
      return <Hero key={key} section={section} spec={spec} />;
    case "features":
      if (data.features.length === 0) {
        return null;
      }
      return <Features key={key} section={section} primaryColor={spec.theme.primaryColor} features={data.features} />;
    case "testimonials":
      if (data.testimonials.length === 0) {
        return null;
      }
      return <Testimonials key={key} section={section} testimonials={data.testimonials} />;
    case "faq":
      if (data.faq.length === 0) {
        return null;
      }
      return <Faq key={key} section={section} faq={data.faq} />;
    case "cta":
      return <Cta key={key} section={section} spec={spec} />;
    case "footer":
      return <Footer key={key} section={section} spec={spec} />;
    default:
      return null;
  }
}

export default async function Home() {
  const spec = await loadSpec();

  const features = spec?.features ?? [];
  const testimonials = spec?.testimonials ?? [];
  const faq = spec?.faq ?? [];

  const normalizedFeatures: FeatureItem[] = features.map((feature) => ({
    title: feature.title,
    description: feature.description,
  }));

  const normalizedTestimonials: TestimonialItem[] = testimonials.map((t) => {
    return {
      quote: t.quote,
      author: t.author ?? t.name,
      role: t.role,
    };
  });

  const normalizedFaq: FaqItem[] = faq.map((item) => {
    return {
      question: item.question ?? item.q,
      answer: item.answer ?? item.a,
    };
  });

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <Header spec={spec} />
      {spec.sections.map((section, index) =>
        renderSection(section, index, spec, {
          features: normalizedFeatures,
          testimonials: normalizedTestimonials,
          faq: normalizedFaq,
        })
      )}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Client Pages</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900">Open a deployed brief by issue number</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
            Each GitHub issue number is the canonical <code>client_id</code>. When the pipeline publishes a brief, the
            app exposes it at <code>/c/&lt;issue_number&gt;</code>.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href="/c/21"
              className="inline-flex items-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
            >
              Open example route
            </Link>
            <p className="text-sm text-zinc-500">Replace <code>21</code> with any existing issue number.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
