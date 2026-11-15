// Verificação da sintaxe do código do projeto, sem site, sem rede e sem instalar nada: PHP (php -l), JavaScript
// (node --check), JSON e, nas páginas HTML, o JSON-LD e os <script> escritos na página. Só os ficheiros que estão no
// git, nas pastas dadas (o nosso código: vendor, node_modules e .min.js ficam de fora). Um dos testes do testes.json
// (a manutenção do levelit corre-os no main de 24 em 24 h).
//
//   node <esta pasta>/sintaxe.mjs <pasta ou ficheiro> [...] [--sem=<expressão regular>]
//
// O PHP: a variável PHP ou o "php" do PATH (no PC do Filipe, a manutenção põe lá o PHP do Local). Sem PHP e com
// ficheiros PHP para ver, falha (não passa às escuras). Sai com 1 se alguma coisa estiver mal.
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const sem = args.filter((a) => a.startsWith('--sem=')).map((a) => new RegExp(a.slice(6)));
const pastas = args.filter((a) => !a.startsWith('--'));
if (!pastas.length) { console.error('Uso: node sintaxe.mjs <pasta> [...] [--sem=<regex>]'); process.exit(2); }

const FORA = [/(^|\/)(vendor|node_modules)\//, /\.min\.(js|css)$/, ...sem];
const git = spawnSync('git', ['-C', RAIZ, 'ls-files', '-z', '--', ...pastas], { encoding: 'utf8', windowsHide: true });
if (git.status !== 0) { console.error(`git ls-files falhou: ${git.stderr}`); process.exit(1); }
const todos = git.stdout.split('\0').filter((f) => f && !FORA.some((r) => r.test(f)) && fs.existsSync(path.join(RAIZ, f)));
const de = (...ext) => todos.filter((f) => ext.includes(path.extname(f).toLowerCase()));
const php = de('.php'), js = de('.js', '.mjs', '.cjs'), json = de('.json', '.webmanifest'), html = de('.html', '.htm');
if (!php.length && !js.length && !json.length && !html.length) { console.error(`Nada para verificar em ${pastas.join(' ')} (as pastas estão certas?).`); process.exit(1); }

const falhas = [];
const falha = (tipo, f, erro) => falhas.push(`FALHA ${tipo}: ${f}\n        ${String(erro).trim().split(/\r?\n/).filter(Boolean).slice(0, 4).join('\n        ')}`);
const ler = (f) => fs.readFileSync(path.join(RAIZ, f), 'utf8').replace(/^﻿/, '');

/** Corre um programa e devolve { codigo, saida }. */
const correr = (cmd, a) => new Promise((ok) => {
  let saida = '';
  const c = spawn(cmd, a, { cwd: RAIZ, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
  c.stdout.on('data', (b) => { saida += b; });
  c.stderr.on('data', (b) => { saida += b; });
  c.on('error', (e) => ok({ codigo: -1, saida: e.message }));
  c.on('close', (codigo) => ok({ codigo, saida }));
});
/** Faz fn a cada item, até 8 ao mesmo tempo. */
async function cada(lista, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(8, lista.length) }, async () => { while (i < lista.length) await fn(lista[i++]); }));
}

// PHP
const PHP = process.env.PHP || 'php';
if (php.length) {
  const v = await correr(PHP, ['-v']);
  if (v.codigo !== 0) {
    console.error(`Sem PHP para verificar ${php.length} ficheiro(s) PHP (${PHP}: ${v.saida.trim().split('\n')[0]}). Põe o php no PATH ou a variável PHP.`);
    process.exit(1);
  }
  await cada(php, async (f) => { const r = await correr(PHP, ['-l', '-d', 'display_errors=1', f]); if (r.codigo !== 0) falha('PHP', f, r.saida); });
}
// JavaScript (ficheiros)
await cada(js, async (f) => { const r = await correr(process.execPath, ['--check', f]); if (r.codigo !== 0) falha('JS', f, r.saida); });
// JSON
for (const f of json) { try { JSON.parse(ler(f)); } catch (e) { falha('JSON', f, e.message); } }
// HTML: JSON-LD, importmap e os <script> da própria página (os módulos com node --check, os outros só compilados)
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sintaxe-'));
let scripts = 0;
try {
  for (const f of html) {
    let k = 0;
    for (const m of ler(f).matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      const [, atr, codigo] = m;
      if (/\bsrc\s*=/i.test(atr) || !codigo.trim()) continue;
      const tipo = ((atr.match(/\btype\s*=\s*["']?([^"'\s>]+)/i) || [])[1] || 'text/javascript').toLowerCase();
      const onde = `${f} (<script> n.º ${++k})`;
      scripts++;
      if (/json/.test(tipo) || tipo === 'importmap') { try { JSON.parse(codigo); } catch (e) { falha('JSON', onde, e.message); } }
      else if (tipo === 'module') {
        const t = path.join(tmp, `m${scripts}.mjs`);
        fs.writeFileSync(t, codigo);
        const r = await correr(process.execPath, ['--check', t]);
        if (r.codigo !== 0) falha('JS', onde, r.saida.replaceAll(t, onde));
      } else if (/javascript|ecmascript/.test(tipo)) { try { new vm.Script(codigo, { filename: onde }); } catch (e) { falha('JS', onde, e.message); } }
    }
  }
} finally { fs.rmSync(tmp, { recursive: true, force: true }); }

for (const x of falhas.sort()) console.log(x);
const resumo = [php.length && `${php.length} PHP`, js.length && `${js.length} JS`, json.length && `${json.length} JSON`, html.length && `${html.length} HTML (${scripts} scripts na página)`].filter(Boolean).join(', ');
console.log(`Sintaxe: ${resumo}: ${falhas.length ? `${falhas.length} com erros` : 'tudo certo'}.`);
process.exit(falhas.length ? 1 : 0);
