"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const mockProduct = {
  id: 1,
  name: "Camisa Linkin Park",
  price: "64,99",
  installment_prefix: "2x de ",
  installment_value: "32,50",
  installment_suffix: " sem juros",
  descriptionGeral: "Tecido 100% algodão: macia, leve e confortável para o dia a dia.",
  descriptionIndividual: "Camiseta do Linkin Park com estampa inspirada na identidade visual icônica da banda. Confeccionada em 100% algodão de alta qualidade, garantindo conforto, respirabilidade e ótima durabilidade. Design moderno e autêntico, ideal para shows, uso casual e para fãs que querem demonstrar seu estilo no dia a dia.",
  image: "/imagens/produto-1.jpg",
};

export default function ModalEditarProduto({ onClose }: { onClose: () => void }) {
  const [nome, setNome] = useState(mockProduct.name);
  const [preco, setPreco] = useState(mockProduct.price);
  const [descGeral, setDescGeral] = useState(mockProduct.descriptionGeral);
  const [descIndiv, setDescIndiv] = useState(mockProduct.descriptionIndividual);

  // bloqueia scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    
    if (!value) {
      setPreco("");
      return;
    }

    if (value.length > 6) {
      value = value.slice(0, 6);
    }

    const numericValue = parseInt(value, 10) / 100;
    const formatted = numericValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    setPreco(formatted);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-[#1A1A1A] w-full max-w-[450px] rounded-[32px] p-8 flex flex-col gap-5 relative my-auto shadow-2xl border border-white/5 cursor-default"
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
          Editar produto
        </h2>

        {/* nome */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Nome</label>
          <input 
            type="text" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="bg-[#0D0D0D] border border-transparent focus:border-rock-red rounded-xl p-3.5 text-white outline-none transition-colors shadow-inner" 
          />
        </div>

        {/* preço */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Preço</label>
          <div>
            <div className="flex items-center bg-[#0D0D0D] border border-transparent focus-within:border-rock-red rounded-xl px-3.5 transition-colors shadow-inner">
              <span className="text-rock-red font-black mr-1">R$</span>
              <input 
                type="text" 
                value={preco}
                onChange={handlePrecoChange}
                className="bg-transparent w-full p-3.5 text-rock-red font-bold outline-none" 
                placeholder="0,00"
              />
            </div>
            <p className="text-gray-400 text-[11px] mt-1.5 px-1">
              {mockProduct.installment_prefix}
              <span className="text-rock-red font-bold">{mockProduct.installment_value}</span>
              {mockProduct.installment_suffix}
            </p>
          </div>
        </div>

        {/* descrição geral */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Descrição (geral)</label>
          <textarea 
            rows={2} 
            value={descGeral}
            onChange={(e) => setDescGeral(e.target.value)}
            className="bg-[#0D0D0D] border border-transparent focus:border-rock-red rounded-xl p-3.5 text-white outline-none transition-colors resize-none shadow-inner text-sm leading-relaxed" 
          />
        </div>

        {/* descrição individual */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Descrição (visualização individual)</label>
          <textarea 
            rows={4} 
            value={descIndiv}
            onChange={(e) => setDescIndiv(e.target.value)}
            className="bg-[#0D0D0D] border border-transparent focus:border-rock-red rounded-xl p-3.5 text-white outline-none transition-colors resize-none shadow-inner text-sm leading-relaxed" 
          />
        </div>

        {/* imagem */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Imagem</label>
          <div className="flex flex-col items-center gap-4 mt-2">
            
            <div className="relative w-60 h-60 bg-white rounded-2xl overflow-hidden shadow-inner">
              <Image
                src={mockProduct.image}
                alt={nome}
                fill
                className="object-contain p-2"
              />
            </div>
            
            <button className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-gray-300 text-xs font-bold py-2.5 px-5 rounded-lg transition-colors cursor-pointer">
              Mudar imagem
            </button>
          </div>
        </div>

        {/* botões de ação */}
        <div className="flex justify-center gap-6 mt-4">
          <button className="bg-white hover:bg-gray-200 text-rock-dark font-extrabold py-3.5 px-8 rounded-full transition-all hover:scale-105 active:scale-95 text-sm cursor-pointer">
            Salvar
          </button>
          <button 
            onClick={onClose} 
            className="bg-rock-red hover:bg-red-700 text-white font-extrabold py-3.5 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rock-red/20 text-sm cursor-pointer"
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
}