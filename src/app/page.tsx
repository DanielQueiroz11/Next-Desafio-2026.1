// importação dos componentes visuais que compõem a página inicial
import HeroSection from "../../components/pagina-inicial/hero-section";
import Destaques from "../../components/pagina-inicial/destaques";
import SobreNos from "../../components/pagina-inicial/sobre-nos";
import { getIdentities } from "../lib/api/get-mvv";
import db from "../lib/db";

// desabilita o cache da página
export const revalidate = 0;

// componente de servidor assíncrono que renderiza a raiz do site (home)
export default async function Home()  {
  try {
    // busca os dados de missão, visão e valores (mvv) da API externa 
    const data = await getIdentities();

    // busca os 10 produtos no bd para alimentar o carrossel de destaques
    const produtosRecentes = await db.product.findMany({
      // limita o retorno a no máximo 10 itens para não sobrecarregar a interface
      take: 10,
      orderBy: [
        { ordem: "asc" },
        { id: "desc" },
      ],
    });

    return (
      <main className="flex min-h-screen flex-col bg-rock-dark text-white">
        <HeroSection />

        <Destaques produtos={produtosRecentes} />

        <SobreNos identities={data} />
      </main>
    );
  } catch (error) {
    // captura o erro e avisa no terminal do servidor para manutenção 
    console.error("Erro ao carregar dados da Home:", error);

    return (
      // renderiza a página normalmente, mas passa arrays vazios para evitar o travamento
      <main className="flex min-h-screen flex-col bg-rock-dark text-white">
        <HeroSection />
        <Destaques produtos={[]} />
        <SobreNos identities={[]} />
      </main>
    );
  }
}
