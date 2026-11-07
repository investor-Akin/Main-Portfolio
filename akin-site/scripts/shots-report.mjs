// Reports which projects still need a screenshot.
// Usage: npm run shots
import { existsSync } from "node:fs";
import { join } from "node:path";
import { readFileSync } from "node:fs";

const workDir = join(process.cwd(), "public", "work");
const extensions = ["png", "jpg", "jpeg", "webp", "avif"];

// Read slugs straight out of content.ts so this never drifts from the site.
const source = readFileSync(join(process.cwd(), "lib", "content.ts"), "utf8");
const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

if (slugs.length === 0) {
  console.error("No project slugs found in lib/content.ts");
  process.exit(1);
}

const find = (slug, suffix) =>
  extensions
    .map((ext) => `${slug}${suffix}.${ext}`)
    .find((name) => existsSync(join(workDir, name)));

let missing = 0;

for (const slug of slugs) {
  const cover = find(slug, "");
  const gallery = [2, 3, 4, 5].map((n) => find(slug, `-${n}`)).filter(Boolean);

  if (!cover) {
    missing += 1;
    console.log(`MISSING  ${slug.padEnd(24)} needs ${slug}.png`);
  } else {
    const extra = gallery.length > 0 ? `, +${gallery.length} gallery` : "";
    console.log(`ok       ${slug.padEnd(24)} ${cover}${extra}`);
  }
}

console.log(
  missing === 0
    ? "\nAll projects have a cover shot."
    : `\n${missing} project(s) still show the generated panel instead of a screenshot.`,
);
