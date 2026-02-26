import db from "../../lib/db";
import PaginaProdutos from "@/components/pagina-produtos/pagina-produtos";

export const revalidate = 0; 

export default async function ProdutosPage(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const paginaAtual = Number(searchParams.page) || 1;
  const ITENS_POR_PAGINA = 12; 

  // busca os produtos e o total ao mesmo tempo
  const [produtosDoBanco, totalDeProdutos] = await Promise.all([
    db.product.findMany({
      orderBy: { id: "desc" },
      take: ITENS_POR_PAGINA,
      skip: (paginaAtual - 1) * ITENS_POR_PAGINA,
    }),
    db.product.count(),
  ]);

  const totalPaginas = Math.ceil(totalDeProdutos / ITENS_POR_PAGINA);

  return (
    <PaginaProdutos 
      produtos={produtosDoBanco} 
      paginaAtual={paginaAtual}
      totalPaginas={totalPaginas}
    />
  );
}