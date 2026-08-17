# Pôr o site no ar

Passo a passo, por ordem. Nada aqui custa dinheiro exceto o domínio.

**Não publiques antes de preencher [PLACEHOLDERS.md](PLACEHOLDERS.md).** O
telefone, o email, a morada e o horário ainda são valores de exemplo.

---

## 1. Domínio

Regista `tecnomicer.pt` num registrar acreditado pelo DNS.PT. Ordem de
grandeza 15–20 €/ano, mas confirma no momento.

A seguir, no painel da Cloudflare: **Add a site** → `tecnomicer.pt` → plano
**Free**. A Cloudflare dá-te dois nameservers; mete-os no registrar. Propaga
em minutos a poucas horas.

A partir daqui o DNS, o alojamento, o email e o anti-robô vivem todos na mesma
conta.

## 2. Alojamento (Cloudflare Pages)

1. Empurra o repositório para o GitHub.
2. Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Escolhe o repositório. Configuração:
   - Framework preset: **None**
   - Build command: *(vazio)*
   - Build output directory: `/`
4. **Custom domains** → adiciona `tecnomicer.pt` e `www.tecnomicer.pt`.

Não há passo de build porque não há nada para compilar. O `_headers` e o
`_redirects` na raiz são lidos automaticamente: tratam do HTTPS canónico, da
cache das fontes, do URL `/privacidade/` e dos cabeçalhos de segurança.

Cada `git push` publica. Cada branch ganha um URL de pré-visualização.

## 3. Formulário — Turnstile

O widget que confirma que quem submete é uma pessoa.

1. Cloudflare → **Turnstile** → **Add widget**.
   - Domain: `tecnomicer.pt`
   - Mode: **Managed**
2. Copia as duas chaves.
3. **Site key** (pública) → cola no `index.html`, na constante:

   ```js
   const CHAVE_TURNSTILE = "0x4AAAAAAA_CHAVE_DO_SITE";
   ```

4. **Secret key** → guarda para o passo 4.

> O Turnstile é o único terceiro que a página carrega, e só quando alguém toca
> no formulário. Quem lê a página e liga nunca o descarrega.

## 4. Formulário — envio de email

1. Cria conta em [resend.com](https://resend.com) (3.000 emails/mês grátis).
2. **Domains** → adiciona `tecnomicer.pt` → mete os registos DKIM/SPF que ele
   dá na zona DNS da Cloudflare → **Verify**.
3. **API Keys** → cria uma com permissão de envio.
4. Cloudflare Pages → o teu projeto → **Settings** → **Environment variables**
   → **Production**:

   | Nome | Valor | Encriptar |
   |---|---|---|
   | `TURNSTILE_SECRET` | secret key do passo 3 | ✅ |
   | `RESEND_API_KEY` | chave do Resend | ✅ |
   | `EMAIL_PARA` | `geral@tecnomicer.pt` | — |
   | `EMAIL_DE` | `site@tecnomicer.pt` | — |

5. Faz um novo deploy para as variáveis entrarem em vigor.

`EMAIL_DE` tem de estar no domínio verificado no Resend. `EMAIL_PARA` é onde
os pedidos aterram, e pode ser qualquer caixa.

## 5. Email da empresa

**Grátis, para começar:** Cloudflare → **Email** → **Email Routing** → verifica
o domínio (mete os MX que ele indica) → cria `geral@tecnomicer.pt` a
reencaminhar para uma caixa que já uses. Para *responder* com o endereço da
empresa, no Gmail: Definições → Contas → *Enviar email como* → adiciona o
endereço com o SMTP que a Cloudflare documenta.

**Quando quiserem caixas verdadeiras** (calendário, contactos partilhados,
vários utilizadores): Google Workspace, ~6 €/utilizador/mês. Substitui os
registos MX; o resto do site não muda.

## 6. Depois de publicar

- [ ] **Google Business Profile** com nome, telefone e morada **exatamente
      iguais** aos do site. É o que mais pesa em pesquisas locais.
- [ ] **Search Console**: adiciona a propriedade, submete
      `https://tecnomicer.pt/sitemap.xml`.
- [ ] **Rich Results Test** em <https://search.google.com/test/rich-results>
      para confirmar o `LocalBusiness` e o `FAQPage`.
- [ ] Converte `og-image.svg` para `og-image.png` (1200×630) — sem isso,
      partilhar o link no WhatsApp não mostra imagem:
      `npx --yes sharp-cli -i og-image.svg -o og-image.png resize 1200 630`
- [ ] Envia um pedido de teste pelo formulário e confirma que chega.
- [ ] Atualiza `<lastmod>` no `sitemap.xml`.

## 7. Subdomínios, mais tarde

O domínio fica livre para o que vier. São registos DNS independentes e não
tocam no site:

| Subdomínio | Para quê |
|---|---|
| `app.tecnomicer.pt` | aplicação interna — outro projeto Pages/Workers |
| `mail.tecnomicer.pt` | webmail, se alguma vez quiserem um |

Se a app precisar de guardar dados (clientes, obras, orçamentos, fotos), a
opção que fica na mesma conta e no mesmo escalão gratuito é **D1** (base de
dados SQLite) mais **R2** (ficheiros). Nada disso obriga a mexer neste site.
