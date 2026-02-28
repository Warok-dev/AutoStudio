import type { LandingSection, LandingSpec } from "@/src/types/spec";

type FooterProps = {
  section: LandingSection;
  spec: LandingSpec;
};

export default function Footer({ section, spec }: FooterProps) {
  const note = section.note ?? `${spec.brandName} | ${spec.theme.tone}`;

  return (
    <footer className="mt-10 border-t border-zinc-200 px-6 py-8 text-center text-sm text-zinc-500">
      <p>{note}</p>
    </footer>
  );
}
