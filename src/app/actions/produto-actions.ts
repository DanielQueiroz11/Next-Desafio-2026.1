"use server";

import db from "@/src/lib/db";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";

// ADICIONAR
export async function adicionarProduto(formData: FormData) {
  const nome = formData.get("nome") as string;
  const precoString = formData.get("preco") as string;
  const descricaoGeral = formData.get("descricaoGeral") as string;
  const descricaoIndividual = formData.get("descricaoIndividual") as string;
  const imagemFile = formData.get("imagem") as File | null;

  const precoLimpo = precoString.replace(/\./g, "").replace(",", ".");
  const precoFormatado = parseFloat(precoLimpo);

  let caminhoImagem = "/imagens/produto-padrao.jpg";

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

  // VISUALIZAR
  await db.product.create({
    data: {
      title: nome,
      price: precoFormatado,
      description: descricaoGeral,
      fullDescription: descricaoIndividual,
      image: caminhoImagem,
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
    const id = parseInt(formData.get("id") as string);
    const nome = formData.get("nome") as string;
    const precoString = formData.get("preco") as string;
    const descricaoGeral = formData.get("descricaoGeral") as string;
    const descricaoIndividual = formData.get("descricaoIndividual") as string;
    const imagemFile = formData.get("imagem") as File | null;

    const precoLimpo = precoString.replace(/\./g, "").replace(",", ".");
    const precoFormatado = parseFloat(precoLimpo);

    type DadosAtualizados = {
      title: string;
      price: number;
      description: string;
      fullDescription: string;
      image?: string; // imagem é opcional
    };

    const dadosAtualizados: DadosAtualizados = {
      title: nome,
      price: precoFormatado,
      description: descricaoGeral,
      fullDescription: descricaoIndividual,
    };

    // se o usuário mandou uma imagem nova, salva e adiciona na att
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

    await db.product.update({
      where: { id },
      data: dadosAtualizados,
    });

    // atualiza as telas
    revalidatePath("/gerenciamento");
    revalidatePath("/");
    revalidatePath("/produtos");

    return { success: true };
  } catch (error) {
    console.error("Erro ao editar produto:", error);
    return { success: false, error: "Erro ao editar o produto." };
  }
}
