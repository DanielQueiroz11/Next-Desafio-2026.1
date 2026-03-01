import db from "../../lib/db";
import PaginaProdutos from "@/components/pagina-produtos/pagina-produtos";

export const revalidate = 0; 

export default async function ProdutosPage(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  
  const paginaAtual = Number(searchParams.page) || 1;
  
  // define o limite de cards exibidos por página
  const ITENS_POR_PAGINA = 12; 

  // busca os produtos e o total de registros ao mesmo tempo 
  const [produtosDoBanco, totalDeProdutos] = await Promise.all([
    db.product.findMany({
      orderBy: [
        { ordem: "asc" }, // prioriza os itens que o admin colocou em destaque (ordem menor)
        { id: "desc" }    // critério de desempate: os mais recentes aparecem primeiro
      ],
      take: ITENS_POR_PAGINA, // limita a quantidade de itens extraídos do banco de dados
      skip: (paginaAtual - 1) * ITENS_POR_PAGINA, // pula os itens das páginas anteriores
    }),
    db.product.count(), // conta o total geral de produtos para conseguir calcular a paginação
  ]);

  // calcula o total de páginas necessárias arredondando para cima
  const totalPaginas = Math.ceil(totalDeProdutos / ITENS_POR_PAGINA);

  return (
    // passa as propriedades processadas no lado do servidor para o componente client-side renderizar a UI
    <PaginaProdutos 
      produtos={produtosDoBanco} 
      paginaAtual={paginaAtual}
      totalPaginas={totalPaginas}
    />
  );
}