/**
 * build-preview.mjs
 *
 * Turns index.html into a single self-contained fragment that can be published
 * as a Claude Artifact (or pasted anywhere that hosts one HTML blob).
 *
 * The site itself needs a real <head> for SEO — title, canonical, Open Graph,
 * meta description. An Artifact supplies its own document skeleton and only
 * accepts page content, so this script:
 *
 *   1. lifts the <title>, the <style> block and the head bootstrap script,
 *   2. base64-inlines both woff2 files, because an Artifact's CSP blocks every
 *      request to another host and relative paths have nothing to resolve to,
 *   3. emits everything between <body> and </body> after them.
 *
 * index.html stays the single source of truth. Nothing here runs in production.
 *
 * Usage:  node tools/build-preview.mjs
 * Output: preview.artifact.html  (gitignored — regenerate, don't edit)
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");

/* The document title is written for search results, where naming both trades
   and the town is the whole point. A preview needs a name, not a summary. */
const PREVIEW_TITLE = "Tecnomicer";

const grab = (src, re, what) => {
  const m = src.match(re);
  if (!m) throw new Error(`build-preview: could not find ${what} in index.html`);
  return m[1];
};

const html = await readFile(join(repo, "index.html"), "utf8");

grab(html, /<title>([\s\S]*?)<\/title>/i, "<title>"); // asserted, then replaced
let style = grab(html, /<style>([\s\S]*?)<\/style>/i, "the <style> block");
const boot = grab(
  html,
  /<script>([\s\S]*?)<\/script>\s*<\/head>/i,
  "the head bootstrap script"
);
const body = grab(html, /<body[^>]*>([\s\S]*?)<\/body>/i, "the <body> contents");

// Inline the fonts. Same files the site serves, just carried in the document.
const fonts = [
  ["/assets/fonts/archivo-wght.woff2", "assets/fonts/archivo-wght.woff2"],
  ["/assets/fonts/martianmono-wght.woff2", "assets/fonts/martianmono-wght.woff2"]
];

for (const [href, path] of fonts) {
  const bytes = await readFile(join(repo, path));
  const uri = `data:font/woff2;base64,${bytes.toString("base64")}`;
  if (!style.includes(href)) throw new Error(`build-preview: ${href} is not referenced in the stylesheet`);
  style = style.replaceAll(href, uri);
}

// A data-URI font is already in the document, so "optional" would be pointless
// and would occasionally drop the label face for no reason.
style = style.replace(/font-display:optional/g, "font-display:block");

const out = `<title>${PREVIEW_TITLE}</title>
<style>
${style}
</style>
<script>${boot}</script>
${body}
`;

const dest = join(repo, "preview.artifact.html");
await writeFile(dest, out, "utf8");

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
console.log(`preview.artifact.html  ${kb(Buffer.byteLength(out))} (fonts inlined)`);
