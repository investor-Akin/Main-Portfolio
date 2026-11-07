"use client";

import { useEffect, useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
} from "@/lib/gsap";

/**
 * Page-wide scroll effects that no single section owns:
 *
 * 1. A hairline reading-progress bar pinned under the header, scaled from the
 *    document's scroll position.
 * 2. Parallax for any element carrying `data-parallax="<strength>"` — the
 *    element drifts by that fraction of the distance it has travelled through
 *    the viewport. Small numbers only; this is depth, not a slideshow.
 *
 * Everything is skipped under `prefers-reduced-motion`, and every trigger is
 * killed on unmount, so client-side navigation cannot leave a stale one behind.
 */
export function ScrollEffects() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;

    if (prefersReducedMotion()) {
      // No motion at all: leave the bar empty rather than sliding it.
      if (bar) bar.style.transform = "scaleX(0)";
      return;
    }

    const ctx = gsap.context(() => {
      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3,
            },
          },
        );
      }

      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const strength = parseFloat(el.dataset.parallax ?? "0.08");
        if (!Number.isFinite(strength) || strength === 0) return;

        gsap.fromTo(
          el,
          { yPercent: -strength * 50 },
          {
            yPercent: strength * 50,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.4,
            },
          },
        );
      });
    });

    // Images and fonts landing late can change layout, which makes stored
    // trigger positions wrong. One refresh once the page has settled.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-orange"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
