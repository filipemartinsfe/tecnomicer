/**
 * _mkwordmark.mjs — generates assets/logo-texto.svg
 *
 * The wordmark as a standalone file, for anywhere the live page's own text
 * cannot be used (email signatures, invoices, vehicle livery artwork). The
 * font is embedded as a data URI so the file renders identically without
 * Archivo installed and without a single network request.
 *
 * The site header does NOT use this file — it sets the wordmark as real text,
 * which stays selectable, scales with the type system and costs no request.
 *
 * viewBox width is measured in a browser once and pinned below; rerun
 * tools/_measure-wordmark.html if the size, weight or tracking changes.
 *
 * Dev-only. Run: node tools/_mkwordmark.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");

const SIZE = 130;
const WEIGHT = 600;
const TRACK = -5.2;
const WIDTH = Number(process.argv[2] ?? 706); // measured advance width
const PAD = 6;

const font = await readFile(join(repo, "assets/fonts/archivo-wght.woff2"));
const uri = `data:font/woff2;base64,${font.toString("base64")}`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH + PAD * 2} 168" role="img" aria-label="Tecnomicer">
  <title>Tecnomicer</title>
  <style>
    @font-face{
      font-family:"Archivo";
      src:url("${uri}") format("woff2");
      font-weight:100 900; font-style:normal;
    }
    .w{ font-family:"Archivo",system-ui,sans-serif; font-size:${SIZE}px;
        font-weight:${WEIGHT}; letter-spacing:${TRACK}px; }
  </style>
  <text class="w" x="${PAD}" y="122">
    <tspan fill="#EE7E13">tecno</tspan><tspan fill="#3F4145">micer</tspan>
  </text>
</svg>
`;

await writeFile(join(repo, "assets/logo-texto.svg"), svg, "utf8");
console.log(`assets/logo-texto.svg  ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB (font embedded), width ${WIDTH}`);
