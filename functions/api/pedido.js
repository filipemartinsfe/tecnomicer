/**
 * POST /api/pedido — recebe o formulário de orçamento e envia-o por email.
 *
 * Cloudflare Pages Function. Corre no mesmo domínio do site, por isso o
 * browser nunca fala com terceiros: o pedido vai para tecnomicer.pt e é
 * daqui que se contacta o Turnstile e o serviço de email.
 *
 * Variáveis de ambiente (Pages → Settings → Environment variables):
 *   TURNSTILE_SECRET  chave secreta do widget Turnstile
 *   RESEND_API_KEY    chave da API do Resend
 *   EMAIL_PARA        destino dos pedidos, ex. geral@tecnomicer.pt
 *   EMAIL_DE          remetente verificado, ex. site@tecnomicer.pt
 *
 * Marcar as três primeiras como "Encrypt" no painel.
 */

const LIMITES = {
  nome: 80,
  telefone: 30,
  localidade: 80,
  tipo: 60,
  descricao: 2000
};

const json = (dados, estado) =>
  new Response(JSON.stringify(dados), {
    status: estado,
    headers: { "content-type": "application/json; charset=utf-8" }
  });

const limpar = (v, max) =>
  typeof v === "string" ? v.trim().replace(/\s+/g, " ").slice(0, max) : "";

/** O Turnstile é verificado no servidor. Sem isto o widget é decoração. */
async function turnstileValido(token, ip, segredo) {
  if (!token) return false;
  const corpo = new FormData();
  corpo.append("secret", segredo);
  corpo.append("response", token);
  if (ip) corpo.append("remoteip", ip);

  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: corpo
  });
  if (!r.ok) return false;
  const dados = await r.json();
  return dados.success === true;
}

export async function onRequestPost({ request, env }) {
  let dados;
  try {
    dados = await request.json();
  } catch {
    return json({ erro: "Pedido mal formado." }, 400);
  }

  // Campo-armadilha: invisível para pessoas, irresistível para robôs. Responde
  // 200 de propósito — um bot que recebe erro tenta outra vez.
  if (limpar(dados.empresa, 100)) return json({ ok: true }, 200);

  const nome = limpar(dados.nome, LIMITES.nome);
  const telefone = limpar(dados.telefone, LIMITES.telefone);
  const localidade = limpar(dados.localidade, LIMITES.localidade);
  const tipo = limpar(dados.tipo, LIMITES.tipo) || "Não indicado";
  const descricao = limpar(dados.descricao, LIMITES.descricao);

  const faltas = [];
  if (nome.length < 2) faltas.push("nome");
  if (telefone.replace(/\D/g, "").length < 9) faltas.push("telefone");
  if (localidade.length < 2) faltas.push("localidade");
  if (descricao.length < 10) faltas.push("descricao");
  if (faltas.length) return json({ erro: "Faltam campos.", campos: faltas }, 422);

  const ok = await turnstileValido(
    dados.turnstile,
    request.headers.get("CF-Connecting-IP"),
    env.TURNSTILE_SECRET
  );
  if (!ok) {
    return json({ erro: "Não conseguimos confirmar que não é um robô. Recarregue a página e tente de novo." }, 403);
  }

  const pais = request.headers.get("CF-IPCountry") || "?";
  const texto = [
    `Nome: ${nome}`,
    `Telefone: ${telefone}`,
    `Localidade: ${localidade}`,
    `Tipo de trabalho: ${tipo}`,
    "",
    "O que se passa:",
    descricao,
    "",
    "—",
    `Enviado pelo formulário de tecnomicer.pt em ${new Date().toISOString()} (${pais})`
  ].join("\n");

  const envio = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from: `Site Tecnomicer <${env.EMAIL_DE}>`,
      to: [env.EMAIL_PARA],
      // responder ao email vai direto para o cliente
      reply_to: dados.email && /.+@.+\..+/.test(dados.email) ? dados.email : undefined,
      subject: `Pedido de orçamento — ${nome} (${localidade})`,
      text: texto
    })
  });

  if (!envio.ok) {
    // O detalhe fica no log da função, nunca na resposta ao visitante.
    console.error("Falha no envio:", envio.status, await envio.text());
    return json({ erro: "Não foi possível enviar agora." }, 502);
  }

  return json({ ok: true }, 200);
}

/** Só POST. Um GET a este caminho não deve devolver uma página. */
export const onRequest = async (ctx) =>
  ctx.request.method === "POST"
    ? onRequestPost(ctx)
    : new Response("Método não permitido", { status: 405, headers: { allow: "POST" } });
