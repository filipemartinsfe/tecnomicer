# Design

Documenta o sistema visual **tal como está construído** em `index.html`, não
como foi imaginado. Se o código e este ficheiro discordarem, o código é que está
certo — corrige-se aqui.

## A ideia

**O Minho hidroelétrico.** Aqui é a água que faz a eletricidade. Essa é a razão
física — não um argumento de venda — pela qual uma empresa cobrir os dois
ofícios faz sentido: a água e a corrente são a mesma coisa em dois estados, e
numa casa correm nas mesmas paredes.

A página é uma barragem. Desce da superfície da albufeira, passa pelo
descarregador, e chega à aldeia iluminada. O acento acompanha a descida:
azul-água em cima, âmbar-corrente em baixo.

O que isto recusa explicitamente: o template do setor — gradiente azul, foto de
homem com chave de grifos, três cartões iguais com ícone e título, lista de
"porque nos escolher". Nenhum desses elementos existe aqui.

## Cor

Estratégia: **paleta completa**, quatro papéis nomeados, comprometida com o
escuro. Escuro não por hábito de categoria, mas pela cena de uso: alguém num
corredor às escuras porque o quadro disparou, com o telemóvel a ser a coisa mais
brilhante do sítio. O âmbar é a luz a voltar.

### Água — o terreno

| Token | Valor | Uso |
|---|---|---|
| `--agua-abisso` | `#041216` | fundo das secções densas, rodapé, texto sobre âmbar |
| `--agua-funda` | `#08222A` | fundo do `body` |
| `--agua` | `#0C3B47` | meio do gradiente do hero |
| `--agua-media` | `#125767` | base do gradiente do hero |
| `--agua-clara` | `#2E93A6` | traço dos diagramas de água, gota da marca |
| `--agua-luz` | `#6FCBD9` | linhas de superfície da albufeira, mistura no texto de entrada |

### Corrente — o acento

| Token | Valor | Uso |
|---|---|---|
| `--corrente` | `#FFB627` | ação primária, segunda linha do `h1`, banda de urgências |
| `--corrente-quente` | `#FF8A1F` | fim do gradiente da banda de urgências, ligações ativas do mapa |

Sódio e tungsténio, não néon. Nunca usado como halo: os botões têm elevação
real — realce superior de 1px e sombra escura projetada — porque numa base
escura um brilho colorido lê-se como decoração, não como profundidade.

### Espuma, granito, cal

| Token | Valor | Uso |
|---|---|---|
| `--espuma` | `#E9F5F3` | texto corrente sobre escuro |
| `--espuma-forte` | `#FAFDFC` | cabeçalhos, nomes de serviço |
| `--granito` | `#9DACAF` | voz secundária. Cinza com desvio para o azul da água — escolhido, não herdado |
| `--granito-fundo` | `#5A6C70` | traço de paredes, marcas inativas do medidor |
| `--cal` | `#EBEBE2` | fundo da única secção clara (zona de trabalho) |
| `--pedra` | `#333C3F` | texto sobre `--cal` |

A secção clara não é decorativa: quebra deliberadamente o padrão
"quase-preto com um acento" e dá à página um sítio para respirar antes do fim.

### `--fio` — o acento vivo

`--fio` é redeclarado **estaticamente por secção**, e caminha de
`--agua-clara` no topo para `--corrente` no fim. Isto foi uma decisão de
performance com consequência de design: uma variável global atualizada no scroll
força recálculo de estilo em toda a página a cada frame. Por secção, custa zero
em runtime e diz a mesma coisa.

## Tipografia

Duas faces, ambas self-hosted, variable woff2, 57 KB no total.

**Archivo** (peso 100–900) — grotesca de sinalética. Escolhida pelo registo:
placas de barragem, sinais de infraestrutura, chapas de identificação. Carrega
tudo excepto etiquetas. `font-display: swap`, com `preload`, mesma origem.

**Martian Mono** (peso 100–800) — só em etiquetas e medições: os rótulos `.rot`,
os badges `a confirmar`, os `label` do formulário, o medidor de nível, os passos.
Nunca como fantasia de "técnico". `font-display: optional`, para nunca poder
deslocar o layout.

### Escala

| Papel | Tamanho | Peso | Tracking |
|---|---|---|---|
| `h1` | `clamp(2.7rem, 11.5vw, 5.6rem)` | 800 | `-.035em` |
| `h1 .l--3` | `clamp(1.05rem, 3.4vw, 1.6rem)` | 600 | `-.02em` |
| `h2` | `clamp(2rem, 1.4rem + 2.6vw, 3.35rem)` | 800 | `-.035em` |
| `h2` (urgências) | `clamp(2.1rem, 1.3rem + 3.4vw, 3.9rem)` | 800 | `-.035em` |
| `h3` | `clamp(1.15rem, 1rem + .6vw, 2.1rem)` | 800 | `-.035em` |
| corpo | `clamp(1rem, .96rem + .18vw, 1.1rem)` | 400 | `-.005em` |
| entrada | `clamp(1.05rem, .98rem + .5vw, 1.28rem)` | 400 | `-.005em` |
| `.rot` etiqueta | `.7rem` | 500 | `.15em`, caixa alta |

Medida do texto corrido: `--measure: 68ch`. Cabeçalhos com
`text-wrap: balance`, parágrafos com `text-wrap: pretty`.

## Espaçamento

