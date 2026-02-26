import db from "../../lib/db";
import PaginaProdutos from "@/components/pagina-produtos/pagina-produtos";

export const revalidate = 0; 

export default async function ProdutosPage() {
  const produtosDoBanco = await db.product.findMany({
    orderBy: { id: "asc" } 
  });

  return <PaginaProdutos produtos={produtosDoBanco} />;
}