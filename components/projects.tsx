import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/content";
import { screenshotsFor } from "@/lib/screenshots";
import { ProjectMedia } from "./project-media";
import { Reveal } from "./reveal";
import { SectionHeading, SectionLabel } from "./ui";

export function Projects() {
  return (
    <section id="work" className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24">
      <Reveal>
        <SectionLabel>Featured Work</SectionLabel>
        <SectionHeading className="mt-3 max-w-[14ch]">
          Selected Projects
        </SectionHeading>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          const { cover } = screenshotsFor(project.slug);

          return (
            <Reveal key={project.slug} delay={index * 80}>
              <Link
                href={`/work/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-ink p-2"
              >
                <ProjectMedia
                  image={cover}
                  title={project.title}
                  index={index}
                  url={project.liveUrl}
                  className="aspect-[4/3]"
                />

                <div className="flex flex-1 items-start justify-between gap-4 px-3 py-4">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-orange-soft">
                      {project.category}
                    </p>
                    <h3 className="mt-2 max-w-[12ch] font-display text-lg font-bold leading-tight text-cream">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-cream/60">
                      {project.summary}
                    </p>
                  </div>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-orange text-ink transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="size-4" strokeWidth={2.4} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
