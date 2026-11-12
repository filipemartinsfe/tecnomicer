#!/usr/bin/env bash
# Junta em pacote/ só o que o site publica (sem _ref, tools, documentação nem o preview) e gera pacote.tgz.
# Usado pelo GitHub Actions (.github/workflows/deploy.yml) para publicar em https://tecnomicer.levelit.pt.
#
# Esse servidor é um nginx estático: não lê o _headers nem o _redirects da Cloudflare Pages, por isso a página legal vai
# também como privacidade/index.html (o URL /privacidade/ funciona sem regras). A functions/api/pedido.js também não
# corre lá: o formulário cai na alternativa por WhatsApp e email, como quando o envio falha.
set -euo pipefail
cd "$(dirname "$0")/.."
FICHEIROS=(index.html privacidade.html assets favicon.svg manifest.webmanifest og-image.png og-image.svg robots.txt sitemap.xml)
for f in "${FICHEIROS[@]}"; do [ -e "$f" ] || { echo "Falta $f" >&2; exit 1; }; done
rm -rf pacote pacote.tgz
mkdir -p pacote/privacidade
cp -r "${FICHEIROS[@]}" pacote/
cp privacidade.html pacote/privacidade/index.html
tar czf pacote.tgz -C pacote .
echo "pacote.tgz: $(find pacote -type f | wc -l) ficheiros, $(du -k pacote.tgz | cut -f1) KB"
