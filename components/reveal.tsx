"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Milliseconds of extra delay — the stagger between siblings. */
  delay?: number;
  as?: "div" | "section" | "li";
  /** How far the element travels up, in px. */
  distance?: number;
  /** Seconds. Longer for headline blocks, shorter for small ones. */
  duration?: number;
};

/** useLayoutEffect on the client, useEffect on the server: no SSR warning. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scroll-triggered entrance, driven by GSAP ScrollTrigger.
 *
 * The element is set to its "before" state inside a layout effect, so it is
 * hidden before the browser paints — no flash of content that then jumps.
 * The animation runs once, when the element's top crosses 88% of the
 * viewport, and the ScrollTrigger is torn down if the component unmounts.
 *
 * With `prefers-reduced-motion: reduce` the element is simply left alone:
 * no hidden state, no animation, content visible immediately.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  distance = 24,
  duration = 0.85,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const Tag = as as "div";

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: distance },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay: delay / 1000,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, distance, duration]);

  return (
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
