"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRef } from "react";
import { testimonials } from "@/lib/content";
import { SectionHeading, SectionLabel } from "./ui";

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  // Nothing to show is better than anonymous praise: hide the whole section
  // until a real quote exists in lib/content.ts.
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24">
      <div className="flex items-end justify-between gap-6">
        <div>
          <SectionLabel>Testimonials</SectionLabel>
          <SectionHeading className="mt-3">
            Trusted by
            <br />
            Great Clients
          </SectionHeading>
        </div>

        <div className="hidden shrink-0 gap-2 md:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous testimonials"
            className="grid size-10 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next testimonials"
            className="grid size-10 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        role="region"
        aria-label="Client testimonials"
        tabIndex={0}
      >
        {testimonials.map((item, index) => (
          <figure
            key={index}
            data-card
            className="flex w-[86%] shrink-0 snap-start flex-col rounded-[20px] bg-cream-warm p-6 sm:w-[62%] lg:w-[calc((100%-2rem)/3)]"
          >
            <div className="flex gap-1" role="img" aria-label="Rated 5 out of 5">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star
                  key={starIndex}
                  className="size-3.5 fill-orange text-orange"
                  strokeWidth={0}
                  aria-hidden="true"
                />
              ))}
            </div>

            <blockquote className="mt-5 text-[12.5px] leading-relaxed text-ink/70">
              &ldquo;{item.quote}&rdquo;
            </blockquote>

            <figcaption className="mt-auto flex items-center gap-3 border-t border-ink/10 pt-4 [margin-top:1.75rem]">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink/8 text-[10px] font-bold text-ink/60">
                {item.initials}
              </span>
              <span>
                <span className="block text-[12.5px] font-semibold leading-tight">
                  {item.name}
                </span>
                <span className="block text-[10.5px] text-muted">{item.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
