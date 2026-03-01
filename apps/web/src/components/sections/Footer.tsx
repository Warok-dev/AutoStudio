import Container from "@/src/components/ui/Container";
import type { LandingSection, LandingSpec } from "@/src/types/spec";

type FooterProps = {
  section: LandingSection;
  spec: LandingSpec;
};

export default function Footer({ section, spec }: FooterProps) {
  const note = section.note ?? `${spec.brandName} | ${spec.theme.tone}`;
  const links = ["Product", "Company", "Legal"];

  return (
    <footer id="footer" className="border-t border-zinc-200 bg-zinc-50 py-12">
      <Container className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
        <div>
          <p className="text-base font-semibold text-zinc-900">{spec.brandName}</p>
          <p className="mt-2 text-sm text-zinc-600">{note}</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {links.map((link) => (
            <nav key={link} aria-label={`${link} links`} className="space-y-2">
              <p className="text-sm font-semibold text-zinc-900">{link}</p>
              <a href="#" className="block text-sm text-zinc-600 hover:text-zinc-900">
                Overview
              </a>
            </nav>
          ))}
        </div>
      </Container>
    </footer>
  );
}
