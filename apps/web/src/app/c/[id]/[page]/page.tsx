import Link from "next/link";
import { notFound } from "next/navigation";
import { getBriefDefaults, loadBrief, toPageSlug } from "@/src/app/c/brief";

type ClientSubPageProps = {
  params: Promise<{
    id: string;
    page: string;
  }>;
};

type ContentDefaults = ReturnType<typeof getBriefDefaults>;

type IntroContent = {
  eyebrow: string;
  title: string;
  description: string;
  supporting: string;
};

type InfoBlock = {
  title: string;
  body: string;
};

type ServiceItem = {
  name: string;
  description: string;
};

type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
};

type FaqItem = {
  question: string;
  answer: string;
};

const SUPPORTED_PAGES = ["about", "services", "pricing", "faq", "contact"] as const;

function toBrandHandle(brandName: string) {
  const slug = brandName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();

  return slug || "autostudio-demo";
}

function toTone(tagline: string, mainGoal: string) {
  if (tagline && mainGoal) {
    return `Clear, modern, and conversion-focused, with a message anchored in ${mainGoal.toLowerCase()}.`;
  }

  return "Clear, modern, and conversion-focused.";
}

function deriveEmail(content: ContentDefaults) {
  return `hello@${toBrandHandle(content.brandName)}.demo`;
}

function deriveServices(content: ContentDefaults): ServiceItem[] {
  return [
    {
      name: "Landing Page Design",
      description: `Turn ${content.businessDescription.toLowerCase()} into a page structure that supports ${content.mainGoal.toLowerCase()}.`,
    },
    {
      name: "Lead Generation Setup",
      description: `Shape the journey so ${content.audience.toLowerCase()} reach ${content.ctaPrimary.toLowerCase()} with less friction.`,
    },
    {
      name: "Rapid Website Deployment",
      description: `Launch a focused site package around the ${content.packageName} offer without overcomplicating the experience.`,
    },
  ];
}

function derivePricing(content: ContentDefaults): PricingTier[] {
  return [
    {
      name: "Starter",
      price: "$750",
      description: `A lean setup for teams that need a clear first version of ${content.brandName}.`,
      features: ["Core landing page", `Message aligned to ${content.audience.toLowerCase()}`, content.ctaPrimary],
    },
    {
      name: "Growth",
      price: "$1,500",
      description: `A stronger package built around ${content.packageName} and the main conversion path.`,
      features: ["Expanded page structure", "Lead-focused sections", `Supports ${content.mainGoal.toLowerCase()}`],
      featured: true,
    },
    {
      name: "Pro",
      price: "$2,500",
      description: "A more complete system for teams that want deeper credibility and a more polished launch.",
      features: ["Additional supporting pages", "FAQ and proof framing", content.ctaSecondary],
    },
  ];
}

function deriveFaq(content: ContentDefaults): FaqItem[] {
  return [
    {
      question: `Is this built for ${content.audience.toLowerCase()}?`,
      answer: `Yes. The messaging, structure, and CTA flow are shaped around ${content.audience.toLowerCase()} so the offer feels more relevant on arrival.`,
    },
    {
      question: `How does this support ${content.mainGoal.toLowerCase()}?`,
      answer: `The content is organized to make the value proposition easier to understand, reduce hesitation, and move visitors toward ${content.ctaPrimary}.`,
    },
    {
      question: `What should visitors understand first?`,
      answer: `They should quickly understand ${content.businessDescription.toLowerCase()} and why that matters before deciding between ${content.ctaPrimary} and ${content.ctaSecondary}.`,
    },
  ];
}

function getPageIntro(page: string, content: ContentDefaults): IntroContent {
  switch (page) {
    case "about":
      return {
        eyebrow: "About",
        title: `What ${content.brandName} does and why it matters`,
        description: content.businessDescription,
        supporting: `Built for ${content.audience.toLowerCase()}, with a tone that feels ${toTone(content.tagline, content.mainGoal).toLowerCase()}`,
      };
    case "services":
      return {
        eyebrow: "Services",
        title: "A focused service set built from the brief",
        description: `These offers are derived from the main goal: ${content.mainGoal.toLowerCase()}.`,
        supporting: `The mix stays lightweight, practical, and aligned with the ${content.packageName} package.`,
      };
    case "pricing":
      return {
        eyebrow: "Pricing",
        title: "Simple pricing designed to reduce hesitation",
        description: `The ${content.packageName} package becomes a tiered structure so buyers can understand scope quickly.`,
        supporting: `Each tier keeps the same positioning while increasing depth, polish, and conversion support.`,
      };
    case "faq":
      return {
        eyebrow: "FAQ",
        title: "Answer the objections before they slow down the sale",
        description: `These answers are generated from the audience, business description, and main goal in the brief.`,
        supporting: `The goal is to make ${content.ctaPrimary.toLowerCase()} feel lower-friction and more credible.`,
      };
    case "contact":
      return {
        eyebrow: "Contact",
        title: "Give interested visitors a clean next step",
        description: `Use this page to route intent toward ${content.ctaPrimary} while keeping ${content.ctaSecondary} available as a fallback.`,
        supporting: "The content stays simple so the page feels ready for a real handoff, not like a placeholder.",
      };
    default:
      return {
        eyebrow: "Page",
        title: "Generated page",
        description: content.mainGoal,
        supporting: content.tagline,
      };
  }
}

