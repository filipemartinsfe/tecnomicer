# Tecnomicer

Site de uma página para a **Tecnomicer** — *Tecnologias Minho Cervães* —
pichelaria e eletricidade em Cervães, Vila Verde e concelhos vizinhos.

**Antes de publicar, ler [PLACEHOLDERS.md](PLACEHOLDERS.md).** O telefone, o
email, a morada, o horário e o NIF são valores de exemplo e estão marcados no
site com badges âmbar `a confirmar`.

---

## Stack

HTML, CSS e JavaScript estáticos. Sem build, sem dependências, sem framework.
`index.html` é o site inteiro.

Isto foi uma escolha, não uma limitação: aloja em qualquer sítio, nunca quebra
por causa de uma atualização de dependência, e deixa o domínio livre para os
subdomínios de apps e email que vêm depois.

```
index.html               o site — markup, CSS, JS e dados estruturados
assets/fonts/            Archivo + Martian Mono (variable woff2, self-hosted)
favicon.svg              ícone (gota de água com um relâmpago dentro)
og-image.svg             imagem de partilha — converter para PNG, ver PLACEHOLDERS
robots.txt sitemap.xml   indexação
manifest.webmanifest     instalável no ecrã inicial
PRODUCT.md               o que é o negócio, quem são os clientes, o que não se inventa
DESIGN.md                o sistema visual, tal como está construído
PLACEHOLDERS.md          tudo o que falta preencher
tools/serve.mjs          servidor local para testar
tools/build-preview.mjs  gera a pré-visualização partilhável
```

## Ver localmente

```bash
node tools/serve.mjs        # http://localhost:4173
```

Sem servidor não serve: os caminhos das fontes são absolutos (`/assets/...`),
por isso abrir o ficheiro direto com `file://` mostra a página sem tipografia.

## Performance

Zero pedidos a terceiros. Nenhum CDN, nenhuma biblioteca, nenhuma fonte remota,
nenhum script de analytics. **Três pedidos no primeiro carregamento:** o
documento e as duas fontes.

| | |
|---|---|
| `index.html` | 82 KB em bruto · **22 KB gzip** · 18 KB brotli |
| Fontes | 57 KB (duas variable woff2, self-hosted, com `preload`) |
| Imagens | nenhuma. Todos os gráficos são SVG inline |
| CSS/JS externos | nenhum. Ambos inline, sem bloqueio de render |

Decisões que sustentam isto:

- **LCP** é o `<h1>`, e não tem animação de entrada — é pintado a opacidade
  total no primeiro frame. Nada acima da linha de água espera por JavaScript.
- **FCP** não depende de rede além do documento: o CSS é inline, e as fontes
  vêm da mesma origem com `preload`, por isso chegam dentro do período de
  bloqueio e não provocam troca de tipo de letra.
- **CLS**: os SVG têm `viewBox`, logo o rácio é reservado antes de pintar. As
  animações de entrada usam só `opacity` e `transform` — nunca mexem no layout.
  As mensagens de erro do formulário têm altura reservada (`min-height`) para
  não empurrarem nada quando aparecem. A Martian Mono usa
  `font-display: optional`, por isso nunca troca a meio.
- **Main thread**: a barra de progresso e o medidor de nível usam
  `animation-timeline: scroll()`, que corre fora do main thread. Onde essa
  funcionalidade não existe, um único `requestAnimationFrame` escreve um
  `transform` em exatamente dois elementos — sem leitura de layout e sem
  recálculo de estilo no resto da página. O resto é `IntersectionObserver`.
- **A água da barragem** para de animar quando o hero sai do viewport, para o
  resto da página rolar contra um compositor parado.
- Nenhum `getTotalLength()`: os traços desenhados usam `pathLength="1"` no
  markup, por isso o comprimento é declarado e não medido.
- `backdrop-filter` só a partir de 1024 px, onde há folga de GPU para ele.

## Acessibilidade

Funciona sem JavaScript: os contactos são links reais, o FAQ usa
`<details>`, e o formulário tem um `action` `mailto:` como alternativa. As
animações desligam-se com `prefers-reduced-motion`. Alvos de toque com no mínimo
52 px. Um `<h1>`, hierarquia de cabeçalhos sem saltos, e todos os SVG
etiquetados ou escondidos da tecnologia de apoio.

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

Qualquer host estático serve. Cloudflare Pages ou Netlify dão brotli e HTTP/2
sem configuração, o que é o que falta para os números acima.

Uma coisa a configurar onde quer que fique: **cache longa para
`/assets/fonts/*`** (`Cache-Control: public, max-age=31536000, immutable`) e
curta para o `index.html`.

O domínio fica livre na raiz, como planeado, para `app.tecnomicer.pt`,
`mail.tecnomicer.pt` e o que vier.

## Design

O sistema visual está documentado em [DESIGN.md](DESIGN.md). Resumo: o Minho
hidroelétrico — aqui é a água que faz a eletricidade, que é a razão física de
uma empresa cobrir os dois ofícios. A página desce como uma barragem, da
superfície da albufeira até à aldeia iluminada, e o acento caminha de azul-água
para âmbar-corrente à medida que se desce.