Um ritmo só. `--gutter: clamp(1.25rem, 4vw, 3.5rem)` nas margens laterais,
`clamp(4.5rem, 12vh, 8.5rem)` no interior das bandas, `--tight` a
`clamp(3.5rem, 9vh, 6rem)` onde a secção é curta. Mais espaço acima de um
cabeçalho do que abaixo. Largura máxima `78rem`.

Grupos irmãos usam `grid`/`flex` com `gap`, não margens por elemento.

## Componentes

Não existem cartões como estrutura de página. Cada secção tem a forma daquilo
que contém:

- **`.canal`** — os dois ofícios como dois canais de um sistema. Borda superior
  de 2px na cor do canal, gradiente que desvanece, e um diagrama desenhado.
- **`.casa`** — corte de uma casa com as duas redes por dentro. É a convergência
  da tese: uma entrada, dois sistemas.
- **`.svc`** — serviços como linhas de um manifold, não cartões. Grelha de
  `2.5rem 1fr`, separador de 1px, glifo que se acende no hover.
- **`.urg__list`** — banda âmbar, texto escuro. A luz a voltar.
- **`.rede`** — a zona de serviço como diagrama de rede de transporte: Cervães
  como subestação, linhas para os sete concelhos. Esconde-se abaixo de `32rem`,
  onde as etiquetas deixariam de ser legíveis; a lista de chips por baixo carrega
  a mesma informação e os mesmos termos de pesquisa.
- **`.penstock`** — três passos com um fio de água que corre no topo.
- **`.gauge`** — régua de nível fixa à direita (≥`64rem`). É navegação real com
  `aria-current`, não ornamento: o carrier é funcional.
- **`.chamar`** — barra de chamada fixa em baixo (<`64rem`), entra quando os
  botões do hero saem de vista.

### Ícones

Todos desenhados à mão em SVG, na gramática do mundo: símbolos de esquema
unifilar para a eletricidade (disjuntor como diagonal que abre a linha, lâmpada
como círculo com cruz, terra como escada de traços) e desenho de tubagem para a
água (válvula de cunha como duas triangulares opostas, nós como pontos cheios).
Traço uniforme, `stroke-linecap: round`. Nenhum emoji, nenhum glifo Unicode a
fazer de ícone.

### Marca

Uma gota de água com um relâmpago dentro. Gota em `--agua-clara`, relâmpago em
`--corrente`, com um contorno em `--agua-abisso` a separá-los. Os dois ofícios
numa forma.

## Movimento

Um momento, orquestrado: **a descida**.

- A água do descarregador desce em duas folhas desfasadas, a superfície da
  albufeira oscila, e três pontos na linha de transporte acendem em desfase.
  Tudo `transform` e `opacity`, em camadas próprias. **Para completamente quando
  o hero sai do viewport.**
- O medidor de nível e a barra do cabeçalho enchem com
  `animation-timeline: scroll()` — fora do main thread. Onde não existe, um
  `requestAnimationFrame` escreve `transform` em exatamente dois elementos.
- Entradas de secção: `opacity` + `translateY(22px)`, desfasadas com `--i`,
  `cubic-bezier(.16,1,.3,1)`. Uma gramática só. Um `IntersectionObserver`
  revela, **e um sweep em `scrollend` apanha o que o observer não vê**: um salto
  (clique na navegação, `#` no URL, posição restaurada) não cruza nada, e sem o
  sweep as secções saltadas ficavam invisíveis para sempre.
- Diagramas desenham-se com `pathLength="1"` no markup — o comprimento é
  declarado, nunca medido em runtime. É uma *keyframe animation*, não uma
  transição: transicionar `stroke-dashoffset` congelava no valor inicial e
  deixava as tubagens invisíveis com os nós à vista.

O hero **não tem animação de entrada**: o `h1` é o elemento LCP e é pintado a
opacidade total no primeiro frame.

Tudo desliga com `prefers-reduced-motion: reduce`.

## Regras que não se quebram

1. **Nada de rede além do documento e das duas fontes.** Sem CDN, sem
   bibliotecas, sem analytics, sem imagens raster. Gráficos são SVG inline.
2. **Nada acima da linha de água espera por JavaScript.** A classe `.js` é posta
   no `<head>`, e só quando existe `IntersectionObserver` e o visitante não pediu
   movimento reduzido — logo a página nunca fica escondida por um script que
   falhou.
3. **Animações só em `opacity` e `transform`.** Uma entrada não pode repintar
   nem provocar reflow.
4. **Espaço reservado antes de pintar.** SVG com `viewBox`; as mensagens de erro
   do formulário têm altura reservada **sempre**, com ou sem mensagem, para que
   um erro nunca empurre o botão que a pessoa está prestes a premir. Verificado:
   deslocamento 0 px.
5. **Um efeito que falha custa o efeito, não o conteúdo.** O estado de repouso
   de qualquer animação é o estado legível. As linhas dos diagramas estão
   desenhadas por omissão e a animação parte de escondido; a classe `.js` só é
   posta se o `IntersectionObserver` existir. Nada fica invisível porque um
   script ou uma animação não correu.
5. **Placeholders são visíveis.** Qualquer valor que a empresa não forneceu
   aparece com um badge âmbar `a confirmar`. Melhor um site que admite o que não
   sabe do que um que inventa um número de telefone.
6. **Sem testemunhos, avaliações ou estatísticas inventadas.** Não existem, logo
   não estão lá. A prova disponível é geográfica: nomes reais de concelhos e
   freguesias.
7. **Contactos funcionam sem JavaScript.** Links `tel:`, `wa.me` e `mailto:`
   reais; FAQ em `<details>`; formulário com `action` `mailto:` como alternativa.
