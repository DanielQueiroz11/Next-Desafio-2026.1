"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarEmail(formData: FormData) {
  const nome = formData.get("nome") as string;
  const email = formData.get("email") as string;
  const assunto = formData.get("assunto") as string;
  const mensagem = formData.get("mensagem") as string;

  try {
    await resend.emails.send({
      from: "Caverna do Rock <onboarding@resend.dev>",
      to: "daniel.queiroz@estudante.ufjf.br", 
      subject: `Novo Contato pelo site: ${assunto}`,
      html: `
        <h2>Nova mensagem de contato - Caverna do Rock</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>E-mail do cliente:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${assunto}</p>
        <br/>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return { success: false, error: "Falha ao enviar e-mail." };
  }
}