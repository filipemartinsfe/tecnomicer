# Tecnomicer

Site de uma página (HTML, CSS e JS estáticos, sem build nem dependências) da Tecnomicer, pichelaria e
eletricidade em Cervães, Vila Verde. Staging: https://tecnomicer.levelit.pt. Repositório `filipemartinsfe/tecnomicer`.

## Regras obrigatórias

1. **Falar sempre em português de Portugal** (o site é `pt-PT`).
2. **Ler antes de trabalhar:** `MEMORIA.md` (estado, decisões, armadilhas), `README.md`, `PRODUCT.md` (o que é o
   negócio e o que não se inventa), `DESIGN.md` (sistema visual) e `PLACEHOLDERS.md`.
3. **Dados do cliente por confirmar não se inventam.** Telefone, email, morada, horário e NIF são valores de exemplo,
   marcados no site com a etiqueta laranja "a confirmar" (lista em `PLACEHOLDERS.md`). Não se tiram as etiquetas sem
   o valor verdadeiro; sem testemunhos, avaliações, números de trabalhos, anos de experiência nem certificações.
   O que faltar ou se contradisser regista-se em `PLACEHOLDERS.md`.
4. **Nada de credenciais no repositório nem no chat.** Chaves (Turnstile, SSH de deploy, Cloudflare) vivem nos
   segredos do GitHub e nas variáveis do Cloudflare Pages; o utilizador é que as define.
5. **Zero pedidos a terceiros** no carregamento: sem CDN, bibliotecas, fontes remotas nem analytics (ver `README.md`,
   "Performance"). Fontes self-hosted em `assets/fonts/`.
6. Antes de mudar um estilo, texto ou marcação, procurar (`grep`) onde se repete: o site é `index.html` mais
   `privacidade.html`, com o mesmo sistema visual.

## Estrutura

- `index.html`: o site inteiro (markup, CSS, JS e JSON-LD). `privacidade.html`: política de privacidade.
- `assets/` (fontes, logótipo), `favicon.svg`, `og-image.*`, `manifest.webmanifest`, `robots.txt`, `sitemap.xml`.
- `functions/api/pedido.js`: endpoint do formulário (Cloudflare Pages Function, Turnstile). Não corre no staging.
- `_headers`, `_redirects`: para o Cloudflare Pages (o staging, em nginx, não os lê).
- `tools/`: `serve.mjs` (servidor local), `pacote.sh` (junta o que se publica), `build-preview.mjs`, `_mk*.mjs`.
- `dev/sintaxe.mjs`: verificação de sintaxe. `_ref/`, `preview.artifact.html`: material de apoio, não se publicam.

## Testar

- Automáticos (também em `testes.json`, que a manutenção do levelit corre no main):
  `node dev/sintaxe.mjs .` e `bash tools/pacote.sh` (falha se faltar algum ficheiro publicado).
- No browser: `node tools/serve.mjs` (http://localhost:4173; sem servidor as fontes não carregam). Ver
  `index.html` e `privacidade.html` inteiras a 360/390, 768, 1024, 1280 e 1920px, sem scroll horizontal nem texto
  cortado, e sem JavaScript os contactos têm de continuar a funcionar (ver `README.md`, "Acessibilidade").

## Publicar

- **Staging:** cada push para `main` dispara `.github/workflows/deploy.yml` (verifica JS e JSON, corre
  `tools/pacote.sh`, envia o pacote por SSH para o servidor do levelit, `/var/www/tecnomicer`). Só push de
  documentação sem efeito no site leva `[skip ci]` na mensagem do commit.
- **Domínio real (`tecnomicer.pt`, Cloudflare Pages, Turnstile, Email Routing):** passos em `DEPLOY.md`. Ainda não
  foi feito e **não se publica lá enquanto o `PLACEHOLDERS.md` não estiver preenchido**.

## Memória

No fim de cada trabalho, atualizar `MEMORIA.md` (estado, decisões e porquê, pendentes, armadilhas) no mesmo commit.
