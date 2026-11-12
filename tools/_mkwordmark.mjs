/**
 * _mkwordmark.mjs — generates assets/logo-texto.svg
 *
 * The real Tecnomicer wordmark, redrawn as geometry from the supplied raster
 * (_ref/logo.png). The letters are regular enough to rebuild from a few
 * measurements: vertical strokes 30, horizontal strokes 20, x-height 85..267.
 * If the original vector artwork (AI / EPS / SVG) turns up, replace this.
 *
 * Dev-only. Run: node tools/_mkwordmark.mjs
 * Prints the two path strings the page's <symbol id="wm"> uses.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");

const T = 85, B = 267, H = 20, V = 30, Ro = 34, Ri = 14;

const c = (x0, x1) =>
  `M${x1} ${T}H${x0 + Ro}Q${x0} ${T} ${x0} ${T + Ro}V${B - Ro}Q${x0} ${B} ${x0 + Ro} ${B}H${x1}V${B - H}` +
  `H${x0 + V + Ri}Q${x0 + V} ${B - H} ${x0 + V} ${B - H - Ri}V${T + H + Ri}Q${x0 + V} ${T + H} ${x0 + V + Ri} ${T + H}H${x1}Z`;

const e = (x0, x1, end) => {
  const mt = 170, mb = 190, ml = x0 + 55, Rm = 26, Ri2 = 10;
  return `M${end} ${B}H${x0 + Ro}Q${x0} ${B} ${x0} ${B - Ro}V${T + Ro}Q${x0} ${T} ${x0 + Ro} ${T}H${x1 - Ro}Q${x1} ${T} ${x1} ${T + Ro}` +
    `V${mb - Rm}Q${x1} ${mb} ${x1 - Rm} ${mb}H${ml}V${mt}H${x1 - V - Ri2}Q${x1 - V} ${mt} ${x1 - V} ${mt - Ri2}V${T + H + Ri}` +
    `Q${x1 - V} ${T + H} ${x1 - V - Ri} ${T + H}H${x0 + V + Ri}Q${x0 + V} ${T + H} ${x0 + V} ${T + H + Ri}V${B - H - Ri}` +
    `Q${x0 + V} ${B - H} ${x0 + V + Ri} ${B - H}H${end}Z`;
};

const n = (x0, x1) =>
  `M${x0} ${B}V${T}H${x1 - Ro}Q${x1} ${T} ${x1} ${T + Ro}V${B}H${x1 - V}V${T + H + Ri}Q${x1 - V} ${T + H} ${x1 - V - Ri} ${T + H}H${x0 + V}V${B}Z`;

const m = (x0, xm, x1) =>
  `M${x0} ${B}V${T}H${x1 - Ro}Q${x1} ${T} ${x1} ${T + Ro}V${B}H${x1 - V}V${T + H + Ri}Q${x1 - V} ${T + H} ${x1 - V - Ri} ${T + H}` +
  `H${xm + V}V${B}H${xm}V${T + H}H${x0 + V}V${B}Z`;

const o = (x0, x1) =>
  `M${x0 + Ro} ${T}H${x1 - Ro}Q${x1} ${T} ${x1} ${T + Ro}V${B - Ro}Q${x1} ${B} ${x1 - Ro} ${B}H${x0 + Ro}Q${x0} ${B} ${x0} ${B - Ro}V${T + Ro}Q${x0} ${T} ${x0 + Ro} ${T}Z` +
  `M${x0 + V + Ri} ${T + H}Q${x0 + V} ${T + H} ${x0 + V} ${T + H + Ri}V${B - H - Ri}Q${x0 + V} ${B - H} ${x0 + V + Ri} ${B - H}H${x1 - V - Ri}Q${x1 - V} ${B - H} ${x1 - V} ${B - H - Ri}V${T + H + Ri}Q${x1 - V} ${T + H} ${x1 - V - Ri} ${T + H}Z`;

const i = (x0) => `M${x0} ${T}H${x0 + 32}V${B}H${x0}ZM${x0} 30H${x0 + 32}V60H${x0}Z`;

const r = (x0, x1) =>
  `M${x0} ${B}V${T + Ro}Q${x0} ${T} ${x0 + Ro} ${T}H${x1}V${T + H}H${x0 + V + Ri}Q${x0 + V} ${T + H} ${x0 + V} ${T + H + Ri}V${B}Z`;

const t = (x0) =>
  `M${x0} 38H${x0 + V}V${T}H117V${T + H}H${x0 + V}V${B - H - Ri}Q${x0 + V} ${B - H} ${x0 + V + Ri} ${B - H}H107V${B}H${x0 + Ro}Q${x0} ${B} ${x0} ${B - Ro}Z`;

export const TECNO = [t(38), e(135, 272, 258), c(295, 405), n(432, 572), o(600, 745)].join("");
export const MICER = [m(772, 868, 997), i(1028), c(1092, 1205), e(1230, 1367, 1352), r(1392, 1472)].join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 24 1450 250" role="img" aria-label="Tecnomicer">
  <title>Tecnomicer</title>
  <path fill="#EE7E13" fill-rule="evenodd" d="${TECNO}"/>
  <path fill="#3F4145" fill-rule="evenodd" d="${MICER}"/>
</svg>
`;
await writeFile(join(repo, "assets/logo-texto.svg"), svg);
console.log(JSON.stringify({ TECNO, MICER }));
