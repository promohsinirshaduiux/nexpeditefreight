// Converts raw generated photography in design/source-images into web-ready JPEGs,
// and prepares the official logo (trimmed of its frame, never redrawn).
// Run: node scripts/optimize-images.mjs
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const rawDir = path.join(root, "design/source-images");
const outDir = path.join(root, "public/images");

for (const file of await readdir(rawDir)) {
  if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
  const out = path.join(outDir, file.replace(/\.\w+$/, ".jpg"));
  await sharp(path.join(rawDir, file))
    .resize({ width: 2200, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .toFile(out);
  console.log("image", path.basename(out));
}

// Logo: the supplied artwork has a thin grey frame and white margin.
// Crop the frame off, then trim the remaining white so the mark sits tight.
const brand = path.join(root, "public/brand");
await mkdir(brand, { recursive: true });
const src = path.join(root, "design/logo-source.png");
const meta = await sharp(src).metadata();
const inset = Math.round(meta.height * 0.03);
const cropped = await sharp(src)
  .extract({ left: inset, top: inset, width: meta.width - inset * 2, height: meta.height - inset * 2 })
  .toBuffer();
const trimmed = await sharp(cropped).trim({ background: "#ffffff", threshold: 20 }).png().toBuffer();
await sharp(trimmed).toFile(path.join(brand, "logo.png"));
const t = await sharp(trimmed).metadata();
console.log("logo", t.width, t.height);

// Icon: the globe "N" mark is the left square of the logo.
const mark = await sharp(trimmed)
  .extract({ left: 0, top: 0, width: Math.round(t.height * 0.86), height: t.height })
  .trim({ background: "#ffffff", threshold: 20 })
  .toBuffer();
await sharp(mark)
  .resize(512, 512, { fit: "contain", background: "#ffffff" })
  .png()
  .toFile(path.join(brand, "icon.png"));
console.log("icon done");
