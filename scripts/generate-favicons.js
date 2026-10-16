// Keep browser and search icons consistent with the editable vector source.
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('next/node_modules/sharp');

async function generateFavicons() {
  const root = path.resolve(__dirname, '..');
  const source = path.join(root, 'public/favicon.svg');
  const sizes = [16, 32, 48, 96, 256];
  const images = await Promise.all(
    sizes.map(size => sharp(source).resize(size, size).png().toBuffer())
  );

  // ICO entries embed PNGs so each tab size has a crisp, native-resolution icon.
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach((image, index) => {
    const entry = 6 + index * 16;
    header[entry] = sizes[index] % 256;
    header[entry + 1] = sizes[index] % 256;
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(image.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += image.length;
  });

  await fs.writeFile(path.join(root, 'app/favicon.ico'), Buffer.concat([header, ...images]));
  await fs.writeFile(path.join(root, 'public/favicon-96x96.png'), images[3]);
}

generateFavicons().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
