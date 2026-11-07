import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProjectMedia } from "@/components/project-media";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/ui";
import { profile, projects, siteUrl } from "@/lib/content";
import { screenshotsFor } from "@/lib/screenshots";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  const url = `${siteUrl}/work/${project.slug}`;
  return {
    title: `${project.title} — ${project.category} case study`,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} — ${profile.name}`,
      description: project.summary,
      url,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];

  // Screenshots dropped into public/work/ win over any path set in content.ts.
  const shots = screenshotsFor(slug);
  const cover = shots.cover ?? project.image;
  const gallery = shots.gallery.length > 0 ? shots.gallery : (project.gallery ?? []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${siteUrl}/work/${project.slug}`,
    dateCreated: project.year,
    genre: project.category,
    creator: {
      "@type": "Person",
      name: profile.name,
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Structured data is static content, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />

      <main className="pt-24 sm:pt-28">
        <article className="mx-auto max-w-6xl px-5">
          <Reveal>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-ink/65 transition-colors hover:text-orange-ink"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              All work
            </Link>
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-8 max-w-3xl">
              <SectionLabel>{project.category}</SectionLabel>
              <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
                {project.title}
                <span className="text-orange">.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">
                {project.summary}
              </p>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-ink/35 hover:bg-white"
                >
                  Visit the live site
                  <ArrowUpRight
                    className="size-4 text-orange-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <dl className="mt-10 grid gap-6 border-y border-ink/10 py-6 sm:grid-cols-3">
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50">
                  Client
                </dt>
                <dd className="mt-2 text-sm font-semibold text-ink">
                  {project.client}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50">
                  Year
                </dt>
                <dd className="mt-2 text-sm font-semibold text-ink">
                  {project.year}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50">
                  Scope
                </dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {project.deliverables.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-ink/75 ring-1 ring-ink/10"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={160}>
            <ProjectMedia
              image={cover}
              title={project.title}
              index={index}
              url={project.liveUrl}
              priority
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="mt-8 aspect-[16/10] w-full sm:aspect-[16/9]"
            />
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <div>
                <SectionLabel>The problem</SectionLabel>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
                  {project.problem}
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div>
                <SectionLabel>What I did</SectionLabel>
                <div className="mt-4 space-y-4">
                  {project.approach.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 24)}
                      className="text-[15px] leading-relaxed text-ink/80"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-14 grid gap-8 rounded-[24px] bg-cream-warm p-7 sm:p-9 lg:grid-cols-2 lg:gap-14">
              <div>
                <SectionLabel>Deliverables</SectionLabel>
                <ul className="mt-4 space-y-2.5">
                  {project.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-ink/80">
                      <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-orange">
                        <Check className="size-2.5 text-ink" strokeWidth={3.2} aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <SectionLabel>The result</SectionLabel>
                <p className="mt-4 font-display text-[19px] font-bold leading-snug tracking-[-0.01em] text-ink">
                  {project.result}
                </p>
              </div>
            </div>
          </Reveal>

          {gallery.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {gallery.map((image, galleryIndex) => (
                <Reveal key={image} delay={galleryIndex * 70}>
                  <ProjectMedia
                    image={image}
                    title={project.title}
                    index={galleryIndex}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="aspect-[4/3] w-full"
                  />
                </Reveal>
              ))}
            </div>
          )}

          <Reveal>
            <Link
              href={`/work/${next.slug}`}
              className="group mt-14 flex items-center justify-between gap-6 rounded-[20px] bg-ink px-6 py-6 transition-colors hover:bg-ink-panel"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/55">
                  Next project
                </p>
                <p className="mt-2 font-display text-xl font-bold tracking-[-0.02em] text-cream">
                  {next.title}
                </p>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-orange text-ink transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="size-4" strokeWidth={2.4} aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        </article>

        <Cta />
      </main>

      <Footer />
    </>
  );
}
