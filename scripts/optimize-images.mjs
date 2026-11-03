// Converts raw generated photography in design/source-images into web-ready JPEGs,
// and prepares the official logo (trimmed of its frame, never redrawn).
// Run: node scripts/optimize-images.mjs
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const rawDir = path.join(root, "design/source-images");
const outDir = path.join(root, "public/images");

// Per-image settings where the default is heavier than the image needs.
// terminal-aerial: busy detail compresses poorly; it shows ≤ 600px wide on the
// homepage and as a dimmed full-width background on About.
const overrides = {
  "terminal-aerial": { width: 1400, quality: 65 },
};

for (const file of await readdir(rawDir)) {
  if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
  const name = file.replace(/\.\w+$/, "");
  const { width = 2200, quality = 78 } = overrides[name] ?? {};
  const out = path.join(outDir, `${name}.jpg`);
  await sharp(path.join(rawDir, file))
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true, progressive: true })
    .toFile(out);
  console.log("image", path.basename(out));
}

// Logo: the client's artwork sits on an off-white background with wide margins.
// Crop to the inked pixels (never redrawn), then cut the globe mark out as the icon.
const brand = path.join(root, "public/brand");
await mkdir(brand, { recursive: true });
const src = path.join(root, "design/logo-source.png");

// A pixel counts as ink when it is clearly darker or more saturated than paper.
const INK = (r, g, b, a) => a > 40 && (Math.min(r, g, b) < 215 || Math.max(r, g, b) - Math.min(r, g, b) > 40);

async function inkColumnsAndBox(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const cols = new Array(width).fill(0);
  let top = height, bottom = -1, left = width, right = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (!INK(data[i], data[i + 1], data[i + 2], data[i + 3])) continue;
      cols[x]++;
      if (y < top) top = y;
      if (y > bottom) bottom = y;
      if (x < left) left = x;
      if (x > right) right = x;
    }
  }
  return { cols, box: { left, top, width: right - left + 1, height: bottom - top + 1 } };
}

const pad = 4;
const srcMeta = await sharp(src).metadata();
const { box } = await inkColumnsAndBox(src);
const logoBox = {
  left: Math.max(0, box.left - pad),
  top: Math.max(0, box.top - pad),
  width: Math.min(srcMeta.width - Math.max(0, box.left - pad), box.width + pad * 2),
  height: Math.min(srcMeta.height - Math.max(0, box.top - pad), box.height + pad * 2),
};
const trimmed = await sharp(src).extract(logoBox).png().toBuffer();
await sharp(trimmed).toFile(path.join(brand, "logo.png"));
console.log("logo", logoBox.width, logoBox.height);

// Icon: the globe mark is the first run of inked columns, ending at the gap before the wordmark.
const { cols } = await inkColumnsAndBox(trimmed);
let end = 0, gap = 0;
for (let x = 0; x < cols.length; x++) {
  if (cols[x] > 0) { end = x; gap = 0; } else if (end > 0 && ++gap > 12) break;
}
const markOnly = await sharp(trimmed).extract({ left: 0, top: 0, width: end + 1, height: logoBox.height }).toBuffer();
const markBox = (await inkColumnsAndBox(markOnly)).box;
await sharp(markOnly)
  .extract(markBox)
  .resize(460, 460, { fit: "contain", background: "#ffffff" })
  .extend({ top: 26, bottom: 26, left: 26, right: 26, background: "#ffffff" })
  .flatten({ background: "#ffffff" })
  .png()
  .toFile(path.join(brand, "icon.png"));
console.log("icon", markBox.width, markBox.height);
