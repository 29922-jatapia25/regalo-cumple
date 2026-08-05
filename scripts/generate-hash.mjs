import { createHash } from "node:crypto";

const value = process.argv[2];

if (!value) {
  console.error('Uso: node scripts/generate-hash.mjs "mi-clave"');
  process.exit(1);
}

console.log(createHash("sha256").update(value).digest("hex"));
