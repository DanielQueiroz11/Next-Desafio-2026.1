"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Camisa Linkin Park",
    description: "Tecido 100% algodão: macia, leve e confortável para o dia a dia.",
    price: "R$64,99",
    installment: "2x de R$32,50 sem juros",
    image: "/imagens/produto-1.jpg",
  },
  {
    id: 2,
    name: "Moletom Metallica",
    description: "Modelo unissex com toque macio e elegante, perfeito para dias frios.",
    price: "R$139,99",
    installment: "3x de R$46,67 sem juros",
    image: "/imagens/produto-2.jpg",
  },
  {
    id: 3,
    name: "Colar Guns N' Roses",
    description: "Colar temático do Guns N' Roses com pingente estilizado de caveira.",
    price: "R$29,99",
    installment: "2x de R$15,00 sem juros",
    image: "/imagens/produto-3.jpg",
  },
  {
    id: 4,
    name: "Camiseta Iron Maiden",
    description: "Estampa exclusiva The Trooper com alta durabilidade e cores vivas.",
    price: "R$69,90",
    installment: "2x de R$34,95 sem juros",
    image: "/imagens/produto-4.jpg",
  },
  {
    id: 5,
    name: "Caneca Rock N'Roll",
    description: "Caneca com estampa temática de rock, design moderno e altamente resistente.",
    price: "R$39,90",
    installment: "2x de R$19,95 sem juros",
    image: "/imagens/produto-5.jpg",
  },
  {
    id: 6,
    name: "Moletom Red Hot Chili Peppers",
    description: "Moletom com estampa da logo da banda, muito confortável e versátil.",
    price: "R$149,99",
    installment: "3x de R$50,00 sem juros",
    image: "/imagens/produto-6.jpg",
  },
];

export default function PaginaProdutos() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const query = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(query);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
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

  return (
    <section className="w-full min-h-screen bg-rock-dark py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* barra de pesquisa */}
        <div className="flex justify-start mb-12">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="w-full max-w-[380px] bg-[#121212] border border-white/5 rounded-lg overflow-hidden hover:border-rock-red/50 transition-all duration-300 shadow-lg hover:shadow-rock-red/10"
              >
                <Link href={`/produtos-individuais/${product.id}`}>
                  <div className="group relative w-full h-[320px] bg-white flex items-center justify-center overflow-hidden cursor-pointer">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* conteúdo do card */}
                <div className="p-6 flex flex-col h-auto">
                  <Link href={`/produtos-individuais/${product.id}`}>
                    <h3 className="text-white text-xl font-bold mb-2 cursor-pointer hover:text-rock-red transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
                    {product.description}
                  </p>

                  <div className="mt-auto">
                    <span className="block text-rock-red text-2xl font-extrabold mb-1">
                      {product.price}
                    </span>
                    
                    <span className="block text-gray-400 text-sm mb-6">
                      {product.installment
                        .split(/(R\$\d+,\d+)/)
                        .map((part, index) => (
                          <span
                            key={index}
                            className={
                              part.startsWith("R$")
                                ? "text-rock-red font-bold"
                                : ""
                            }
                          >
                            {part}
                          </span>
                        ))}
                    </span>

                    <Link href={`/produtos-individuais/${product.id}`} className="w-full block">
                      <button className="w-full bg-rock-red text-white font-bold py-3 rounded-full hover:bg-red-700 hover:scale-[1.03] active:scale-95 transition-all shadow-md cursor-pointer">
                        Ver mais
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* mensagem quando não acha*/
          <div className="text-center py-20 animate-pulse">
            <h3 className="text-white text-2xl font-bold">Nenhum produto encontrado 🤘</h3>
            <p className="text-gray-400 mt-2">Tente buscar por outro nome.</p>
          </div>
        )}
      </div>
    </section>
  );
}