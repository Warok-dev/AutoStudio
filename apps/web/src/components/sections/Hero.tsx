import Button from "@/src/components/ui/Button";
import Container from "@/src/components/ui/Container";
import type { LandingSection, LandingSpec } from "@/src/types/spec";

type HeroProps = {
  section: LandingSection;
  spec: LandingSpec;
};

export default function Hero({ section, spec }: HeroProps) {
  const headline = section.headline ?? spec.tagline;
  const subheadline = section.subheadline ?? spec.audience;

  return (
    <section id="hero" className="relative overflow-hidden bg-zinc-50 py-24 md:py-28">
      <div
        className="absolute inset-0 -z-10 opacity-65"
        style={{
          backgroundImage: `radial-gradient(circle at 80% 32%, ${spec.theme.primaryColor}20, transparent 42%), radial-gradient(circle at 10% 8%, ${spec.theme.accentColor}12, transparent 35%)`,
        }}
      />
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-6" style={{ animation: "fadeInUp 500ms ease-out both" }}>
            <p
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
              style={{ borderColor: `${spec.theme.accentColor}66`, color: spec.theme.accentColor, backgroundColor: `${spec.theme.accentColor}12` }}
            >
              Now in beta
            </p>
            <h1 className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight text-zinc-900 md:text-[4.25rem]">{headline}</h1>
            <p className="mt-2 max-w-2xl text-base leading-7 text-zinc-700 md:mt-4 md:text-lg">{subheadline}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button primaryColor={spec.theme.primaryColor}>{spec.cta.primary}</Button>
              <Button variant="secondary" accentColor={spec.theme.accentColor}>
                {spec.cta.secondary}
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md md:ml-auto" style={{ animation: "fadeInUp 650ms ease-out both" }}>
            <div
              className="pointer-events-none absolute -inset-12 -z-10 rounded-full opacity-30 blur-2xl"
              style={{
                background: `radial-gradient(circle, ${spec.theme.primaryColor}14 0%, transparent 70%)`,
              }}
            />
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-full opacity-20"
              style={{
                background: `radial-gradient(circle, ${spec.theme.primaryColor} 0%, transparent 65%)`,
                animation: "softPulse 8s ease-in-out infinite",
              }}
            />
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-lg ring-1 ring-zinc-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="-mx-4 -mt-4 rounded-t-2xl border-b border-zinc-700 bg-zinc-800 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                </div>
              </div>
              <div className="mt-4 space-y-3 rounded-xl bg-zinc-50 p-3 shadow-inner">
                <div className="h-8 rounded-md" style={{ backgroundColor: `${spec.theme.primaryColor}28` }} />
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-16 rounded-md border border-zinc-200 bg-white" />
                  <div className="h-16 rounded-md border border-zinc-200 bg-white" />
                  <div className="h-16 rounded-md border border-zinc-200 bg-white" />
                </div>
                <div className="h-20 rounded-md border border-zinc-200 bg-white" />
                <div className="h-8 w-1/2 rounded-md" style={{ backgroundColor: `${spec.theme.accentColor}30` }} />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes softPulse {
          0%, 100% { transform: scale(0.98); opacity: 0.2; }
          50% { transform: scale(1.02); opacity: 0.26; }
        }
      `}</style>
    </section>
  );
}
