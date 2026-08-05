/**
 * compress-assets.mjs
 * Compresses heavy images in public/assets using sharp (bundled with Next.js).
 * Run: node scripts/compress-assets.mjs
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const tasks = [
  {
    input: path.join(projectRoot, 'public/assets/foto/Asset.jpeg'),
    output: path.join(projectRoot, 'public/assets/foto/Asset.jpeg'),
    options: { quality: 72, mozjpeg: true, progressive: true },
    format: 'jpeg',
  },
];

async function run() {
  for (const task of tasks) {
    if (!fs.existsSync(task.input)) {
      console.warn(`⚠ File not found, skipping: ${task.input}`);
      continue;
    }

    const beforeBytes = fs.statSync(task.input).size;
    const beforeKB = (beforeBytes / 1024).toFixed(0);

    const image = sharp(task.input);

    if (task.format === 'jpeg') {
      await image.jpeg(task.options).toFile(task.output + '.tmp');
    } else if (task.format === 'webp') {
      await image.webp(task.options).toFile(task.output);
    } else if (task.format === 'png') {
      await image.png(task.options).toFile(task.output + '.tmp');
    }

    // Replace original if not keeping it
    if (!task.keepOriginal && fs.existsSync(task.output + '.tmp')) {
      fs.renameSync(task.output + '.tmp', task.output);
    } else if (fs.existsSync(task.output + '.tmp')) {
      fs.unlinkSync(task.output + '.tmp');
    }

    const afterBytes = task.keepOriginal
      ? fs.statSync(task.output).size
      : fs.statSync(task.output).size;
    const afterKB = (afterBytes / 1024).toFixed(0);
    const savedPct = (((beforeBytes - afterBytes) / beforeBytes) * 100).toFixed(0);

    console.log(`✓ ${path.basename(task.output)}: ${beforeKB} KB → ${afterKB} KB (${savedPct}% smaller)`);
  }
}

run().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
