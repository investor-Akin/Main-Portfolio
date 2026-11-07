"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One place to register the plugins, so nothing else has to think about it.
 * Guarded for the server: `gsap` is imported during prerender too, and
 * ScrollTrigger touches `window` the moment it is registered. The module-level
 * flag means a second import in the same bundle cannot register it twice.
 */
let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/** True when the visitor asked the OS to tone animations down. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger };
