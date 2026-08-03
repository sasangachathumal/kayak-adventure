import fs from "fs";
import path from "path";

function getAvifDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  const i = buffer.indexOf(Buffer.from("ispe"));
  if (i === -1) throw new Error("ispe box not found");
  return { width: buffer.readUInt32BE(i + 8), height: buffer.readUInt32BE(i + 12) };
}

const dir = path.join(process.cwd(), "public/gallery-images");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".avif"));
files.sort((a, b) => (+(a.match(/\d+/)?.[0] ?? 0)) - (+(b.match(/\d+/)?.[0] ?? 0)));

const images = files.map((file, idx) => {
  const num = file.match(/\d+/)?.[0] ?? "";
  let width = 800, height = 600;
  try { ({ width, height } = getAvifDimensions(path.join(dir, file))); }
  catch (e) { console.warn(`dims failed for ${file}: ${e.message}`); }
  return {
    src: `/gallery-images/${file}`,
    alt: `Kayak Adventure - Moment ${num}`,
    span: idx % 6 === 0 || idx % 7 === 3 ? "tall" : undefined,
    width, height,
  };
});

if (images.length === 0) {
  throw new Error(`Gallery manifest empty. cwd=${process.cwd()} dir=${dir}`);
}

fs.mkdirSync(path.join(process.cwd(), "data"), { recursive: true });
fs.writeFileSync(
  path.join(process.cwd(), "data/gallery-manifest.json"),
  JSON.stringify(images, null, 2)
);
console.log(`Wrote ${images.length} gallery images.`);