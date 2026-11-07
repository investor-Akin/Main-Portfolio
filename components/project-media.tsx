import Image from "next/image";

type Props = {
  image?: string;
  title: string;
  index: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Shown in the browser bar when the shot is of a real website. */
  url?: string;
};

/**
 * Cover art for a project: the supplied image when there is one, otherwise a
 * generated panel. Shared by the home page cards and the case study pages so
 * both look identical.
 *
 * Screenshots are drawn inside a browser frame because a site shown as a
 * floating rectangle reads as a mockup, while the same site inside a chrome bar
 * reads as a website that exists.
 */
export function ProjectMedia({
  image,
  title,
  index,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
  url,
}: Props) {
  if (image) {
    return (
      <div
        className={`flex flex-col overflow-hidden rounded-[18px] bg-ink ring-1 ring-ink/10 ${className}`}
      >
        <div className="flex shrink-0 items-center gap-2 bg-ink-panel px-3 py-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2 rounded-full bg-cream/25" />
            <span className="size-2 rounded-full bg-cream/25" />
            <span className="size-2 rounded-full bg-orange/70" />
          </span>
          {url && (
            <span className="ml-1 truncate rounded-full bg-cream/10 px-2 py-0.5 text-[10px] font-medium text-cream/55">
              {url.replace(/^https?:\/\//, "")}
            </span>
          )}
        </div>
        <div className="relative flex-1 overflow-hidden bg-ink-card">
          <Image
            src={image}
            alt={`${title} website`}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover object-top"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`relative flex items-center justify-center overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#33312f_0%,#211c22_58%,#3d2620_100%)] ${className}`}
    >
      <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,#f6fbf7_1px,transparent_1px),linear-gradient(to_bottom,#f6fbf7_1px,transparent_1px)] [background-size:28px_28px]" />
      <span className="font-display text-6xl font-extrabold tracking-tighter text-cream/[0.13]">
        0{index + 1}
      </span>
    </div>
  );
}
