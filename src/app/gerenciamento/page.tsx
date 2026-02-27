import db from "@/src/lib/db";
import PaginaGerenciamento from "@/components/pagina-gerenciamento/pagina-gerenciamento";

export const revalidate = 0;

export default async function GerenciamentoPage(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const paginaAtual = Number(searchParams.page) || 1;
  const searchTerm = searchParams.search || "";
  const ITENS_POR_PAGINA = 6;

  const whereCondition = searchTerm
    ? { title: { contains: searchTerm, mode: "insensitive" as const } }
    : {};

  // 3 buscas ao mesmo tempo: os produtos, o total filtrado e o total absoluto
  const [produtosDoBanco, totalFiltrado, estoqueTotal] = await Promise.all([
    db.product.findMany({
      where: whereCondition,
      orderBy: { id: "asc" },
      take: ITENS_POR_PAGINA,
      skip: (paginaAtual - 1) * ITENS_POR_PAGINA,
    }),
    db.product.count({ where: whereCondition }),
    db.product.count(), 
  ]);

  const totalPaginas = Math.ceil(totalFiltrado / ITENS_POR_PAGINA);

  return (
    <PaginaGerenciamento 
      produtos={produtosDoBanco} 
      paginaAtual={paginaAtual}
      totalPaginas={totalPaginas}
      searchTermProp={searchTerm}
      totalDeProdutos={totalFiltrado}
      estoqueTotal={estoqueTotal} 
    />
  );
}