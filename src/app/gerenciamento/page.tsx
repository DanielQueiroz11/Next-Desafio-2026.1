import db from "@/src/lib/db";
import PaginaGerenciamento from "@/components/pagina-gerenciamento/pagina-gerenciamento";

export const revalidate = 0;

export default async function GerenciamentoPage(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  
  // extrai a página atual da url ou define 1 como padrão
  const paginaAtual = Number(searchParams.page) || 1;
  const searchTerm = searchParams.search || "";
  const ITENS_POR_PAGINA = 6;

  // constrói a condição de busca 
  const whereCondition = searchTerm
    ? { title: { contains: searchTerm, mode: "insensitive" as const } }
    : {};

  // executa 3 buscas de forma simultânea no prisma para não travar o carregamento
  const [produtosDoBanco, totalFiltrado, estoqueTotal] = await Promise.all([
    
    // busca os produtos com paginação e ordenação dupla
    db.product.findMany({
      where: whereCondition,
      orderBy: [
        { ordem: "asc" }, // exibe primeiro os itens com prioridade definida no painel
        { id: "desc" }    // critério de desempate: os cadastrados mais recentemente aparecem antes :)
      ],
      take: ITENS_POR_PAGINA,
      skip: (paginaAtual - 1) * ITENS_POR_PAGINA,
    }),
    
    // conta o total de produtos que correspondem à barra de pesquisa para a paginação
    db.product.count({ where: whereCondition }),
    
    //  conta o total absoluto de produtos cadastrados na loja (usado no cabeçalho do painel)
    db.product.count(), 
  ]);

  // calcula o número total de páginas arredondando para cima
  const totalPaginas = Math.ceil(totalFiltrado / ITENS_POR_PAGINA);

  return (
    // passa os dados pelo servidor para o componente de cliente renderizar a interface
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