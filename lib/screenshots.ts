import fs from "node:fs";
import path from "node:path";

/**
 * Screenshots are looked up by filename rather than listed in content.ts, so
 * dropping a file into public/work/ is the whole publishing step: no code edit,
 * no import, and no chance of a card pointing at an image that does not exist.
 *
 *   public/work/<slug>.png        cover shot
 *   public/work/<slug>-2.png      gallery shot
 *   public/work/<slug>-3.png      gallery shot
 *
 * Server-only: this reads the filesystem, so it must never be imported from a
 * client component.
 */

const WORK_DIR = path.join(process.cwd(), "public", "work");
const EXTENSIONS = ["png", "jpg", "jpeg", "webp", "avif"];

function findShot(slug: string, suffix: string): string | undefined {
  for (const extension of EXTENSIONS) {
    const filename = `${slug}${suffix}.${extension}`;
    if (fs.existsSync(path.join(WORK_DIR, filename))) {
      return `/work/${filename}`;
    }
  }
  return undefined;
}

/** Gallery slots, in display order. Extend the range to allow more shots. */
const GALLERY_SLOTS = [2, 3, 4, 5];

export type Screenshots = { cover?: string; gallery: string[] };

export function screenshotsFor(slug: string): Screenshots {
  const cover = findShot(slug, "");
  const gallery = GALLERY_SLOTS.map((slot) => findShot(slug, `-${slot}`)).filter(
    (shot): shot is string => Boolean(shot),
  );

  return { cover, gallery };
}
