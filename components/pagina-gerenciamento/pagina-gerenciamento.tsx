"use client";

import Link from "next/link";
import Image from "next/image";

const mockProducts = [
  {
    id: 1,
    name: "Camisa Linkin Park",
    price: "R$64,99",
    description:
      "Tecido 100% algodão: macia, leve e confortável para o dia a dia.",
    image: "/imagens/produto-1.jpg",
  },
  {
    id: 2,
    name: "Moletom Metallica",
    price: "R$139,99",
    description:
      "Modelo unissex com toque macio e elegante, perfeito para dias frios.",
    image: "/imagens/produto-2.jpg",
  },
  {
    id: 3,
    name: "Colar Guns N' Roses",
    price: "R$29,99",
    description:
      "Colar temático Guns N' Roses com pingente de caveira estilizada.",
    image: "/imagens/produto-3.jpg",
  },
];

export default function PaginaGerenciamento() {
  return (
    <main className="flex min-h-screen bg-rock-dark">
      {/* sidebar */}
      <aside className="hidden md:flex flex-col w-[250px] bg-rock-dark min-h-screen shadow-2xl z-10">
        {/* logo */}
        <div className="pt-8 pb-6 flex justify-center px-4">
          <Link
            href="/"
            className="relative w-full max-w-[200px] h-[89px] hover:scale-105 will-change-transform transition-transform cursor-pointer block"
          >
            <Image
              src="/imagens/logo-footer.jpg"
              alt="Logo Caverna do Rock"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* título */}
        <div className="px-8 pb-3">
          <h2 className="text-white font-extrabold text-[18px]">Admin</h2>
        </div>

        {/* linha preta */}
        <div className="w-full h-[2px] bg-rock-red mb-8"></div>

        {/* links */}
        <nav className="flex flex-col px-8 gap-6">
          <Link
            href="/"
            className="text-white font-bold text-[16px] hover:text-rock-red transition-colors"
          >
            Home
          </Link>
          <Link
            href="/gerenciamento"
            className="text-white font-bold text-[16px] hover:text-rock-red transition-colors"
          >
            Gerenciar Produtos
          </Link>

          {/* Logout*/}
          <Link
            href="/"
            className="text-white font-bold text-[16px] hover:text-rock-red transition-colors"
          >
            Logout
          </Link>
        </nav>
      </aside>

      {/* parte da direita */}
      <section className="flex-1 flex flex-col min-w-0">
        {/* topbar */}
        <header className="relative w-full h-24 bg-[#2A2A2A] flex items-center justify-center px-8 shadow-md z-0">
          {/* título */}
          <h1 className="text-white text-2xl md:text-[28px] font-black tracking-wider uppercase">
            Gerenciamento de Produtos
          </h1>

          {/* botão adicionar */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2">
            <button className="bg-rock-red hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-md transition-colors shadow-lg cursor-pointer">
              Adicionar produto
            </button>
          </div>
        </header>

        {/* área do conteúdo  */}
        <div className="p-8 flex-1 flex flex-col max-w-6xl mx-auto w-full bg-[#1A1A1A]">
          {/* lista dos cards */}
          <div className="flex flex-col gap-8 flex-1">
            {mockProducts.map((product) => (
              <div
                key={product.id}
                className="w-full bg-[#F5F5F5] rounded-xl overflow-hidden shadow-xl"
              >
                {/* cabeçalho vermelho */}
                <div className="w-full bg-rock-red text-white flex items-center py-3 px-4 font-bold text-[15px]">
                  <div className="w-[15%] text-center">Imagem</div>
                  <div className="w-[20%] text-center">Nome</div>
                  <div className="w-[15%] text-center">Preço</div>
                  <div className="w-[35%] text-center pl-4">Descrição</div>
                  <div className="w-[15%] text-center">Ações</div>
                </div>

                {/* corpo (branco) do card */}
                <div className="w-full flex items-center py-6 px-4 text-black">
                  {/* imagem */}
                  <div className="w-[15%] flex justify-center">
                    <div className="relative w-34 h-34 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  </div>

                  <div className="w-[20%] font-extrabold text-[16px] text-center px-4">
                    {product.name}
                  </div>

                  <div className="w-[15%] font-extrabold text-[16px] text-center">
                    {product.price}
                  </div>

                  <div className="w-[35%] text-[14px] font-medium text-center px-6 leading-relaxed text-gray-800 flex items-center justify-center">
                    {product.description}
                  </div>

                  {/* ações */}
                  <div className="w-[15%] flex flex-col items-center gap-4">
                    <button className="w-24 bg-rock-red hover:bg-red-700 text-white font-bold py-1.5 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer">
                      Ver
                    </button>
                    <button className="w-24 bg-rock-red hover:bg-red-700 text-white font-bold py-1.5 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer">
                      Editar
                    </button>
                    <button className="w-24 bg-rock-red hover:bg-red-700 text-white font-bold py-1.5 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer">
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* paginação */}
          <div className="hidden md:flex justify-center items-center gap-3 sm:gap-5 mt-12 mb-4 text-rock-red font-medium text-[18px]">
            <button className="flex items-center hover:text-white transition-colors cursor-pointer">
              &larr; Anterior
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              <button className="bg-rock-red text-white w-11 h-11 flex items-center justify-center rounded-xl font-bold cursor-default">
                1
              </button>
              <button className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-zinc-700 transition-colors cursor-pointer">
                2
              </button>
              <button className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-zinc-700 transition-colors cursor-pointer">
                3
              </button>
              <span className="w-11 h-11 flex items-center justify-center">
                ...
              </span>
              <button className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-zinc-700 transition-colors cursor-pointer">
                56
              </button>
            </div>

            <button className="flex items-center hover:text-white transition-colors cursor-pointer">
              Próximo &rarr;
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
