import Cta from "@/src/components/sections/Cta";
import Faq from "@/src/components/sections/Faq";
import Features from "@/src/components/sections/Features";
import Footer from "@/src/components/sections/Footer";
import Hero from "@/src/components/sections/Hero";
import Testimonials from "@/src/components/sections/Testimonials";
import { loadSpec } from "@/src/lib/loadSpec";
import type { LandingSection, Spec } from "@/src/types/spec";

function renderSection(section: LandingSection, index: number, spec: Spec) {
  const key = `${section.type}-${index}`;

  switch (section.type) {
    case "hero":
      return <Hero key={key} section={section} spec={spec} />;
    case "features":
      return <Features key={key} section={section} />;
    case "testimonials":
      return <Testimonials key={key} section={section} />;
    case "faq":
      return <Faq key={key} section={section} />;
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
  return <main className="min-h-screen bg-white text-zinc-900">{spec.sections.map((section, index) => renderSection(section, index, spec))}</main>;
}
