# Memória do projeto (Tecnomicer)

O que se aprendeu a trabalhar neste projeto e não está nas regras (`README.md`, `DEPLOY.md`, `PLACEHOLDERS.md`,
`DESIGN.md`, `PRODUCT.md`). Lê-se **antes** de começar um ticket e atualiza-se **no fim** de cada um: estado,
decisões e porquê, preferências, pendentes, armadilhas. Curto e útil; o que deixar de ser verdade sai. Tickets em
https://tickets.levelit.pt/?p=tecnomicer.

## Estado (14/11/2026)

- Site de uma página (HTML, CSS e JS estáticos, sem build) da Tecnomicer, pichelaria e eletricidade em Cervães (Vila
  Verde). Publicado em https://tecnomicer.levelit.pt pelo deploy do GitHub (`.github/workflows/deploy.yml`: verifica
  JS e JSON, junta com `tools/pacote.sh` e publica) a cada push para `main`.
- Último trabalho: novo layout (frase em rotação no topo, serviços, processo e zona), 12/11/2026.
- **Ainda não está no domínio do cliente** (`tecnomicer.pt`): os passos estão em `DEPLOY.md` (domínio e Cloudflare,
  com o titular do domínio a ser a empresa).
- **Telefone, email, morada, horário e NIF são valores de exemplo**, marcados no site com a etiqueta laranja "a
  confirmar" (lista em `PLACEHOLDERS.md`). Não se publica no domínio real sem estarem preenchidos.

## Decisões e porquê

- Site estático sem dependências: aloja em qualquer sítio e não quebra com atualizações (ver `README.md`).
- Nada inventado: sem testemunhos, avaliações, números de trabalhos, anos de experiência nem certificações enquanto
  o cliente não os der.
- Formulário com endpoint próprio (`functions/`) e Turnstile; email pela Cloudflare Email Routing, envio isolado num
  subdomínio `send.`.

## Testes e armadilhas

- **Não há testes automáticos neste repositório** (o deploy só verifica a sintaxe de JS e JSON). Depois de mudar,
  abrir `index.html` e `privacidade.html` no browser, a página inteira, a 360/390, 768, 1024, 1280 e 1920px.
- As etiquetas "a confirmar" são de propósito: não se tiram sem o valor verdadeiro.
