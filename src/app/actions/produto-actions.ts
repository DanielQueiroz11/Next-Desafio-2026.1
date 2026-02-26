"use server";

import db from "@/src/lib/db";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";

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
    
    const nomeArquivo = `${Date.now()}-${imagemFile.name.replace(/\s/g, '-')}`;
    const caminhoDestino = path.join(process.cwd(), "public/imagens", nomeArquivo);
    
    await writeFile(caminhoDestino, buffer);
    caminhoImagem = `/imagens/${nomeArquivo}`;
  }

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