function SectionHeading({ eyebrow, title, description }: IntroContent) {
  return (
    <div
      className="px-8 py-12 sm:px-10 sm:py-14"
      style={{ background: "linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(15,23,42,0.92) 42%, rgba(15,23,42,0.72) 100%)" }}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/65">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">{description}</p>
    </div>
  );
}

function InfoCard({ title, body }: InfoBlock) {
  return (
    <section className="rounded-[1.75rem] border border-zinc-200 bg-white p-7 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">{title}</p>
      <p className="mt-4 text-base leading-8 text-zinc-700">{body}</p>
    </section>
  );
}

function AboutContent({ content }: { content: ContentDefaults }) {
  const infoBlocks: InfoBlock[] = [
    { title: "Audience", body: content.audience },
    { title: "Tone", body: toTone(content.tagline, content.mainGoal) },
  ];

  return (
    <div className="grid gap-8 px-8 py-10 sm:px-10 lg:grid-cols-[1.3fr_0.9fr]">
      <section className="rounded-[1.75rem] border border-zinc-200 bg-zinc-50 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Business overview</p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950">A more complete business snapshot</h2>
        <p className="mt-4 text-base leading-8 text-zinc-700">{content.businessDescription}</p>
        <div className="mt-8 rounded-[1.5rem] border border-zinc-200 bg-white px-5 py-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: content.accentColor }}>
            Positioning
          </p>
          <p className="mt-3 text-base leading-7 text-zinc-700">{content.tagline}</p>
        </div>
      </section>
      <aside className="space-y-6">
        {infoBlocks.map((block) => (
          <InfoCard key={block.title} title={block.title} body={block.body} />
        ))}
      </aside>
    </div>
  );
}

function ServicesContent({ content }: { content: ContentDefaults }) {
  const services = deriveServices(content);

  return (
    <div className="grid gap-8 px-8 py-10 sm:px-10">
      <div className="grid gap-5 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.name}
            className="rounded-[1.75rem] border border-zinc-200 bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Service</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950">{service.name}</h2>
            <p className="mt-4 text-base leading-8 text-zinc-700">{service.description}</p>
          </article>
        ))}
      </div>
      <InfoCard
        title="Delivery model"
        body={`This services set stays anchored in ${content.mainGoal.toLowerCase()} so the page reads like a practical offer rather than a loose list of capabilities.`}
      />
    </div>
  );
}

