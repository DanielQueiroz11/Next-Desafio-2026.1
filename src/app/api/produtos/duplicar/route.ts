import { NextResponse } from "next/server";
import db from "@/src/lib/db"; 

export async function POST(request: Request) {

  try {
    // extrai o corpo da requisição 
    const body = await request.json();
    const { produtoId, quantidade } = body;

    // validação de segurança
    if (!produtoId || !quantidade || quantidade < 1) {
      return NextResponse.json(
        { error: "Dados inválidos para duplicação." },
        { status: 400 } 
      );
    }

    const produtoOriginal = await db.product.findUnique({
      where: { id: produtoId },
    });

    // caso o produto tenha sido deletado instantes antes, barra a duplicação
    if (!produtoOriginal) {
      return NextResponse.json(
        { error: "Produto original não encontrado." },
        { status: 404 } 
      );
    }

    // aarmazenar em memória os objetos das cópias antes de salvar
    const novasCopias = [];
    
    // gera as cópias exatas com base no número solicitado
    for (let i = 1; i <= quantidade; i++) {
      novasCopias.push({
        title: `${produtoOriginal.title} (Cópia ${i})`,
        price: produtoOriginal.price,
        description: produtoOriginal.description,
        fullDescription: produtoOriginal.fullDescription,
        image: produtoOriginal.image,
        ordem: produtoOriginal.ordem, 
      });
    }

    await db.product.createMany({
      data: novasCopias,
    });

    // retorna o status de sucesso para o client-side liberar a interface
    return NextResponse.json(
      { message: `${quantidade} produtos duplicados com sucesso!` },
      { status: 201 } // created
    );

  } catch (error) {
    // captura e loga no terminal do servidor qualquer erro interno que fuja do escopo previsto
    console.error("Erro interno ao duplicar produtos:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor ao tentar duplicar." },
      { status: 500 }
    );
  }
}