import HeroSection from "../../components/pagina-inicial/hero-section";
import Destaques from "../../components/pagina-inicial/destaques";
import SobreNos from "../../components/pagina-inicial/sobre-nos";
import { getIdentities } from "../lib/api/get-mvv";

export default async function Home() {
  try {
    const data = await getIdentities();

    return (
      <main className="flex min-h-screen flex-col bg-rock-dark text-white">
        <HeroSection />
        <Destaques />
        
        <SobreNos identities={data} />
      </main>
    );
  } catch (error) {
    console.error("Error fetching identities", error);
    
    return (
      <main className="flex min-h-screen flex-col bg-rock-dark text-white">
        <HeroSection />
        <Destaques />
        <SobreNos identities={[]} />
      </main>
    );
  }
}