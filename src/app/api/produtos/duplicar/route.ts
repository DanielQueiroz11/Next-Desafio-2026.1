import { NextResponse } from "next/server";
import db from "@/src/lib/db"; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { produtoId, quantidade } = body;

    if (!produtoId || !quantidade || quantidade < 1) {
      return NextResponse.json(
        { error: "Dados inválidos para duplicação." },
        { status: 400 }
      );
    }

    const produtoOriginal = await db.product.findUnique({
      where: { id: produtoId },
    });

    if (!produtoOriginal) {
      return NextResponse.json(
        { error: "Produto original não encontrado." },
        { status: 404 }
      );
    }

    const novasCopias = [];
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

    return NextResponse.json(
      { message: `${quantidade} produtos duplicados com sucesso!` },
      { status: 201 }
    );

  } catch (error) {
    console.error("Erro interno ao duplicar produtos:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor ao tentar duplicar." },
      { status: 500 }
    );
  }
}