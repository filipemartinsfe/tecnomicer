# A preencher antes de ir para o ar

Tudo nesta lista está no site como **placeholder**. Os valores inventáveis
aparecem marcados visualmente com `a confirmar` em âmbar, de propósito — para
ninguém publicar um número falso a pensar que é o verdadeiro.

Nada aqui foi adivinhado: não há testemunhos, avaliações, número de trabalhos
feitos, anos de experiência nem certificações no site, porque essas coisas não
se inventam. Quando as tiveres, dizem-se.

---

## 1. Contactos — bloqueante

O número `+351 900 000 000` e o email `geral@tecnomicer.pt` estão em **dezenas de sítios**.
Substituição em bloco (do diretório do repo):

```bash
# telefone (formato E.164, sem espaços, nos href="tel:" e no JSON-LD)
grep -rl '351900000000' . --include='*.html' | xargs sed -i 's/351900000000/351XXXXXXXXX/g'

# telefone (formato legível, no texto visível)
grep -rl '900 000 000' . --include='*.html' | xargs sed -i 's/900 000 000/XXX XXX XXX/g'

# email
grep -rl 'geral@tecnomicer.pt' . --include='*.html' | xargs sed -i 's/geral@tecnomicer\.pt/NOVO@dominio.pt/g'
```

Se o número de WhatsApp for **diferente** do telefone, tem de ser mudado à mão:
procura `wa.me/` e o `const WA = "351900000000"` no script no fim do `index.html`.

| Campo | Onde | Estado |
|---|---|---|
| Telefone principal | `href="tel:"` × 13, texto visível × 5, JSON-LD `telephone` | falta |
| WhatsApp | `wa.me/...` × 9 (cinco com mensagem já escrita), `const WA` no script | falta |
| Email | `mailto:` × 3, JSON-LD `email` | falta |

## 2. Morada e localização

| Campo | Onde | Estado |
|---|---|---|
| Rua e número | rodapé, JSON-LD `address.streetAddress` | só diz "Cervães" |
| Código postal | rodapé (`4730`), JSON-LD `postalCode` | `4730` é o código genérico de Vila Verde — confirmar o exato |
| Coordenadas GPS | JSON-LD `geo` (`41.6017, -8.4756`) | **aproximadas de Cervães** — substituir pelas reais |
| Publicar morada? | — | decidir. Se for só oficina/casa, pode omitir-se a rua e ficar a freguesia |

As coordenadas contam para pesquisas "perto de mim". Tira-as do Google Maps
(clique direito no ponto → copiar as coordenadas).

## 3. Horário

| Campo | Onde | Estado |
|---|---|---|
| Horário semanal | JSON-LD `openingHoursSpecification` (2ª–6ª 09:00–19:00, sáb 09:00–13:00) | **inventado como exemplo** — corrigir |
| Etiqueta "Horário a confirmar" | rodapé (`.pe__base`) | substituir pelo horário real; vale a pena pô-lo também no topo (`.hero__pe`) |
| Urgências fora de horas | topo (`.hero__pe`) + FAQ | decidir se existe. Se não existir, **apagar as duas menções** em vez de deixar vago |

## 4. Preços e condições

| Campo | Onde | Estado |
|---|---|---|
| Visita/orçamento é pago? | passo 02 + FAQ | falta |
| `priceRange` | JSON-LD (`"€€"`) | confirmar ou remover |
| Taxa de deslocação | não mencionada | decidir se se menciona |

## 5. Dados legais

| Campo | Onde | Estado |
|---|---|---|
| NIF | rodapé + FAQ | falta |
| Alvará / seguro de responsabilidade civil | rodapé | falta. Se houver certificações (ex.: gás, ITED), valem muito — dizer quais |
| Política de privacidade | nota no formulário | falta redigir. Obrigatória se o formulário recolher dados |
| Nome legal completo (Lda./ENI) | JSON-LD `legalName` | está só "Tecnomicer" |

## 6. Lista de serviços

Os 12 serviços são os trabalhos correntes de pichelaria e eletricidade
domésticas — inferidos do briefing, não confirmados. **Lê a lista e corta o que
não fazem**, porque prometer o que não se faz custa mais que não listar.

