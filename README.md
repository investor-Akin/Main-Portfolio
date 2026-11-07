# Onigbinde Akinbowale — portfolio

My portfolio and case-study site. Next.js App Router, TypeScript, Tailwind,
exported to static HTML so it hosts anywhere for free.

Live: [akinfolio.vercel.app](https://akinfolio.vercel.app)

## Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build

```bash
npm run build        # prerenders to ./out as plain HTML/CSS
npm run preview      # serves ./out on http://localhost:4000
```

`out/` is the deployable artifact. There is no server at runtime — no database,
no API, no environment variables needed.

## Where things live

| Path | What it is |
|---|---|
| `lib/content.ts` | **All the site's text and data.** Bio, services, stack, projects, stats, certifications, testimonials. Edit here, not in the components. |
| `lib/screenshots.ts` | Project image paths and their metadata |
| `app/page.tsx` | Assembles the home page from the section components, in order |
| `app/work/[slug]/page.tsx` | One case-study page generated per project in `lib/content.ts` |
| `app/layout.tsx` | Fonts, metadata, Open Graph tags, analytics |
| `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` | Generated SEO files |
| `components/` | One file per page section, plus `ui.tsx` / `reveal.tsx` shared primitives |
| `lib/gsap.ts` | GSAP + ScrollTrigger registration, one place |
| `components/scroll-effects.tsx` | Scroll progress bar and `data-parallax` drift |
| `components/reveal.tsx` | Scroll-triggered entrance used by every section |
| `public/` | Static assets served as-is: CV PDF, photos, OG image |
| `cv/cv.html`, `cv/build-pdf.ps1` | The CV as an A4 HTML page, and the script that prints it to `public/akin-cv.pdf` |

## Editing content

Everything visitor-facing comes from `lib/content.ts`. Change a string there and
every place it appears updates — the page, the metadata and the case studies.

## CV

The PDF is generated, not hand-edited:

```bash
powershell -ExecutionPolicy Bypass -File cv/build-pdf.ps1
```

Edit `cv/cv.html`, run that, and `public/akin-cv.pdf` is rewritten. It prints one
A4 page, so keep an eye on length when adding lines.

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static export into `out/` |
| `npm run preview` | Serve the built `out/` folder on port 4000 |
| `npm run og` | Regenerate the Open Graph image |
| `npm run shots` | Screenshot report for project images |
| `scripts/restart-preview.ps1` | Restart the preview server on Windows |

## Deploying

Hosted on Vercel with the default Next.js settings. Any static host works too —
upload the contents of `out/`.
