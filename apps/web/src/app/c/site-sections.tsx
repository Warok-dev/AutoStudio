import type { ReactNode } from "react";
import type { SiteAbout, SiteAudience, SiteBenefit, SiteCta, SiteFaqItem, SiteHero, SiteOffer, SitePagePreview, SiteTheme } from "@/src/app/c/brief";

function SectionShell({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={className}>
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">{children}</div>
    </section>
  );
}

export function HeroSection({
  brandName,
  briefUrl,
  hero,
  navigation,
  theme,
}: {
  brandName: string;
  briefUrl: string;
  hero: SiteHero;
  navigation: Array<{ href: string; label: string }>;
  theme: SiteTheme;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-zinc-200/70 bg-[#f8fbff]">
      <div
        className="absolute inset-0 opacity-[0.97]"
        style={{
          background: `${theme.heroGradient}, linear-gradient(180deg, rgba(255,255,255,0.00) 0%, rgba(248,250,252,0.08) 58%, rgba(248,250,252,0.42) 78%, rgba(248,250,252,0.88) 92%, #f8fafc 100%)`,
        }}
      />
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute right-[-6rem] top-[-2rem] h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute inset-x-0 bottom-[-4rem] h-72 bg-[linear-gradient(180deg,rgba(248,250,252,0)_0%,rgba(248,250,252,0.12)_26%,rgba(248,250,252,0.46)_58%,rgba(248,250,252,0.82)_82%,#ffffff_100%)]" />
      <div className="absolute bottom-[-8rem] left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-white/50 blur-3xl" />
      <div className="absolute bottom-[-10rem] left-1/2 h-56 w-[34rem] -translate-x-1/2 rounded-full bg-sky-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-6 sm:px-8 lg:px-12 lg:pb-24">
        <nav className="flex flex-col gap-6 rounded-[2rem] border border-white/15 bg-white/8 px-5 py-4 shadow-[0_20px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-tight text-white">{brandName}</p>
            <p className="mt-1 text-sm text-white/60">{hero.eyebrow}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-white/72">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
          <a
            href="#cta"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-white/90"
          >
            {hero.primaryCta}
          </a>
        </nav>

        <div className="grid gap-12 pb-2 pt-14 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-14 lg:pt-20">
          <div className="max-w-3xl">
            <p
              className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/88"
              style={{ boxShadow: "0 20px 50px rgba(15,23,42,0.15)" }}
            >
              {hero.eyebrow}
            </p>
            <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl lg:text-[5.5rem] lg:leading-[0.95]">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72 sm:text-[1.35rem] sm:leading-9">{hero.subtitle}</p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/64 sm:text-lg">{hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#cta"
                className="inline-flex items-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_14px_30px_rgba(15,23,42,0.18)] transition hover:bg-white/90"
              >
                {hero.primaryCta}
              </a>
              <a
                href={briefUrl}
                className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Open raw brief
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2.5rem] border border-white/8 bg-white/6 blur-sm" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 p-6 shadow-[0_28px_100px_rgba(15,23,42,0.28)] backdrop-blur-xl sm:p-8">
              <div className="grid gap-4 border-b border-white/10 pb-6 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">Positioning</p>
                  <p className="mt-3 text-xl font-semibold tracking-tight text-white">A polished story that feels ready to ship.</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950/40 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">Secondary CTA</p>
                  <p className="mt-3 text-xl font-semibold tracking-tight text-white">{hero.secondaryCta}</p>
                </div>
              </div>
              <div className="grid gap-4 pt-6">
                <div className="rounded-[1.5rem] border border-white/10 bg-white p-6 text-zinc-900">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Messaging focus</p>
                  <p className="mt-3 text-2xl font-semibold tracking-tight">{hero.description}</p>
                  <p className="mt-4 text-sm leading-7 text-zinc-600">{hero.subtitle}</p>
                </div>
                <div className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-white/8 px-5 py-4 text-white">
                  <span className="text-sm font-medium text-white/72">Primary motion</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold">{hero.primaryCta}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BenefitsSection({ benefits, theme }: { benefits: SiteBenefit[]; theme: SiteTheme }) {
  return (
    <SectionShell className="border-b border-zinc-200/80 bg-white/90">
      <div className="py-10 lg:py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {benefits.map((feature) => (
            <article
              key={feature.title}
              className="rounded-[2rem] border border-zinc-200/80 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
            >
              <p
                className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]"
                style={{ backgroundColor: `${theme.accentColor}12`, color: theme.accentColor }}
              >
                {feature.title}
              </p>
              <p className="mt-5 text-xl font-semibold tracking-tight text-zinc-950">{feature.title}</p>
              <p className="mt-3 text-base leading-7 text-zinc-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function AboutSection({ about }: { about: SiteAbout }) {
  return (
    <SectionShell id="about" className="border-b border-zinc-200/80 bg-white">
      <div className="grid gap-8 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">{about.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-[2.75rem]">{about.title}</h2>
        </div>
        <div className="rounded-[2.25rem] border border-zinc-200 bg-zinc-50/70 p-8 shadow-[0_22px_60px_rgba(15,23,42,0.05)] sm:p-10">
          <p className="text-lg leading-8 text-zinc-700 sm:text-[1.15rem] sm:leading-8">{about.description}</p>
        </div>
      </div>
    </SectionShell>
  );
}

export function OfferSection({ offer, theme }: { offer: SiteOffer; theme: SiteTheme }) {
  return (
    <SectionShell id="offer" className="border-b border-zinc-200/80 bg-zinc-50/70">
      <div className="grid gap-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div className="rounded-[2.25rem] bg-zinc-950 p-8 text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">{offer.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-[2.75rem]">{offer.title}</h2>
          <p className="mt-5 text-base leading-7 text-white/82 sm:text-lg">{offer.description}</p>
        </div>
        <div className="rounded-[2.25rem] border border-zinc-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.06)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Commercial framing</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-[2.25rem]">{offer.highlight}</h2>
          <div className="mt-6 rounded-[1.5rem] border border-zinc-100 bg-zinc-50 px-5 py-4">
            <span className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: theme.accentColor }}>
              Conversion focus
            </span>
            <p className="mt-3 text-base leading-7 text-zinc-700">{offer.description}</p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export function AudienceSection({ audience }: { audience: SiteAudience }) {
  return (
    <SectionShell id="audience" className="border-b border-zinc-200/80 bg-white">
      <div className="grid gap-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">{audience.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-[2.75rem]">{audience.title}</h2>
        </div>
        <div className="rounded-[2.25rem] border border-zinc-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-10">
          <p className="text-lg leading-8 text-zinc-700 sm:text-[1.15rem] sm:leading-8">{audience.description}</p>
        </div>
      </div>
    </SectionShell>
  );
}

export function PagesPreviewSection({ pages, theme }: { pages: SitePagePreview[]; theme: SiteTheme }) {
  return (
    <SectionShell id="pages" className="border-b border-zinc-200/80 bg-zinc-50/70">
      <div className="py-16 lg:py-20">
        <div className="flex max-w-3xl flex-col gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Pages</p>
          <h2 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-[2.75rem]">
            A page system that reads like a finished site.
          </h2>
          <p className="text-base leading-8 text-zinc-600 sm:text-lg">
            Each section supports the same brief, but the output now feels more like a credible product website and less like generated scaffolding.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pages.map((page) => (
            <article
              key={page.slug || page.name}
              className="rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
            >
              <p
                className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]"
                style={{ backgroundColor: `${theme.accentColor}12`, color: theme.accentColor }}
              >
                {page.name}
              </p>
              <p className="mt-5 text-lg font-semibold tracking-tight text-zinc-950">{page.name} page</p>
              <p className="mt-3 text-sm leading-7 text-zinc-600">{page.description}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function FaqSection({ faq }: { faq: SiteFaqItem[] }) {
  return (
    <SectionShell id="faq" className="border-b border-zinc-200/80 bg-white">
      <div className="py-16 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">FAQ</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-[2.75rem]">
            Questions a serious buyer is likely to ask.
          </h2>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {faq.map((item) => (
            <article
              key={item.question}
              className="rounded-[2rem] border border-zinc-200 bg-zinc-50/70 p-7 shadow-[0_18px_40px_rgba(15,23,42,0.04)]"
            >
              <p className="text-lg font-semibold tracking-tight text-zinc-950">{item.question}</p>
              <p className="mt-4 text-sm leading-7 text-zinc-600">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function CTASection({ cta, theme }: { cta: SiteCta; theme: SiteTheme }) {
  return (
    <SectionShell id="cta" className="bg-white">
      <div className="py-20 lg:py-24">
        <div
          className="relative overflow-hidden rounded-[2.75rem] px-8 py-14 text-white shadow-[0_32px_100px_rgba(15,23,42,0.18)] sm:px-12 sm:py-16 lg:px-16 lg:py-20"
          style={{ background: `linear-gradient(135deg, #0f172a 0%, ${theme.accentColor} 45%, #0f172a 100%)` }}
        >
          <div className="absolute right-0 top-0 h-64 w-64 translate-x-16 -translate-y-16 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-56 w-56 -translate-x-12 translate-y-12 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/65">{cta.eyebrow}</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{cta.title}</h2>
              <p className="mt-5 text-base leading-8 text-white/82 sm:text-[1.15rem] sm:leading-8">{cta.description}</p>
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#top"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-zinc-950 transition hover:opacity-90"
              >
                {cta.primaryLabel}
              </a>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {cta.secondaryLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
