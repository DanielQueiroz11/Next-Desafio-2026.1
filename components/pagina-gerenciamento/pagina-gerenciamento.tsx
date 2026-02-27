"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ModalAdicionarProduto from "@/components/modais/adicionar";
import ModalVisualizarProduto from "@/components/modais/visualizar";
import ModalEditarProduto from "@/components/modais/editar";
import ModalExcluirProduto from "@/components/modais/excluir";

type Produto = {
  id: number;
  title: string;
  price: number;
  description: string;
  fullDescription: string | null;
  image: string | null;
  ordem: number;
};

export default function PaginaGerenciamento({
  produtos = [],
  paginaAtual = 1,
  totalPaginas = 1,
  searchTermProp = "",
  totalDeProdutos = 0,
  estoqueTotal = 0,
}: {
  produtos: Produto[];
  paginaAtual?: number;
  totalPaginas?: number;
  searchTermProp?: string;
  totalDeProdutos?: number;
  estoqueTotal?: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isModalAdicionarOpen, setIsModalAdicionarOpen] = useState(false);
  const [produtoVisualizar, setProdutoVisualizar] = useState<Produto | null>(
    null,
  );
  const [produtoExcluir, setProdutoExcluir] = useState<Produto | null>(null);
  const [produtoEditar, setProdutoEditar] = useState<Produto | null>(null);

  const [searchTerm, setSearchTerm] = useState(searchTermProp);

  const isSearching = searchTerm !== searchTermProp;

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    params.set("page", "1");
    router.replace(`/gerenciamento?${params.toString()}`);
  };

  const mudarPagina = (novaPagina: number) => {
    if (novaPagina >= 1 && novaPagina <= totalPaginas) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", novaPagina.toString());
      router.push(`/gerenciamento?${params.toString()}`);
    }
  };

  const formatarPreco = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  return (
    <main className="flex min-h-screen bg-rock-dark">
      {/* sidebar */}
      <aside className="hidden lg:flex flex-col w-[250px] shrink-0 bg-rock-dark min-h-screen shadow-2xl z-10 border-r border-white/10">
        <div className="pt-8 pb-6 flex justify-center px-4">
          <Link
            href="/"
            className="relative w-full max-w-[200px] h-[89px] hover:scale-105 will-change-transform transition-transform cursor-pointer block"
          >
            <Image
              src="/imagens/logo.png"
              alt="Logo Caverna do Rock"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>
        <div className="px-8 pb-3">
          <h2 className="text-white font-extrabold text-[18px]">Admin</h2>
        </div>
        <div className="w-full h-[2px] bg-rock-red mb-8"></div>
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
        <header className="relative w-full py-6 md:py-0 md:h-24 bg-[#2A2A2A] flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-8 shadow-md z-0 border-b border-white/5">
          <div className="w-full md:flex-1 flex justify-start">
            <Link
              href="/"
              className="absolute md:static left-4 top-6 text-rock-red font-bold underline text-[15px] md:text-[18px] lg:hidden"
            >
              &larr; Voltar
            </Link>
          </div>

          {/* título com a quantidade total de produtos do site */}
          <div className="flex flex-col items-center mt-10 md:mt-0">
            <h1 className="text-white text-xl md:text-2xl lg:text-[28px] font-black tracking-wider uppercase text-center leading-tight">
              Gerenciamento
            </h1>
            <span className="text-rock-red font-bold text-xs md:text-sm">
              {estoqueTotal}{" "}
              {estoqueTotal === 1
                ? "produto cadastrado"
                : "produtos cadastrados"}
            </span>
          </div>

          <div className="w-full md:flex-1 flex justify-end mt-6 md:mt-0">
            <button
              onClick={() => setIsModalAdicionarOpen(true)}
              className="w-full md:w-auto bg-rock-red hover:bg-red-700 text-white font-bold px-6 py-3 md:py-2.5 rounded-md transition-colors shadow-lg cursor-pointer"
            >
              Adicionar produto
            </button>
          </div>
        </header>

        {/* área do conteúdo */}
        <div className="p-4 md:p-8 flex-1 flex flex-col max-w-7xl mx-auto w-full bg-[#1A1A1A]">
          {/* barra de pesquisa */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-full max-w-sm 2xl:max-w-md">
              <input
                type="text"
                placeholder="Pesquisar produto..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-[#2A2A2A] text-white placeholder:text-gray-400 border border-white/10 rounded-full text-base py-3.5 pl-6 pr-12 focus:outline-none focus:border-rock-red focus:ring-1 focus:ring-rock-red shadow-lg transition-all font-medium"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>

            {/* mensagem de resultados da busca */}
            {searchTerm && (
              <div className="w-full max-w-md mt-3 px-3 text-gray-400 text-[13.5px] font-medium">
                {isSearching ? (
                  <span className="animate-pulse">Buscando...</span>
                ) : totalDeProdutos === 1 ? (
                  "1 produto encontrado"
                ) : (
                  `${totalDeProdutos} produtos encontrados`
                )}
              </div>
            )}
          </div>

          {/* lista dos cards */}
          {produtos.length > 0 ? (
            <div className="flex flex-col gap-6 lg:gap-8 flex-1">
              {produtos.map((produto) => (
                <div
                  key={produto.id}
                  className="w-full bg-[#F5F5F5] rounded-xl overflow-hidden shadow-xl md:max-w-xl md:mx-auto lg:max-w-none"
                >
                  {/* cabeçalho vermelho */}
                  <div className="hidden lg:flex w-full bg-rock-red text-white items-center py-3 px-4 font-bold text-[15px]">
                    <div className="w-[15%] text-center">Imagem</div>
                    <div className="w-[20%] text-center">Nome</div>
                    <div className="w-[15%] text-center">Preço</div>
                    <div className="w-[35%] text-center pl-4">Descrição</div>
                    <div className="w-[15%] text-center">Ações</div>
                  </div>

                  {/* corpo (branco) do card */}
                  <div className="w-full flex flex-col lg:flex-row items-center py-6 px-4 text-black gap-4 lg:gap-0">
                    <div className="w-full lg:w-[15%] flex justify-center">
                      <div className="relative w-50 h-50 lg:w-34 lg:h-34 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden shrink-0">
                        <Image
                          src={produto.image || "/imagens/produto-padrao.jpg"}
                          alt={produto.title}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-[20%] font-extrabold text-[20px] lg:text-[16px] text-center lg:px-4">
                      {produto.title}
                    </div>
                    <div className="w-full lg:w-[15%] font-black text-2xl lg:text-[16px] text-rock-red lg:text-black text-center">
                      {formatarPreco(produto.price)}
                    </div>
                    <div className="w-full lg:w-[35%] text-[15px] lg:text-[14px] font-medium text-center px-2 lg:px-6 leading-relaxed text-gray-700 lg:text-gray-800 line-clamp-3">
                      {produto.description}
                    </div>
                    <div className="w-full lg:w-[15%] flex flex-row lg:flex-col items-center justify-center gap-2 lg:gap-4 mt-4 lg:mt-0 border-t border-gray-200 lg:border-t-0 pt-4 lg:pt-0">
                      <button
                        onClick={() => setProdutoVisualizar(produto)}
                        className="flex-1 lg:flex-none lg:w-24 bg-rock-red hover:bg-red-700 text-white font-bold py-2 lg:py-1.5 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer text-sm"
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => setProdutoEditar(produto)}
                        className="flex-1 lg:flex-none lg:w-24 bg-rock-red hover:bg-red-700 text-white font-bold py-2 lg:py-1.5 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => setProdutoExcluir(produto)}
                        className="flex-1 lg:flex-none lg:w-24 bg-rock-red hover:bg-red-700 text-white font-bold py-2 lg:py-1.5 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer text-sm lg:bg-rock-red lg:hover:bg-red-700"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
              <p className="text-gray-400 text-xl font-bold">
                Nenhum produto encontrado. 🤘
              </p>
            </div>
          )}

          {/* paginação */}
          {totalPaginas > 1 && (
            <div className="flex justify-center items-center gap-2 md:gap-5 mt-12 mb-4 text-rock-red font-medium text-sm md:text-[18px]">
              <button
                onClick={() => mudarPagina(paginaAtual - 1)}
                disabled={paginaAtual === 1}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-xs md:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-rock-red"
              >
                <span>&larr;</span>
                <span className="md:hidden">Ant.</span>
                <span className="hidden md:inline">Anterior</span>
              </button>

              <div className="flex items-center gap-1 md:gap-3 text-gray-300">
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                  (p) => {
                    if (
                      p === 1 ||
                      p === totalPaginas ||
                      Math.abs(paginaAtual - p) <= 1
                    ) {
                      return (
                        <button
                          key={p}
                          onClick={() => mudarPagina(p)}
                          className={`w-8 h-8 md:w-11 md:h-11 flex items-center justify-center rounded-xl transition-colors ${paginaAtual === p ? "bg-rock-red text-white font-bold cursor-default" : "hover:bg-zinc-700 cursor-pointer"}`}
                        >
                          {p}
                        </button>
                      );
                    }
                    if (p === paginaAtual - 2 || p === paginaAtual + 2) {
                      return (
                        <span
                          key={p}
                          className="w-8 h-8 md:w-11 md:h-11 flex items-center justify-center text-gray-400"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  },
                )}
              </div>

              <button
                onClick={() => mudarPagina(paginaAtual + 1)}
                disabled={paginaAtual === totalPaginas}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-xs md:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-rock-red"
              >
                <span className="md:hidden">Próx.</span>
                <span className="hidden md:inline">Próximo</span>
                <span>&rarr;</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {isModalAdicionarOpen && (
        <ModalAdicionarProduto
          onClose={() => setIsModalAdicionarOpen(false)}
          totalProdutos={estoqueTotal}
        />
      )}
      {produtoVisualizar && (
        <ModalVisualizarProduto
          produto={produtoVisualizar}
          onClose={() => setProdutoVisualizar(null)}
        />
      )}
      {produtoEditar && (
        <ModalEditarProduto
          produto={produtoEditar}
          onClose={() => setProdutoEditar(null)}
        />
      )}
      {produtoExcluir && (
        <ModalExcluirProduto
          produto={produtoExcluir}
          onClose={() => setProdutoExcluir(null)}
        />
      )}
    </main>
  );
}
