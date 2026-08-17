# A preencher antes de ir para o ar

Tudo nesta lista está no site como **placeholder**. Os valores inventáveis
aparecem marcados visualmente com `a confirmar` em âmbar, de propósito — para
ninguém publicar um número falso a pensar que é o verdadeiro.

Nada aqui foi adivinhado: não há testemunhos, avaliações, número de trabalhos
feitos, anos de experiência nem certificações no site, porque essas coisas não
se inventam. Quando as tiveres, dizem-se.

---

## 1. Contactos — bloqueante

O número `+351 900 000 000` e o email `geral@tecnomicer.pt` estão em **17 sítios**.
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
| Telefone principal | `href="tel:"` × 7, texto visível × 2, JSON-LD `telephone` | falta |
| WhatsApp | `wa.me/...` × 5, `const WA` no script | falta |
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
| Badge "Horário a confirmar" | hero | remover depois de definido, e escrever o horário real |
| Urgências fora de horas | secção Urgências + FAQ | decidir se existe. Se não existir, **apagar as duas menções** em vez de deixar vago |

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

`og-image.svg` está feito. Falta a versão PNG, porque o WhatsApp e o Facebook
não leem SVG:

```bash
npx --yes sharp-cli -i og-image.svg -o og-image.png resize 1200 630
```

Sem esse ficheiro, partilhar o link não mostra imagem. O `index.html` já aponta
para `/og-image.png`.

> Nota: o `og-image.svg` usa uma pilha de fontes de sistema em vez da Archivo,
> para poder ser convertido em qualquer máquina. Se quiseres a tipografia exata,
> abre o SVG no browser e faz captura a 1200×630.

## 9. Fotografias reais — o maior salto de qualidade que falta

O site não tem fotografias porque não existem. As ilustrações são desenhos
(SVG), não fotos disfarçadas de trabalho vosso — isso era desonesto.

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

## Depois de preencher

1. `node tools/build-preview.mjs` — refaz a pré-visualização partilhável.
2. Testa o JSON-LD em <https://search.google.com/test/rich-results>.
3. Google Business Profile: o mesmo nome, telefone e morada **exatamente iguais**
   aos do site. É o que mais pesa em pesquisas locais.
4. Search Console: submeter `https://tecnomicer.pt/sitemap.xml`.
5. Atualizar `<lastmod>` no `sitemap.xml`.