Estão em dois sítios que têm de bater: a lista visível (`.svcs`) e o
`hasOfferCatalog` do JSON-LD.

## 7. Freguesias

A lista de freguesias de Vila Verde está marcada `confirmar lista` porque foi
escrita de memória. Verifica contra a lista oficial do município e estende-a —
cada nome real é uma pesquisa local a mais que te pode encontrar. Os
**concelhos** (Vila Verde, Braga, Amares, Barcelos, Ponte de Lima, Ponte da
Barca, Terras de Bouro) estão certos: são os que fazem fronteira com Vila Verde.

## 8. Imagem de partilha (WhatsApp, Facebook)

`og-image.png` está gerada a partir de `og-image.svg`, com o logótipo real. Se
mudares o texto do SVG, volta a convertê-la:

```bash
npx --yes sharp-cli -i og-image.svg -o og-image.png resize 1200 630
```

## 9. Fotografias reais — o maior salto de qualidade que falta

O site não tem fotografias porque não existem, e não tem caixas vazias à
espera delas. O sítio reservado é a secção **Quem somos** (`#porque`): há um
comentário no HTML a marcar onde entram. O painel de Serviços e o topo
não dependem delas.

Quando tiverem, o que vale mais:
1. **Antes/depois** de dois ou três trabalhos (uma casa de banho, um quadro elétrico).
2. Uma fotografia da equipa ou da furgoneta — cara e nome constroem confiança local.
3. Detalhe de trabalho bem-feito: tubagem alinhada, quadro etiquetado.

Vertical ou quadrado, luz natural, sem filtros. Fotos reais de trabalho medíocre
são melhores que stock perfeito.

---

## 10. Chaves e configuração

Estas não são texto do site, mas sem elas o formulário não envia nada. Passo a
passo em [DEPLOY.md](DEPLOY.md).

| Onde | O que falta |
|---|---|
| `index.html` → `CHAVE_TURNSTILE` | site key do Turnstile (pública) |
| Cloudflare Pages → variáveis | `TURNSTILE_SECRET`, `RESEND_API_KEY`, `EMAIL_PARA`, `EMAIL_DE` |
| `privacidade.html` | nome legal, NIF, morada e data de publicação |

Enquanto o Turnstile e o Resend não estiverem configurados, o formulário
valida, tenta enviar, falha e oferece WhatsApp e email já preenchidos. Ninguém
fica sem caminho, mas nada chega à caixa de correio sozinho.

## 11. Textos de segurança e frases a validar

O topo do site diz às pessoas o que fazer num momento de aflição. Estes textos foram
escritos por quem fez o site, a partir do conhecimento comum, e **têm de ser lidos
pela empresa**, em `#emergencia`:

| Problema | O que diz |
|---|---|
| Fuga | Fechar a torneira de segurança, normalmente junto ao contador. Se a água chegou a tomadas ou ao quadro, desligar o disjuntor geral |
| Sem luz | Desligar o disjuntor geral. Com cheiro a queimado ou tomada quente, não voltar a ligar |
| Entupimento | Deixar de usar esse ponto de água e as descargas |
| Sem água quente | Com cheiro a gás: fechar a válvula, abrir janelas, não mexer em interruptores, ligar 112 |

Também a confirmar: se trabalham com gás (o texto fala em esquentadores) e se
as frases "Chegamos depressa" e "Respondemos assim que possível" são verdade.

Fontes novas (Bricolage Grotesque, Figtree) são de licença aberta (OFL). Nada a pagar.

## Depois de preencher

1. `node tools/build-preview.mjs` — refaz a pré-visualização partilhável.
2. Testa o JSON-LD em <https://search.google.com/test/rich-results>.
3. Google Business Profile: o mesmo nome, telefone e morada **exatamente iguais**
   aos do site. É o que mais pesa em pesquisas locais.
4. Search Console: submeter `https://tecnomicer.pt/sitemap.xml`.
5. Atualizar `<lastmod>` no `sitemap.xml`.
