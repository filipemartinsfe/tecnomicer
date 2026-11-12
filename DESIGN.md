# Design

Documenta o sistema visual **tal como está construído** em `index.html`, não
como foi imaginado. Se o código e este ficheiro discordarem, o código é que está
certo e corrige-se aqui.

## A ideia

**O site responde a "o que faço agora?" antes de falar da empresa.** O visitante
chega com um problema, muitas vezes ao telemóvel e com pressa. O ponto focal é
uma frase enorme no topo: o problema muda ("Fuga de água?", "Ficou sem luz?") e
por baixo fica sempre "Ligue 900 000 000." Logo a seguir, o que fazer já. Na base
do primeiro ecrã, uma faixa laranja com os cinco problemas.

Decidido em duas etapas:

- 1 de novembro de 2026: depois de rejeitados o conceito escuro da barragem e uma
  versão branca estática (título à esquerda, cartão escuro à direita), ficou a
  página de triagem.
- 4 de novembro de 2026: entre três heros a funcionar (A, a pergunta; B, a casa;
  C, a frase), foi escolhido o C. A casa animada saiu do topo; o desenho está
  guardado fora do repositório caso volte como secção própria.

## Cor

Neutros frios e o laranja e o grafite do logótipo. Fundo branco, porque o
logótipo foi desenhado para branco e o uso é um telemóvel de dia ou numa divisão
iluminada.

| Token | Valor | Uso |
|---|---|---|
| `--branco` | `#FFFFFF` | fundo da página, cartão de resposta, formulário |
| `--fundo` | `#F2F4F6` | banda de "Como funciona", campos, círculos dos ícones |
| `--tinta` | `#1C1E21` | texto, painéis escuros, botões pequenos, separador ativo |
| `--grafite` | `#3F4145` | o grafite do logótipo: wordmark, navegação |
| `--cinza` | `#5C6268` | voz secundária |
| `--linha` / `--linha-forte` | `#DDE1E5` / `#BFC5CA` | filetes, contorno de botões secundários |
| `--laranja` | `#EE7E13` | o laranja do logótipo: numerais, palavras grandes, wordmark |
| `--laranja-clara` | `#F8AB60` | laranja sobre fundo escuro |
| `--acao` / `--acao-hover` | `#D4660A` / `#BC5905` | botões primários, faixa dos problemas, frase do topo |
| `--laranja-texto` | `#A85605` | laranja como texto pequeno sobre claro |
| `--laranja-tinta` | `#FDEFE0` | caixa "Faça isto agora", etiquetas `a confirmar` |
| `--agua*` | `#0E3F70` | semântico: só significa água (painel de pichelaria) |

### Contraste, decidido e não suposto

Branco sobre `#EE7E13` dá 2,75:1 e não passa, e texto preto sobre laranja foi
recusado por ser feio. Por isso:

- **Botões primários:** branco sobre `--acao` (3,7:1), sempre em 1,17 rem bold,
  que conta como texto grande. Botões mais pequenos são grafite (`.btn--sm`).
- **Faixa dos problemas:** branco sobre `--acao`, também a 1,17 rem bold. O
  separador ativo passa a branco com texto escuro.
- **Frase do topo:** `--acao` sobre branco, só em tamanho de título.

## Tipografia

Duas faces self-hosted, variable woff2, licença OFL.

- **Bricolage Grotesque** (`assets/fonts/bricolage-wght.woff2`, 41 KB): títulos e
  números. Tem carácter sem ser "de design", e as palavras grandes vivem dela.
- **Figtree** (`assets/fonts/figtree-wght.woff2`, 20 KB): texto, botões e rótulos.

| Papel | Tamanho | Peso |
|---|---|---|
| `h1` (linha de cima, com as palavras de pesquisa) | `clamp(1.05rem, .95rem + .4vw, 1.25rem)` | 600 |
| frase que roda | `min(8.8rem, 11.6cqi)` | 800 |
| "Ligue 900 000 000." | `min(6rem, 8.6cqi)` | 800 |
| `h2` | `clamp(2rem, 1.3rem + 3vw, 3.75rem)` | 700 |
| palavras em scroll | `clamp(2.6rem, 1.2rem + 6.5vw, 7.5rem)` | 800 |
| frase "quem somos" | `clamp(1.8rem, 1.1rem + 3.1vw, 3.9rem)` | 700 |
| botão primário | `1.17rem` | 700 |
| corpo | `clamp(1rem, .97rem + .15vw, 1.0625rem)` | 400 |

Sem *eyebrows*, sem travessões no texto visível, sem numeração de secções (os
numerais 1, 2, 3 só existem nos passos, onde a ordem é informação).

