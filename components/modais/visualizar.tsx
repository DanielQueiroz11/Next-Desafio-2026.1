"use client";

import Image from "next/image";
import { useEffect } from "react";

type Produto = {
  id: number;
  title: string;
  price: number;
  description: string;
  fullDescription: string | null;
  image: string | null;
};

export default function ModalVisualizarProduto({ 
  produto, 
  onClose 
}: { 
  produto: Produto; 
  onClose: () => void;
}) {
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const formatarPreco = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
  };

  const calcularParcela = (valor: number) => {
    let parcelas = Math.ceil(valor / 20);
    parcelas = Math.max(1, Math.min(6, parcelas)); 
    
    if (parcelas === 1) return { prefix: "À vista", value: "", suffix: "" };
    
    return {
      prefix: `${parcelas}x de `,
      value: formatarPreco(valor / parcelas),
      suffix: " sem juros"
    };
  };

  const parcela = calcularParcela(produto.price);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-[#1A1A1A] w-full max-w-[450px] rounded-[32px] p-8 flex flex-col gap-7 relative my-auto shadow-2xl border border-white/5 cursor-default mt-20 md:mt-auto"
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* X fechar */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <h2 className="text-[22px] font-black text-white text-center mb-2">
          Visualizar produto
        </h2>

        {/* nome */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-bold text-sm">Nome</label>
          <p className="text-gray-300 text-sm">{produto.title}</p>
        </div>

       {/* imagem */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Imagem</label>
          <div className="relative w-full max-w-[280px] aspect-square mx-auto bg-white rounded-2xl overflow-hidden shadow-inner mt-2">
            <Image
              src={produto.image || "/imagens/produto-padrao.jpg"}
              alt={produto.title}
              fill
              className="object-contain p-2"
            />
          </div>
        </div>

        {/* preço */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-bold text-sm">Preço</label>
          <div>
            <p className="text-rock-red font-black text-lg">{formatarPreco(produto.price)}</p>
            <p className="text-gray-400 text-[11px]">
              {parcela.prefix}
              {parcela.value && <span className="text-rock-red font-bold">{parcela.value}</span>}
              {parcela.suffix}
            </p>
          </div>
        </div>

        {/* descrição geral */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-bold text-sm">Descrição (geral)</label>
          <p className="text-gray-300 text-sm leading-relaxed text-justify">
            {produto.description}
          </p>
        </div>

        {/* descrição individual */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-bold text-sm">Descrição (visualização individual)</label>
          <p className="text-gray-300 text-sm leading-relaxed text-justify">
            {produto.fullDescription || "Nenhuma descrição detalhada informada."}
          </p>
        </div>

        {/* botão fechar */}
        <div className="flex justify-center mt-6">
          <button 
            onClick={onClose} 
            className="bg-rock-red hover:bg-red-700 text-white font-extrabold py-3.5 px-12 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rock-red/20 text-[16px] cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}