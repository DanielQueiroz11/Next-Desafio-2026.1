import HeroSection from "../../components/pagina-inicial/hero-section";
import Carrossel from "../../components/pagina-inicial/carrossel";
import SobreNos from "../../components/pagina-inicial/sobre-nos";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-rock-dark text-white">
      <HeroSection />
      <Carrossel />
      <SobreNos />
    </main>
  );
}