## Forma e espaço

Botões e separadores em pílula, painéis a 28 px, campos a 12 px. Largura máxima
`84rem`, `--gutter: clamp(1rem, 3.4vw, 2.5rem)`, bandas com
`clamp(4.5rem, 9vw, 8rem)` na vertical.

## Secções

1. **Topo** (`.hero`, âncoras `#inicio` e `#emergencia`). Ocupa o primeiro ecrã.
   Linha de cima com o `h1`, a frase que roda, o número, o que fazer já, os botões
   Ligar e WhatsApp (com mensagem já escrita para o problema escolhido), e em baixo a
   faixa laranja com os cinco problemas. No telemóvel a faixa tem duas colunas e o
   último problema ocupa a linha toda.
3. **Palavras grandes** (`.palavras`). Os ofícios em letra enorme, movidos só
   pelo scroll do visitante.
4. **Serviços** (`.redes`). Dois painéis, azul e grafite. Cada serviço é uma ligação
   que leva o ofício e o nome para o formulário.
5. **Como funciona** (`.pilha`). Três cartões que se empilham no scroll, com uma
   conversa de exemplo, uma nota de orçamento e uma lista que se assinala.
6. **Quem somos** (`.manif`, `.prom`). Uma frase grande que acende palavra a palavra.
7. **Zona** (`.zona`). Esquema radial a partir de Cervães, com a direção aproximada
   de cada concelho, identificado como esquema e não como mapa. Lista e esquema
   apontam um para o outro em hover.
8. **Perguntas** (`.perg`). Título fixo à esquerda, acordeão à direita.
9. **Contacto** (`.cont`). Painel escuro com o número, formulário ao lado.
10. **Rodapé.** Termina no wordmark à largura toda.

### Marca

O wordmark é o real: `tools/_mkwordmark.mjs` redesenha-o em geometria a partir de
`_ref/logo.png`, comparado lado a lado com o original. Está em `assets/logo-texto.svg`
e como `<symbol id="wm">` na página. As quatro lâminas estão em `assets/logo-icon.svg`,
`favicon.svg` e `<symbol id="marca">`. Se aparecer o vetor original, substitui ambos.

Um `<use>` de um símbolo fica na origem do `<svg>` exterior, por isso o `viewBox`
exterior tem de começar em `0 0`. Se começar na origem do símbolo, o logótipo fica
cortado.

### A frase

O tamanho da frase vem da largura do contentor (`container-type: inline-size`, unidades
`cqi`), calculado para a mais larga, "Sem água quente?", que mede 8,36 em. Assim cabe
numa linha de 320 px a 1440 px. Se mudares alguma frase, mede-a e corrige o `11.6cqi`.

## Movimento

- **O momento da página:** a frase do topo como um rolo. A linha é uma máscara com a
  altura de uma frase; a que sai e a que entra deslizam juntas, uma linha inteira, na
  mesma curva (0,85 s), por isso nunca se sobrepõem.
- **Rotação contínua:** troca a cada 5,5 s, sempre, enquanto o topo estiver no ecrã.
  A barra do separador ativo é o temporizador (`animationend`). Escolher um problema
  salta para ele e a rotação continua a partir daí. Só o botão Pausar a para, e espera
  quando o topo sai do ecrã. Não arranca com `prefers-reduced-motion`.
- **Scroll:** palavras grandes, formas de fundo dos painéis e a frase "quem somos" usam
  `animation-timeline: view()`, fora do main thread. Onde não existe, ficam paradas e
  legíveis.
- **Entradas:** opacidade e `translateY`, só com a classe `.rvj`, que o script só põe
  se puder também revelar. Um `scrollend` apanha o que um salto não atravessou.
- O detetor do impeccable deixa um aviso aceite: o acordeão anima `height` em
  `::details-content`, afeta um só elemento e não existe sem suporte.

## Regras que não se quebram

1. **Nada de terceiros no carregamento.** Documento e duas fontes. O Turnstile só
   carrega quando alguém toca no formulário. Sem imagens raster na página.
2. **Nada espera por JavaScript.** Links `tel:`, `wa.me` e `mailto:` reais, FAQ em
   `<details>`, formulário com `action`. Sem script, as cinco respostas aparecem
   todas seguidas.
3. **Contraste decidido por tamanho**, como acima.
4. **Placeholders são visíveis**, com a etiqueta `a confirmar`.
5. **Sem testemunhos, avaliações, estatísticas ou preços inventados.** A conversa do
   passo 1 está marcada como exemplo.
6. **Sem travessão (—) no texto visível.**
