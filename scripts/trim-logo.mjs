import { readFileSync, writeFileSync } from 'fs';
import { PNG } from 'pngjs';

const inputPath = 'public/logo.png';
const outputPath = 'public/logo-trimmed.png';

const buffer = readFileSync(inputPath);
const png = PNG.sync.read(buffer);

const { width, height, data } = png;
let minX = width;
let minY = height;
let maxX = -1;
let maxY = -1;

const threshold = 16; // treat very dark pixels as background

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const idx = (width * y + x) << 2;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const alpha = data[idx + 3];

    if (alpha === 0) {
      continue;
    }

    if (r > threshold || g > threshold || b > threshold) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

if (maxX < minX || maxY < minY) {
  throw new Error('No non-background pixels found to crop.');
}

const cropWidth = maxX - minX + 1;
const cropHeight = maxY - minY + 1;

const cropped = new PNG({ width: cropWidth, height: cropHeight });

PNG.bitblt(png, cropped, minX, minY, cropWidth, cropHeight, 0, 0);

for (let i = 0; i < cropped.data.length; i += 4) {
  const r = cropped.data[i];
  const g = cropped.data[i + 1];
  const b = cropped.data[i + 2];
  const alpha = cropped.data[i + 3];

  if (alpha === 0) continue;

  if (r <= threshold && g <= threshold && b <= threshold) {
    cropped.data[i + 3] = 0; // make dark background transparent
  } else {
    // ensure white is solid
    cropped.data[i] = 255;
    cropped.data[i + 1] = 255;
    cropped.data[i + 2] = 255;
    cropped.data[i + 3] = 255;
  }
}

writeFileSync(outputPath, PNG.sync.write(cropped));

console.log(`Saved cropped logo to ${outputPath} (${cropWidth}x${cropHeight})`);
