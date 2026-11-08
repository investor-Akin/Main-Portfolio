import type { LucideIcon } from "lucide-react";
import { Server, Globe, Layers, PenTool } from "lucide-react";

/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL in the hosting dashboard if the
 * domain changes, so canonical links, sitemap and share cards stay correct.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://akinfolio.vercel.app";

export const profile = {
  name: "Onigbinde Akinbowale",
  shortName: "Akin",
  brand: "akin",
  role: "Front-End Developer",
  email: "onigbindeakinbowale@gmail.com",
  phone: "+234 916 117 9908",
  phoneHref: "+2349161179908",
  whatsapp: "https://wa.me/2349161179908",
  location: "Oyo State, Nigeria",
  photo: "/akin.jpg",
  /** One-page CV, generated from cv/cv.html by cv/build-pdf.ps1. */
  cv: "/akin-cv.pdf",
  siteUrl,
};

/**
 * Real profiles only. Every entry here becomes a link in the footer, so leave
 * this empty until you have the actual URLs to hand, otherwise the footer leads
 * people to x.com/instagram.com homepages.
 *
 * Example:
 *   { label: "Instagram", href: "https://instagram.com/yourhandle" }
 */
export const socials: { label: string; href: string }[] = [
  { label: "GitHub", href: "https://github.com/investor-Akin" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/akinbowale-8921a32a6" },
];

/**
 * The strip under the hero. Written for someone deciding whether to interview:
 * location, time zone, what is on offer and how long he has been at it, all
 * defensible facts rather than round numbers.
 */
export const availability = [
  { label: "Based in", value: "Oyo State, Nigeria" },
  { label: "Work setup", value: "Remote" },
  { label: "Open to", value: "Front-end, back-end & full-stack roles" },
  { label: "Writing code since", value: "2021 · five years" },
] as const;

export const hero = {
  eyebrow: "Open to front-end, back-end & full-stack roles",
  headline: ["I design it,", "build it,", "ship it"],
  bio: "Front-end and full-stack developer working remotely from Oyo State, in React, Next.js and TypeScript. I take a build from the layout and the type to the API behind it and the deploy, and I would rather show working software than describe it.",
  badge: { value: "5+", label: "Years writing code" },
  primaryCta: { label: "See my work", href: "#work" },
  secondaryCta: { label: "Email me", href: `mailto:${profile.email}` },
};

export const about = {
  eyebrow: "About",
  heading: "Built to work, then explained.",
  paragraphs: [
    "I'm Akin, a front-end and full-stack developer working remotely from Oyo State. I've been writing code since 2021, and I finished a BSc in Computer Science at Adeleke University in July 2026 with Second Class Upper.",
    "I take a build end to end: the layout and type, the React components, the API behind them, and the deploy. Most of what I ship is static-first, because a page that opens in under a second on a phone is a design decision, not a nice-to-have.",
    "Full-stack is where I'm heading: Node, Express and MongoDB, with real auth and real records instead of tutorial clones. I would rather show that with working software than describe it, which is what the work above is for.",
  ],
  facts: [
    { label: "Based in", value: "Oyo State, Nigeria" },
    { label: "Education", value: "BSc Computer Science, Adeleke University" },
    { label: "Graduated", value: "July 2026 · Second Class Upper" },
    { label: "Looking for", value: "Front-end, back-end or full-stack roles · Remote" },
  ],
} as const;

export type Certification = {
  /** The credential itself, exactly as it was issued. */
  title: string;
  /** Who issued or ran it. */
  issuer: string;
};

export const certifications: Certification[] = [
  {
    title: "Microsoft Office Specialist (MOS) — Word",
    issuer: "Mia",
  },
  {
    title: "Programming & Software Development",
    issuer: "New Horizons Computer Learning Centers",
  },
  {
    title: "Full-Stack Web Development Training",
    issuer: "SQI Tech School",
  },
  {
    title: "Full-Stack Web Development Training",
    issuer: "Poolot Tech School",
  },
];

export type Service = {
  title: string;
  body: string;
  icon: LucideIcon;
  inverted: boolean;
};

export const services: Service[] = [
  {
    title: "Web Design",
    body: "Clean, conversion-focused interfaces designed around your brand and your audience.",
    icon: PenTool,
    inverted: false,
  },
  {
    title: "Web Development",
    body: "Fast, responsive builds in modern stacks, shipped accessible and easy to maintain.",
    icon: Globe,
    inverted: true,
  },
  {
    title: "Brand Identity",
    body: "Logos, type and colour systems that make a small brand look established.",
    icon: Layers,
    inverted: false,
  },
  {
    title: "Backend & APIs",
    body: "Node, Express and MongoDB: auth, records and the endpoints a real app needs.",
    icon: Server,
    inverted: true,
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  /** Short line shown on the project card. */
  summary: string;
  /** Client descriptor. Never use a company name you do not have permission to publish. */
  client: string;
  year: string;
  /** What the client came with. */
  problem: string;
  /** What you did about it, two or three short paragraphs. */
  approach: string[];
  deliverables: string[];
  /** What changed for them. Facts you can stand behind, no invented percentages. */
  result: string;
  /** Optional cover image in /public. Falls back to a generated panel. */
  image?: string;
  /** Optional gallery images in /public, shown on the case study page. */
  gallery?: string[];
  /**
   * Live site: the strongest proof a case study can carry, because a client can
   * click it and check. Leave undefined until the site is actually public.
   */
  liveUrl?: string;
};

/**
 * DRAFT COPY. These three are structured placeholders written to show the
 * shape of a case study, not descriptions of real delivered work. Replace the
 * problem / approach / result / deliverables text with your own before you
 * publish, and add a real cover image to `image` once you have one.
 */
export const projects: Project[] = [
  {
    slug: "studio-rebrand-site",
    title: "Studio Rebrand Site",
    category: "Web Design",
    summary: "A studio site rebuilt around one clear offer and a single call to action.",
    client: "Independent design studio",
    year: "2025",
    problem:
      "The studio had strong work but a site that read like a list of services. Visitors could not tell what the studio was best at, and there was no obvious next step beyond a contact link in the footer.",
    approach: [
      "We cut the offer down to one sentence, then built every section around proving it: a sharper homepage order, one primary action repeated at each scroll depth, and case studies that lead with the result rather than the client logo.",
      "The visual system keeps the studio's existing typography and tightens the palette to two neutrals and one accent, so photography and project work carry the colour.",
    ],
    deliverables: ["Positioning and site structure", "Homepage and case study design", "Responsive build", "Handover documentation"],
    result:
      "The studio now sends one link to new leads, and every page ends with the same next step instead of a dead-end footer.",
  },
  {
    slug: "identity-system",
    title: "Identity System",
    category: "Brand Identity",
    summary: "A wordmark, type scale and colour rules small enough for one person to run alone.",
    client: "Early-stage product team",
    year: "2024",
    problem:
      "The team was producing consistent-looking decks, invoices and social posts by memory. Every new hire or freelancer improvised, and the brand drifted a little further each month.",
    approach: [
      "We built a small system rather than a large one: a wordmark with clear clear-space rules, two typefaces with fixed sizes, and four colours with defined jobs.",
      "Everything was delivered as a one-page reference sheet plus editable source files, so the team can apply the identity without needing a designer on call.",
    ],
    deliverables: ["Wordmark and lockups", "Type and colour rules", "One-page brand sheet", "Social and document templates"],
    result:
      "New material now starts from a template instead of a blank page, and the brand holds together across decks, invoices and posts.",
  },
  {
    slug: "commerce-platform",
    title: "Commerce Platform",
    category: "Web Development",
    summary: "A storefront rebuilt around the two decisions a shopper actually makes.",
    client: "Small-batch product brand",
    year: "2025",
    problem:
      "The store loaded slowly on mobile data and asked shoppers to make too many choices before they could see a price, so people browsed and left.",
    approach: [
      "We rebuilt the browse-to-cart path: fewer options per screen, prices visible on the listing, and a checkout that works on a slow connection.",
      "The build is static-first with a small API for stock and orders, so pages stay fast without giving up live inventory.",
    ],
    deliverables: ["Storefront design", "Headless front-end build", "Checkout and payment integration", "Analytics setup"],
    result:
      "The storefront now loads in about a second on mobile data, and the path from landing page to paid order fits on one screen at a time.",
  },
];

export type StackStage = {
  /** What happens at this step of a build, not what the tool is called. */
  stage: string;
  /** One line on why this layer exists. */
  note: string;
  tools: string[];
};

/**
 * The tools, ordered the way a site is actually built rather than grouped by
 * "frontend / backend", so the section shows a process instead of a checklist.
 */
export const stack: StackStage[] = [
  {
    stage: "Structure & style",
    note: "Markup that means something, styled to match the brand.",
    tools: ["HTML", "CSS", "Tailwind CSS", "Bootstrap 5"],
  },
  {
    stage: "Behaviour",
    note: "Interfaces that respond, type-checked before they ship.",
    tools: ["JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    stage: "Logic & data",
    note: "Full-stack MERN where a static page is not enough: auth, records, orders.",
    tools: ["Node.js", "Express", "MongoDB", "Supabase", "Firebase"],
  },
  {
    stage: "Ship",
    note: "Deployed, versioned in Git and on GitHub, and easy for the next person to pick up.",
    tools: ["Vercel", "Git", "GitHub"],
  },
];

export const stackIntro =
  "The same four stages every time, whether I join a codebase that already exists or start from an empty repo.";

export const stats = [
  { value: "React · Next.js", label: "Front-end stack" },
  { value: "TypeScript", label: "Type-checked builds" },
  { value: "Node · Express", label: "APIs and back-end" },
  { value: "Static-first", label: "Fast on mobile data" },
] as const;

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

/**
 * REAL quotes only. The section is hidden while this array is empty, which is
 * better than showing placeholder praise: a client who sees "Client Name" stops
 * trusting the rest of the page. Add entries once a client actually says them.
 */
export const testimonials: Testimonial[] = [];

export const contact = {
  eyebrow: "For hiring teams",
  headline: "Hiring for a front-end or full-stack role?",
  body: "I work remotely from Oyo State and I am available now for junior or mid-level front-end, back-end and full-stack work. Send the role and I will reply with how I would approach it.",
  cta: "Email me",
  note: "Usually replies within 24 hours",
  clientLine: "Freelance project instead?",
  clientCta: "Use the form",
  formNote:
    "Tell me what you're building and I'll reply with a plan, a timeline and a price. No sales calls.",
};

/** Project types offered in the contact form. */
export const projectTypes = [
  "Website design",
  "Web development",
  "Brand identity",
  "Graphic design",
  "Something else",
] as const;

/** Budget bands offered in the contact form. Edit to match how you actually price. */
export const budgetBands = [
  "Under ₦250k",
  "₦250k – ₦750k",
  "₦750k – ₦2m",
  "₦2m+",
  "Not sure yet",
] as const;

export type NavLink = { label: string; hash: string; href: string };

/**
 * `href` is absolute so the same nav works on case study and legal pages, where
 * a bare `#services` would only point at the current page.
 */
const allNavLinks: NavLink[] = [
  { label: "Home", hash: "#home", href: "/#home" },
  { label: "Services", hash: "#services", href: "/#services" },
  { label: "Work", hash: "#work", href: "/#work" },
  { label: "About", hash: "#about", href: "/#about" },
  { label: "Reviews", hash: "#testimonials", href: "/#testimonials" },
  { label: "Contact", hash: "#contact", href: "/#contact" },
];

/**
 * The Reviews link only exists when there are testimonials to review, so the
 * nav never points at a section that renders nothing.
 */
export const navLinks: NavLink[] = allNavLinks.filter(
  (link) => link.hash !== "#testimonials" || testimonials.length > 0,
);

export const legal = {
  updated: "November 2026",
};
