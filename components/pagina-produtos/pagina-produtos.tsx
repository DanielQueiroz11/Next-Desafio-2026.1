"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Produto = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string | null;
};

export default function PaginaProdutos({ produtos }: { produtos: Produto[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const query = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(query);

  const filteredProducts = produtos.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const params = new URLSearchParams(searchParams.toString());
    
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    
    router.replace(`/produtos?${params.toString()}`);
  };

  const formatarPreco = (valor: number) => {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const formatarParcela = (valor: number) => {
  // a cada 20 reais, pode parcelar em mais 1 vez
  let parcelas = Math.ceil(valor / 20);

  // garante que o mínimo seja 1x e o máximo trave em 6x
  parcelas = Math.max(1, Math.min(6, parcelas));

  if (parcelas === 1) {
    return `À vista por ${formatadorMoeda.format(valor)}`;
  }

  const valorParcela = valor / parcelas;
  return `${parcelas}x de ${formatadorMoeda.format(valorParcela)} sem juros`;
};

  return (
    <section className="w-full min-h-screen bg-rock-dark pt-12 pb-7 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* barra de pesquisa */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Pesquisar produto..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-white text-rock-red placeholder:text-rock-red rounded-full text-lg py-3 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-rock-red shadow-lg transition-all font-medium"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-rock-red cursor-pointer hover:scale-[1.05] transition-transform duration-300 will-change-transform">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
               </svg>
            </div>
          </div>
        </div>

        {/* grid de produtos */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-full max-w-[380px] bg-[#121212] border border-white/5 rounded-lg overflow-hidden hover:border-rock-red/50 transition-all duration-300 shadow-lg hover:shadow-rock-red/10 flex flex-col h-full"
                >
                  <Link href={`/produtos-individuais/${product.id}`}>
                    <div className="group relative w-full h-[280px] sm:h-[320px] bg-white flex items-center justify-center overflow-hidden cursor-pointer">
                      <Image
                        src={product.image || "/imagens/produto-1.jpg"}
                        alt={product.title}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  <div className="p-5 md:p-6 flex flex-col flex-grow">
                    <div>
                      <Link href={`/produtos-individuais/${product.id}`}>
                        <h3 className="text-white text-[18px] md:text-xl font-bold mb-2 cursor-pointer hover:text-rock-red transition-colors line-clamp-2">
                          {product.title}
                        </h3>
                      </Link>

                      <p className="text-gray-400 text-[13px] md:text-sm mb-4 line-clamp-2 min-h-[40px]">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-auto pt-2">
                      <span className="block text-rock-red text-[22px] md:text-2xl font-extrabold mb-0.5">
                        {formatarPreco(product.price)}
                      </span>
                      
                      <span className="block text-gray-400 text-[13px] md:text-sm mb-5">
                        {formatarParcela(product.price)
                          .split(/(R\$\s?[\d.,]+)/)
                          .map((part, index) => (
                            <span
                              key={index}
                              className={part.includes("R$") ? "text-rock-red font-bold" : ""}
                            >
                              {part}
                            </span>
                          ))}
                      </span>

                      <Link href={`/produtos-individuais/${product.id}`} className="w-full block">
                        <button className="w-full bg-rock-red text-white font-bold text-[15px] md:text-[16px] py-3 rounded-full hover:bg-red-700 hover:scale-[1.03] active:scale-95 transition-all shadow-md cursor-pointer">
                          Ver mais
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* paginação */}
            <div className="flex justify-center items-center gap-2 md:gap-5 mt-8 md:mt-12 mb-8 text-rock-red font-medium text-[15px] md:text-[18px]">
              <button className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[14px] md:text-base">
                <span>&larr;</span>
                <span className="md:hidden">Ant.</span>
                <span className="hidden md:inline">Anterior</span>
              </button>
              <div className="flex items-center gap-2 md:gap-3 text-gray-300">
                <button className="bg-rock-red text-white w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl font-bold cursor-default">
                  1
                </button>
                <button className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl hover:bg-zinc-700 transition-colors cursor-pointer">
                  2
                </button>
                <button className="hidden sm:flex md:w-11 md:h-11 items-center justify-center rounded-xl hover:bg-zinc-700 transition-colors cursor-pointer">
                  3
                </button>
                <span className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center text-gray-400">
                  ...
                </span>
              </div>
              <button className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[14px] md:text-base">
                <span className="md:hidden">Próx.</span>
                <span className="hidden md:inline">Próximo</span>
                <span>&rarr;</span>
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-20 animate-pulse">
            <h3 className="text-white text-2xl font-bold">Nenhum produto encontrado 🤘</h3>
            <p className="text-gray-400 mt-2">Tente buscar por outro nome.</p>
          </div>
        )}
      </div>
    </section>
  );
}