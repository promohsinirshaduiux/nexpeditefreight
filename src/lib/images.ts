// Photos that also have a smaller copy (public/images/<name>-<width>.jpg), made for
// cards and phones so they don't download the full-size original. Value = that width.
const smaller: Record<string, number> = {
  "about-office": 1280,
  "air-freight": 1280,
  "containers-abstract": 1280,
  "customs-clearance": 1280,
  "hero-port": 1280,
  "machinery-crates": 1280,
  "ocean-aerial": 1280,
  "ocean-freight": 1280,
  "office-port": 1280,
  "port-dawn": 1280,
  "project-cargo": 1280,
  "road-transportation": 1280,
  "terminal-aerial": 960,
  "textile": 1280,
  "warehousing": 1280,
};

const nameOf = (src: string) => src.match(/^\/images\/([^/]+)\.jpg$/)?.[1];

/** `srcSet` offering the smaller copy alongside the original, or undefined when there is none. */
export function srcSetFor(src: string) {
  const name = nameOf(src);
  const w = name && smaller[name];
  return w ? `/images/${name}-${w}.jpg ${w}w, ${src} 2048w` : undefined;
}

/** The smaller copy when it exists, else the original (for posters and backgrounds). */
export function mediumSrc(src: string) {
  const name = nameOf(src);
  const w = name && smaller[name];
  return w ? `/images/${name}-${w}.jpg` : src;
}