function PricingContent({ content }: { content: ContentDefaults }) {
  const tiers = derivePricing(content);

  return (
    <div className="grid gap-8 px-8 py-10 sm:px-10">
      <div className="grid gap-5 lg:grid-cols-3">
        {tiers.map((tier) => (
          <article
            key={tier.name}
            className={`rounded-[1.9rem] border p-7 shadow-[0_20px_50px_rgba(15,23,42,0.06)] ${
              tier.featured ? "bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-900"
            }`}
          >
            <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${tier.featured ? "text-white/60" : "text-zinc-500"}`}>{tier.name}</p>
            <p className="mt-4 text-4xl font-semibold tracking-tight">{tier.price}</p>
            <p className={`mt-4 text-base leading-8 ${tier.featured ? "text-white/80" : "text-zinc-700"}`}>{tier.description}</p>
            <ul className="mt-6 space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span
                    className={`mt-2 h-2.5 w-2.5 rounded-full ${tier.featured ? "bg-white" : ""}`}
                    style={!tier.featured ? { backgroundColor: content.accentColor } : undefined}
                  />
                  <span className={tier.featured ? "text-sm leading-7 text-white/82" : "text-sm leading-7 text-zinc-700"}>{feature}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

function FaqContent({ content }: { content: ContentDefaults }) {
  const items = deriveFaq(content);

  return (
    <div className="grid gap-8 px-8 py-10 sm:px-10">
      <div className="grid gap-5 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.question}
            className="rounded-[1.75rem] border border-zinc-200 bg-zinc-50 p-7 shadow-[0_18px_40px_rgba(15,23,42,0.04)]"
          >
            <h2 className="text-xl font-semibold tracking-tight text-zinc-950">{item.question}</h2>
            <p className="mt-4 text-base leading-8 text-zinc-700">{item.answer}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function ContactContent({ content, id }: { content: ContentDefaults; id: string }) {
  const email = deriveEmail(content);

  return (
    <div className="grid gap-8 px-8 py-10 sm:px-10 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="rounded-[1.75rem] border border-zinc-200 bg-zinc-50 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Contact details</p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950">Start the conversation</h2>
        <div className="mt-6 space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Email</p>
            <p className="mt-2 text-base font-medium text-zinc-900">{email}</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Primary CTA</p>
            <p className="mt-2 text-base text-zinc-700">{content.ctaPrimary}</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Secondary CTA</p>
            <p className="mt-2 text-base text-zinc-700">{content.ctaSecondary}</p>
          </div>
        </div>
      </section>
      <aside className="space-y-6">
        <InfoCard title="Client ID" body={id} />
        <InfoCard
          title="Recommended action"
          body={`Use ${content.ctaPrimary} as the primary intent path and keep ${content.ctaSecondary} visible for visitors who need a softer next step.`}
        />
      </aside>
    </div>
  );
}

function SubPageNavigation({ content, id, currentPage }: { content: ContentDefaults; id: string; currentPage: string }) {
  const pageMap = new Map<string, string>();

  for (const item of briefPageLabels(content)) {
    pageMap.set(toPageSlug(item), item);
  }

  return (
    <nav className="flex flex-wrap items-center gap-3 border-b border-zinc-200 px-8 py-5 sm:px-10">
      <Link
        href={`/c/${id}`}
        className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
      >
        Home
      </Link>
      {SUPPORTED_PAGES.map((slug) => {
        const label = pageMap.get(slug) || slug.charAt(0).toUpperCase() + slug.slice(1);

        return (
          <Link
            key={slug}
            href={`/c/${id}/${slug}`}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              slug === currentPage ? "text-white" : "border-zinc-200 text-zinc-700 hover:border-zinc-900 hover:text-zinc-900"
            }`}
            style={slug === currentPage ? { backgroundColor: content.accentColor, borderColor: content.accentColor } : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function briefPageLabels(content: ContentDefaults) {
  return ["About", "Services", "Pricing", "FAQ", "Contact"].filter(Boolean);
}

function renderPageBody(page: string, content: ContentDefaults, id: string) {
  switch (page) {
    case "about":
      return <AboutContent content={content} />;
    case "services":
      return <ServicesContent content={content} />;
    case "pricing":
      return <PricingContent content={content} />;
    case "faq":
      return <FaqContent content={content} />;
    case "contact":
      return <ContactContent content={content} id={id} />;
    default:
      notFound();
  }
}

export default async function ClientSubPage({ params }: ClientSubPageProps) {
  const { id, page } = await params;
  const brief = await loadBrief(id);

  if (!brief) {
    notFound();
  }

  const supportedPages = new Set(SUPPORTED_PAGES);
  const requestedPage = toPageSlug(page);

  if (!supportedPages.has(requestedPage as (typeof SUPPORTED_PAGES)[number])) {
    notFound();
  }

  const content = getBriefDefaults(brief.parsed, id);
  const intro = getPageIntro(requestedPage, content);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_30%,#f4f4f5_100%)] px-6 py-12 text-zinc-900">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <SubPageNavigation content={content} id={id} currentPage={requestedPage} />
          <SectionHeading {...intro} />
          <div className="border-b border-zinc-200 bg-white px-8 py-5 sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Brand</p>
            <p className="mt-2 text-base leading-7 text-zinc-700">{content.brandName}</p>
            <p className="mt-1 text-sm leading-7 text-zinc-500">{intro.supporting}</p>
          </div>
          {renderPageBody(requestedPage, content, id)}
          <div className="border-t border-zinc-200 px-8 py-8 sm:px-10">
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: content.accentColor }}
              >
                {content.ctaPrimary}
              </a>
              <button
                type="button"
                className="inline-flex items-center rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900"
              >
                {content.ctaSecondary}
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
