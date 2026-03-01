import Header from "@/src/components/Header";
import Cta from "@/src/components/sections/Cta";
import Faq from "@/src/components/sections/Faq";
import Features from "@/src/components/sections/Features";
import Footer from "@/src/components/sections/Footer";
import Hero from "@/src/components/sections/Hero";
import Testimonials from "@/src/components/sections/Testimonials";
import { loadSpec } from "@/src/lib/loadSpec";
import type { FaqItem, FeatureItem, LandingSection, Spec, TestimonialItem } from "@/src/types/spec";

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
    </main>
  );
}
