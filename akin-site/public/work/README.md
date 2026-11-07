# Project screenshots

Drop images in this folder and they appear on the site. No code change needed:
`lib/screenshots.ts` looks for them by filename when the site builds.

## Naming

| File | Where it shows |
|---|---|
| `<slug>.png` | Cover — the Work card on the home page and the top of the case study |
| `<slug>-2.png` | Second shot, case study only |
| `<slug>-3.png` | Third shot, case study only |
| `<slug>-4.png` | Fourth shot, case study only |

`.jpg`, `.jpeg`, `.webp` and `.avif` work too. Pick one format per shot.

The `<slug>` is the project's slug in `lib/content.ts`:

- `studio-rebrand-site`
- `identity-system`
- `commerce-platform`

So `studio-rebrand-site.png` and `studio-rebrand-site-2.png` are a complete set
for the first project.

## What makes a good shot

- **Full browser width, top of the page.** Not a cropped hero. The card crops to
  4:3 and the case study to 16:9, both anchored top, so the fold is what shows.
- **1920px wide**, JPEG or WebP, under 400KB. Images are served unoptimised
  (static export), so the file size you save is the file size visitors download.
- **Crop out your own browser UI.** The site draws its own address bar.
- **Real content.** Empty states, `Lorem ipsum` and placeholder logos all read as
  unfinished work.

To add the live-site button on a case study, set `liveUrl` on that project in
`lib/content.ts`.
