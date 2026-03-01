"use server";

import db from "@/src/lib/db";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";

// ADICIONAR
export async function adicionarProduto(formData: FormData) {
  // extração tipada dos dados enviados pelo formulário do front-end
  const nome = formData.get("nome") as string;
  const precoString = formData.get("preco") as string;
  const descricaoGeral = formData.get("descricaoGeral") as string;
  const descricaoIndividual = formData.get("descricaoIndividual") as string;
  const imagemFile = formData.get("imagem") as File | null;
  
  const ordem = parseInt(formData.get("ordem") as string) || 0;

  // tratamento da string de moeda para ser aceita pelo bd
  const precoLimpo = precoString.replace(/\./g, "").replace(",", ".");
  const precoFormatado = parseFloat(precoLimpo);

  // define uma imagem padrão caso o usuário não envie nenhuma
  let caminhoImagem = "/imagens/produto-padrao.jpg";

  // se houver arquivo de imagem válido, converte para buffer e salva fisicamente no servidor
  if (imagemFile && imagemFile.size > 0) {
    const bytes = await imagemFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const nomeArquivo = `${Date.now()}-${imagemFile.name.replace(/\s/g, "-")}`;
    const caminhoDestino = path.join(
      process.cwd(),
      "public/imagens",
      nomeArquivo,
    );

    await writeFile(caminhoDestino, buffer);
    caminhoImagem = `/imagens/${nomeArquivo}`;
  }

  // criação do registro do produto no banco de dados
  await db.product.create({
    data: {
      title: nome,
      price: precoFormatado,
      description: descricaoGeral,
      fullDescription: descricaoIndividual,
      image: caminhoImagem,
      ordem: ordem, // salva a ordem no banco de dados
    },
  });

  revalidatePath("/gerenciamento");
  revalidatePath("/");
  revalidatePath("/produtos");

  return { success: true };
}

// EXCLUIR
export async function excluirProduto(id: number) {
  try {
    await db.product.delete({
      where: { id },
    });

    // limpa o cache das rotas para que o produto suma imediatamente da tela
    revalidatePath("/gerenciamento");
    revalidatePath("/");
    revalidatePath("/produtos");

    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    return { success: false, error: "Erro ao excluir o produto." };
  }
}

// EDITAR
export async function editarProduto(formData: FormData) {
  try {
    // extração dos dados
    const id = parseInt(formData.get("id") as string);
    const nome = formData.get("nome") as string;
    const precoString = formData.get("preco") as string;
    const descricaoGeral = formData.get("descricaoGeral") as string;
    const descricaoIndividual = formData.get("descricaoIndividual") as string;
    const imagemFile = formData.get("imagem") as File | null;

    // pega o valor da "ordem" do formulário
    const ordem = parseInt(formData.get("ordem") as string) || 0;

    const precoLimpo = precoString.replace(/\./g, "").replace(",", ".");
    const precoFormatado = parseFloat(precoLimpo);

    type DadosAtualizados = {
      title: string;
      price: number;
      description: string;
      fullDescription: string;
      ordem: number; 
      image?: string;
    };

    const dadosAtualizados: DadosAtualizados = {
      title: nome,
      price: precoFormatado,
      description: descricaoGeral,
      fullDescription: descricaoIndividual,
      ordem: ordem, // coloca a ordem nos dados que serão atualizados
    };

    // se o usuário mandou uma imagem nova, salva o arquivo novo e adiciona o caminho na atualização
    if (imagemFile && imagemFile.size > 0) {
      const bytes = await imagemFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const nomeArquivo = `${Date.now()}-${imagemFile.name.replace(/\s/g, "-")}`;
      const caminhoDestino = path.join(
        process.cwd(),
        "public/imagens",
        nomeArquivo,
      );
      await writeFile(caminhoDestino, buffer);

      dadosAtualizados.image = `/imagens/${nomeArquivo}`;
    }

    // executa o update via prisma apenas nos campos alterados/enviados
    await db.product.update({
      where: { id },
      data: dadosAtualizados,
    });

    revalidatePath("/gerenciamento");
    revalidatePath("/");
    revalidatePath("/produtos");

    return { success: true };
  } catch (error) {
    console.error("Erro ao editar produto:", error);
    return { success: false, error: "Erro ao editar o produto." };
  }
}

// verificar ordem (checa se alguém já ocupa a posição e devolve nome e id)
export async function verificarOrdem(ordem: number, idIgnorado?: number) {
  if (!ordem || ordem === 0) return null;

  const produtoExistente = await db.product.findFirst({
    where: {
      ordem: ordem,
      ...(idIgnorado && { id: { not: idIgnorado } }),
    },
    // seleciona apenas o que é necessário para otimizar o banco
    select: { title: true, id: true }, 
  });

  return produtoExistente ? { title: produtoExistente.title, id: produtoExistente.id } : null;
}