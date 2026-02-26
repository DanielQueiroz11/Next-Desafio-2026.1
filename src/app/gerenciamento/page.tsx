import db from "@/src/lib/db";
import PaginaGerenciamento from "@/components/pagina-gerenciamento/pagina-gerenciamento";

export const revalidate = 0;

export default async function GerenciamentoPage() {
  const produtosDoBanco = await db.product.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return <PaginaGerenciamento produtos={produtosDoBanco} />;
}