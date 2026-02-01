import { promises as fs } from "fs";
import path from "path";
import { getPlaiceholder } from "plaiceholder";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUTPUT_FILE = path.join(process.cwd(), "lib", "blur-data.json");

async function getAllImages(dir, images = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await getAllImages(fullPath, images);
    } else if (/\.(png|jpe?g|gif|webp)$/i.test(entry.name)) {
      images.push(fullPath);
    }
  }

  return images;
}

async function generateBlurPlaceholder(imagePath) {
  try {
    const buffer = await fs.readFile(imagePath);
    const { base64 } = await getPlaiceholder(buffer, { size: 10 });
    return base64;
  } catch (error) {
    console.warn(`Warning: Could not generate blur for ${imagePath}:`, error.message);
    return null;
  }
}

async function generate() {
  console.log("Generating blur placeholders...");

  const imagesDir = path.join(PUBLIC_DIR, "images");
  const images = await getAllImages(imagesDir);

  console.log(`Found ${images.length} images`);

  const blurData = {};

  for (const imagePath of images) {
    const relativePath = "/" + path.relative(PUBLIC_DIR, imagePath);
    console.log(`Processing: ${relativePath}`);

    const base64 = await generateBlurPlaceholder(imagePath);
    if (base64) {
      blurData[relativePath] = base64;
    }
  }

  // Ensure lib directory exists
  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(blurData, null, 2));

  console.log(`Generated blur data for ${Object.keys(blurData).length} images`);
  console.log(`Output: ${OUTPUT_FILE}`);
}

generate().catch(console.error);
