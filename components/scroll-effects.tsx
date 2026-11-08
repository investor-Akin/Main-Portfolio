"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Page-wide scroll effects that no single section owns:
 *
 * 1. The reading-progress hairline inside the navbar. It is animated here
 *    rather than from React state so a scroll tick never re-renders the
 *    navbar, and so React cannot re-apply a transform over GSAP's.
 * 2. Parallax for any element carrying `data-parallax="<strength>"` — the
 *    element drifts by that fraction of the distance it has travelled through
 *    the viewport. Small numbers only; this is depth, not a slideshow.
 *
 * Both are skipped under `prefers-reduced-motion`, and every trigger is killed
 * on unmount, so client-side navigation cannot leave a stale one behind.
 */
export function ScrollEffects() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const bar = document.querySelector<HTMLElement>("[data-progress-bar]");

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

  return null;
}
