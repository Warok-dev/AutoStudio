import Link from "next/link";
import { getBriefDefaults, loadBrief, toPageSlug } from "@/src/app/c/brief";

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

  const parsedBrief = brief.parsed;
  const { accentColor, audience, brandName, businessDescription, ctaPrimary, ctaSecondary, mainGoal, tagline } =
    getBriefDefaults(parsedBrief, id);

  return (
    <main id="top" className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_30%,#f4f4f5_100%)] px-6 py-12 text-zinc-900">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <nav className="flex flex-wrap items-center gap-3 border-b border-zinc-200 px-8 py-5 sm:px-10">
            <Link
              href={`/c/${id}`}
              className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Home
            </Link>
            {parsedBrief.pages
              .filter((page) => toPageSlug(page) !== "home")
              .map((page) => {
                const slug = toPageSlug(page);

                return (
                  <Link
                    key={page}
                    href={`/c/${id}/${slug}`}
                    className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900"
                  >
                    {page}
                  </Link>
                );
              })}
          </nav>
          <div
            className="px-8 py-12 sm:px-10 sm:py-16"
            style={{
              background: `linear-gradient(135deg, ${accentColor} 0%, #0f172a 100%)`,
            }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Client {id}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">{brandName}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">{tagline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#cta"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:opacity-90"
              >
                {ctaPrimary}
              </a>
              <a
                href={briefUrl}
                className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Open raw brief
              </a>
            </div>
          </div>

          <div className="grid gap-8 px-8 py-10 sm:px-10 lg:grid-cols-[1.6fr_0.9fr]">
            <section className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">About</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900">What this business offers</h2>
              <p className="mt-4 text-base leading-8 text-zinc-700">{businessDescription}</p>
              <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-100">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Audience</p>
                <p className="mt-3 text-base leading-7 text-zinc-700">{audience}</p>
              </div>
            </section>

            <aside className="space-y-6">
              <section className="rounded-3xl border border-zinc-200 bg-white p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Offer</p>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900">Primary objective</h2>
                <p className="mt-4 text-base leading-8 text-zinc-700">{mainGoal}</p>
              </section>
              {parsedBrief.pages.length > 0 ? (
                <section className="rounded-3xl border border-zinc-200 bg-white p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Pages</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {parsedBrief.pages.map((page) => (
                      <Link
                        key={page}
                        href={toPageSlug(page) === "home" ? `/c/${id}` : `/c/${id}/${toPageSlug(page)}`}
                        className="rounded-full px-4 py-2 text-sm font-medium"
                        style={{
                          backgroundColor: `${accentColor}15`,
                          color: accentColor,
                        }}
                      >
                        {page}
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}
            </aside>
          </div>

          <section id="cta" className="border-t border-zinc-200 px-8 py-10 sm:px-10">
            <div className="flex flex-col gap-6 rounded-3xl p-8 text-white sm:flex-row sm:items-center sm:justify-between" style={{ backgroundColor: accentColor }}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">CTA</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">Turn this brief into a live customer journey</h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-white/85">
                  This section uses the primary and secondary calls to action defined in the brief.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#top"
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:opacity-90"
                >
                  {ctaPrimary}
                </a>
                <button
                  type="button"
                  className="inline-flex items-center rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {ctaSecondary}
                </button>
              </div>
            </div>
          </section>
        </section>

        <div className="mt-6 flex justify-end">
          <a
            href={briefUrl}
            className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900"
          >
            View source brief
          </a>
        </div>
      </div>
    </main>
  );
}
