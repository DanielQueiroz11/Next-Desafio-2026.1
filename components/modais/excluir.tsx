"use client";

import { useEffect, useState } from "react";
import { excluirProduto } from "@/src/app/actions/produto-actions";

type Produto = {
  id: number;
  title: string;
};

export default function ModalExcluirProduto({
  produto,
  onClose,
}: {
  produto: Produto;
  onClose: () => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  // bloqueia o scroll da página ao fundo quando o modal abre
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // função que chama o backend para deletar
  const handleExcluir = async () => {
    setIsDeleting(true);
    await excluirProduto(produto.id);
    setIsDeleting(false);
    onClose(); // fecha o modal após excluir
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#1A1A1A] w-full max-w-[450px] rounded-[32px] p-8 flex flex-col gap-6 relative my-auto shadow-2xl border border-white/5 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X */}
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        {/* título */}
        <h2 className="text-[22px] font-black text-white text-center mb-2 mt-2">
          Excluir produto
        </h2>

        {/* texto de aviso */}
        <p className="text-white text-[16px] font-medium leading-relaxed text-center px-2">
          Tem certeza que deseja excluir o produto <span className="text-rock-red font-bold">&quot;{produto.title}&quot;</span>?
          Essa ação não poderá ser desfeita!
        </p>

        {/* botões de ação */}
        <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-6 sm:gap-6 mt-4">
          <button 
            onClick={handleExcluir}
            disabled={isDeleting}
            className={`w-40 font-extrabold py-3.5 rounded-full transition-all text-[15px] md:text-[16px] lg:text-[18px] cursor-pointer ${
              isDeleting 
                ? "bg-gray-400 text-gray-700 cursor-not-allowed" 
                : "bg-white hover:bg-gray-200 text-rock-dark hover:scale-105 active:scale-95"
            }`}
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </button>

          <button
            onClick={onClose}
            disabled={isDeleting}
            className="w-40 bg-rock-red hover:bg-red-700 text-white font-extrabold py-3.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rock-red/20 text-[15px] md:text-[16px] lg:text-[18px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}