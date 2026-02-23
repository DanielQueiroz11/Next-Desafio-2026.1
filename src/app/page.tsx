import HeroSection from "../../components/pagina-inicial/hero-section";
import Destaques from "../../components/pagina-inicial/destaques";
import SobreNos from "../../components/pagina-inicial/sobre-nos";
import { getIdentities, ApiProps } from "../lib/api/get-mvv";

export default async function Home() {
  try {
    const data = await getIdentities();

    return (
      <main className="flex min-h-screen flex-col bg-rock-dark text-white">
        <HeroSection />
        <Destaques />
        <SobreNos />

        <section className="p-8 max-w-7xl mx-auto w-full mb-12">
          <div className="w-full h-[1px] bg-white/10 mb-8"></div>
          <h2 className="text-2xl font-black text-rock-red mb-6 uppercase tracking-wide text-center">
            Dados da API (MVV)
          </h2>
          
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.map((item: ApiProps) => (
              <li key={item.id} className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col items-center text-center">
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

      </main>
    );
  } catch (error) {
    console.error("Error fetching identities", error);
    
    return (
      <main className="flex min-h-screen flex-col bg-rock-dark text-white">
        <HeroSection />
        <Destaques />
        <SobreNos />
        <p className="text-center text-red-500 py-8 font-bold">
          Ocorreu um erro ao carregar os dados de Missão, Visão e Valores.
        </p>
      </main>
    );
  }
}