import db from "@/src/lib/db";
import PaginaVisualizacao from "@/components/pagina-visualizacao/pagina-visualizacao";

export default async function ProdutoPage({
  params,
}: {
  params: { id: string };
}) {
  const produtoDoBanco = await db.product.findUnique({
    where: {
      id: Number(params.id), 
    },
  });

  if (!produtoDoBanco) {
    return (
      <div className="flex h-screen items-center justify-center bg-rock-dark text-white text-2xl">
        Produto não encontrado na Caverna do Rock 🤘
      </div>
    );
  }

  return <PaginaVisualizacao produto={produtoDoBanco} />;
}