import HeroSection from "../../components/pagina-inicial/hero-section";
import Destaques from "../../components/pagina-inicial/destaques";
import SobreNos from "../../components/pagina-inicial/sobre-nos";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-rock-dark text-white">
      <HeroSection />
      <Destaques />
      <SobreNos />
    </main>
  );
}