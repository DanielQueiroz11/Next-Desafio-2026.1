import db from "@/src/lib/db";
import PaginaGerenciamento from "@/components/pagina-gerenciamento/pagina-gerenciamento";

export const revalidate = 0;

export default async function GerenciamentoPage(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // achar qual página está (baseado na URL)
  const searchParams = await props.searchParams;
  const paginaAtual = Number(searchParams.page) || 1;
  const ITENS_POR_PAGINA = 6; 

  const [produtosDoBanco, totalDeProdutos] = await Promise.all([
    db.product.findMany({
      orderBy: { id: "asc" },
      take: ITENS_POR_PAGINA, // 8
      skip: (paginaAtual - 1) * ITENS_POR_PAGINA, // pula os das páginas anteriores
    }),
    db.product.count(), // conta quantos existem no total
  ]);

  // calcula quantas páginas vamos ter no total (ex: 10 produtos / 8 = 2 páginas)
  const totalPaginas = Math.ceil(totalDeProdutos / ITENS_POR_PAGINA);

  return (
    <PaginaGerenciamento 
      produtos={produtosDoBanco} 
      paginaAtual={paginaAtual}
      totalPaginas={totalPaginas}
    />
  );
}