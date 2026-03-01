"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarEmail(formData: FormData) {
  const nome = formData.get("nome") as string;
  const email = formData.get("email") as string;
  const assunto = formData.get("assunto") as string;
  const mensagem = formData.get("mensagem") as string;

  try {
    // chamada assíncrona que constrói e dispara o e-mail
    await resend.emails.send({
      
      from: "Caverna do Rock <onboarding@resend.dev>",  // o endereço from precisa ser um domínio verificado 
      to: "daniel.queiroz@estudante.ufjf.br",     // destinatário que receberá a mensagem de contato da loja
      subject: `Novo Contato pelo site: ${assunto}`,
      // corpo do email estruturado em html para organizar a leitura
      html: `
        <h2>Nova mensagem de contato - Caverna do Rock</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>E-mail do cliente:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${assunto}</p>
        <br/>
        <p><strong>Mensagem:</strong></p>
        {/* transforma as quebras de linha (enter) do textarea em tags <br/> do html */}
        <p>${mensagem.replace(/\n/g, "<br/>")}</p>
      `,
    });

    // retorna um objeto de sucesso para o client-side liberar a mensagem de confirmação
    return { success: true };
  } catch (error) {
    // loga o erro no terminal do servidor para debug e retorna falha para o usuário
    console.error("Erro ao enviar e-mail:", error);
    return { success: false, error: "Falha ao enviar e-mail." };
  }
}