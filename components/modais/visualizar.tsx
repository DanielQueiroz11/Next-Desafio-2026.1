"use client";

import Image from "next/image";
import { useEffect } from "react";

const mockProduct = {
  id: 1,
  name: "Camisa Linkin Park",
  price: "R$64,99",
  installment_prefix: "2x de ",
  installment_value: "32,50",
  installment_suffix: " sem juros",
  descriptionGeral: "Tecido 100% algodão: macia, leve e confortável para o dia a dia.",
  descriptionIndividual: "Camiseta do Linkin Park com estampa inspirada na identidade visual icônica da banda. Confeccionada em 100% algodão de alta qualidade, garantindo conforto, respirabilidade e ótima durabilidade. Design moderno e autêntico, ideal para shows, uso casual e para fãs que querem demonstrar seu estilo no dia a dia.",
  image: "/imagens/produto-1.jpg",
};

export default function ModalVisualizarProduto({ onClose }: { onClose: () => void }) {
  
  // bloquear scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-[#1A1A1A] w-full max-w-[450px] rounded-[32px] p-8 flex flex-col gap-7 relative my-auto shadow-2xl border border-white/5 cursor-default"
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

       {/* imagem */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Imagem</label>
          <div className="relative w-full max-w-[280px] aspect-square mx-auto bg-white rounded-2xl overflow-hidden shadow-inner mt-2">
            <Image
              src={mockProduct.image}
              alt={mockProduct.name}
              fill
              className="object-contain p-2"
            />
          </div>
        </div>

        {/* nome */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-bold text-sm">Nome</label>
          <p className="text-gray-300 text-sm">{mockProduct.name}</p>
        </div>

        {/* preço */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-bold text-sm">Preço</label>
          <div>
            <p className="text-rock-red font-black text-lg">{mockProduct.price}</p>
            <p className="text-gray-400 text-[11px]">
              {mockProduct.installment_prefix}
              <span className="text-rock-red font-bold">{mockProduct.installment_value}</span>
              {mockProduct.installment_suffix}
            </p>
          </div>
        </div>

        {/* descrição geral */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-bold text-sm">Descrição (geral)</label>
          <p className="text-gray-300 text-sm leading-relaxed text-justify">
            {mockProduct.descriptionGeral}
          </p>
        </div>

        {/* descrição individual */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-bold text-sm">Descrição (visualização individual)</label>
          <p className="text-gray-300 text-sm leading-relaxed text-justify">
            {mockProduct.descriptionIndividual}
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