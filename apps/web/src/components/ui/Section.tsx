import type { ReactNode } from "react";
import Container from "@/src/components/ui/Container";

type SectionTone = "white" | "muted";

type SectionProps = {
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
};

export default function Section({ children, tone = "white", className = "", containerClassName = "" }: SectionProps) {
  const toneClass = tone === "muted" ? "bg-zinc-50" : "bg-white";

  return (
    <section className={`${toneClass} py-24 md:py-28 ${className}`.trim()}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
