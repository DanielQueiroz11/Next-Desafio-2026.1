import HeroSection from "../../components/pagina-inicial/hero-section";
import Destaques from "../../components/pagina-inicial/destaques";
import SobreNos from "../../components/pagina-inicial/sobre-nos";
import { getIdentities } from "../lib/api/get-mvv";
import db from "../lib/db"; 

// buscar os produtos mais novos
export const revalidate = 0; 

export default async function Home() {
  try {
    // busca o MVV da API
    const data = await getIdentities();

    // busca os 6 produtos mais recentes no banco de dados
    const produtosRecentes = await db.product.findMany({
      take: 8,
      orderBy: {
        id: "asc", 
      },
    });

    return (
      <main className="flex min-h-screen flex-col bg-rock-dark text-white">
        <HeroSection />
        
        {/* passando os produtos do banco para o carrossel */}
        <Destaques produtos={produtosRecentes} />
        
        <SobreNos identities={data} />
      </main>
    );
  } catch (error) {
    console.error("Erro ao carregar dados da Home:", error);
    
    return (
      <main className="flex min-h-screen flex-col bg-rock-dark text-white">
        <HeroSection />
        <Destaques produtos={[]} />
        <SobreNos identities={[]} />
      </main>
    );
  }
}