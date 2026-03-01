import db from "@/src/lib/db";
import PaginaVisualizacao from "@/components/pagina-visualizacao/pagina-visualizacao";

export default async function ProdutoPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params; 

  // busca o produto específico no bd
  const produtoDoBanco = await db.product.findUnique({
    where: {
      id: Number(params.id), 
    },
  });

  // tratamento de erro (caso o usuário acesse um id inexistente ou deletado)
  if (!produtoDoBanco) {
    return (
      <div className="flex h-screen items-center justify-center bg-rock-dark text-white text-2xl font-bold">
        Produto não encontrado na Caverna do Rock 🤘
      </div>
    );
  }

  // renderiza o componente client-side 
  return <PaginaVisualizacao produto={produtoDoBanco} />;
}