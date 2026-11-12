# Tecnomicer

Site de uma página para a **Tecnomicer** — *Tecnologias Minho Cervães* —
pichelaria e eletricidade em Cervães, Vila Verde e concelhos vizinhos.

**Antes de publicar, ler [PLACEHOLDERS.md](PLACEHOLDERS.md).** O telefone, o
email, a morada, o horário e o NIF são valores de exemplo e estão marcados no
site com etiquetas laranja `a confirmar`.

---

## Stack

HTML, CSS e JavaScript estáticos. Sem build, sem dependências, sem framework.
`index.html` é o site inteiro.

Isto foi uma escolha, não uma limitação: aloja em qualquer sítio, nunca quebra
por causa de uma atualização de dependência, e deixa o domínio livre para os
subdomínios de apps e email que vêm depois.

```
index.html               o site — markup, CSS, JS e dados estruturados
privacidade.html         política de privacidade, mesmo sistema visual
assets/fonts/            Bricolage Grotesque + Figtree (variable woff2, self-hosted)
assets/logo-icon.svg     o ícone do logótipo (quatro lâminas), em vetor
assets/logo-texto.svg    o wordmark real, redesenhado em vetor (tools/_mkwordmark.mjs)
favicon.svg              ícone do separador (as lâminas do logótipo)
og-image.svg/.png        imagem de partilha
robots.txt sitemap.xml   indexação
manifest.webmanifest     instalável no ecrã inicial
functions/api/pedido.js  o endpoint do formulário (Cloudflare Pages Function)
PRODUCT.md               o que é o negócio, quem são os clientes, o que não se inventa
DESIGN.md                o sistema visual, tal como está construído
PLACEHOLDERS.md          tudo o que falta preencher
DEPLOY.md                como pôr no ar
tools/serve.mjs          servidor local para testar
tools/build-preview.mjs  gera a pré-visualização partilhável
```

## Ver localmente

```bash
node tools/serve.mjs        # http://localhost:4173
```

Sem servidor não serve: o caminho das fontes é absoluto (`/assets/...`), por
isso abrir o ficheiro direto com `file://` mostra a página sem tipografia.

## Performance

Zero pedidos a terceiros no carregamento. Nenhum CDN, nenhuma biblioteca,
nenhuma fonte remota, nenhum script de analytics. **Três pedidos no primeiro
carregamento:** o documento e as duas fontes. O Turnstile da Cloudflare só é pedido
quando alguém toca no formulário.

| | |
|---|---|
| `index.html` | 102 KB em bruto · **27 KB gzip** · 23 KB brotli |
| Fontes | 61 KB (duas variable woff2, self-hosted, com `preload`) |
| Imagens | nenhuma. O logótipo, a casa e os ícones são SVG inline |
| CSS/JS externos | nenhum. Ambos inline, sem bloqueio de render |

Decisões que sustentam isto:

- **LCP** é o `<h1>`, pintado a opacidade total no primeiro frame. Nada acima da
  dobra espera por JavaScript.
- **FCP** não depende de rede além do documento: o CSS é inline, e as fontes vêm
  da mesma origem com `preload`.
- **CLS**: os SVG têm `viewBox`. Os cinco conselhos do topo ocupam a mesma célula
  da grelha, por isso o topo tem sempre a altura do maior e trocar de problema não
  mexe na página. As mensagens de erro do formulário têm altura reservada.
- **Main thread**: animações em `transform` e `opacity`, as de scroll em
  `animation-timeline: view()`. A rotação do topo para quando sai do ecrã. Nenhum listener de
  scroll.

## Acessibilidade

Funciona sem JavaScript: os contactos são links reais, as cinco respostas aparecem
todas seguidas, o FAQ usa `<details>`, e o formulário tem um `action` `mailto:` como
alternativa. Com `prefers-reduced-motion` não há rotação nem animações. Os separadores
do topo seguem o padrão de tabs do ARIA, com setas, Home e End, e a rotação tem botão
de pausa. Alvos de toque com no
mínimo 52 px. Um `<h1>`, hierarquia de cabeçalhos sem saltos, todos os SVG
etiquetados ou escondidos da tecnologia de apoio, e contraste decidido por
tamanho (ver DESIGN.md): branco sobre laranja só em texto grande e bold.

## SEO

Pensado desde o início, não colado no fim.

- `LocalBusiness` + `Plumber` + `Electrician` em JSON-LD — a forma legível por
  máquinas da tese do negócio: os dois ofícios, uma empresa.
- `areaServed` com os sete concelhos, `serviceArea` com raio, `geo` com
  coordenadas.
- `hasOfferCatalog` com os 12 serviços em dois catálogos.
- `FAQPage` com 6 perguntas, ligado ao `WebPage` por `@id`.
- Título, meta description, canonical, Open Graph e Twitter Card completos.
- `robots.txt`, `sitemap.xml`, `lang="pt-PT"`, HTML semântico.

O texto visível carrega os termos reais de pesquisa — *pichelaria*,
*eletricidade*, *Cervães*, *Vila Verde*, e os nomes dos concelhos e freguesias —
em texto de verdade, nunca dentro de imagens.

Validar em <https://search.google.com/test/rich-results> depois de preencher os
placeholders.

## Alojamento

Qualquer host estático serve. O repositório está preparado para Cloudflare
Pages (`_headers`, `_redirects`, `functions/`); ver [DEPLOY.md](DEPLOY.md).

**Pré-visualização:** cada push para `main` publica em
<https://tecnomicer.levelit.pt> (GitHub Actions, `.github/workflows/deploy.yml`,
no servidor do levelit, sem indexação). É um nginx estático: o `_headers` e o
`_redirects` não se aplicam lá (o `tools/pacote.sh` põe a página legal também em
`privacidade/index.html`) e o `/api/pedido` não existe, por isso o formulário
mostra sempre a alternativa por WhatsApp e email.

Uma coisa a configurar onde quer que fique: **cache longa para
`/assets/fonts/*`** (`Cache-Control: public, max-age=31536000, immutable`) e
curta para o `index.html`.

O domínio fica livre na raiz, como planeado, para `app.tecnomicer.pt`,
`mail.tecnomicer.pt` e o que vier.

## Design

O sistema visual está documentado em [DESIGN.md](DESIGN.md). Resumo: a página
responde a "o que faço agora?". No topo, uma frase enorme com o problema ("Fuga de
água?") e o número por baixo; uma faixa laranja deixa escolher o problema e mostra o
que fazer já.
