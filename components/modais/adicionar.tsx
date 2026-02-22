"use client";

import { useState, useEffect } from "react";

export default function ModalAdicionarProduto({ onClose }: { onClose: () => void }) {
  const [preco, setPreco] = useState("");

  // bloqueia o scroll da página de fundo quando o modal tá aberto
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

    // limite preço
    if (value.length > 6) {
      value = value.slice(0, 6);
    }

    // adapta pro padrão BR
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
          Adicionar produto
        </h2>

        {/* nome */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Nome</label>
          <input 
            type="text" 
            className="bg-[#0D0D0D] border border-transparent focus:border-rock-red rounded-xl p-3.5 text-white outline-none transition-colors shadow-inner" 
          />
        </div>

        {/* preço */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Preço</label>
          <div className="flex items-center bg-[#0D0D0D] border border-transparent focus-within:border-rock-red rounded-xl px-3.5 transition-colors shadow-inner">
            <span className="text-rock-red font-black mr-1">R$</span>
            <input 
              type="text" 
              value={preco}
              onChange={handlePrecoChange}
              className="bg-transparent w-full p-3.5 text-white outline-none" 
              placeholder="0,00"
            />
          </div>
        </div>

        {/* descrição geral */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Descrição (geral)</label>
          <textarea 
            rows={2} 
            className="bg-[#0D0D0D] border border-transparent focus:border-rock-red rounded-xl p-3.5 text-white outline-none transition-colors resize-none shadow-inner" 
          />
        </div>

        {/* descrição individual */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Descrição (visualização individual)</label>
          <textarea 
            rows={4} 
            className="bg-[#0D0D0D] border border-transparent focus:border-rock-red rounded-xl p-3.5 text-white outline-none transition-colors resize-none shadow-inner" 
          />
        </div>

        {/* imagem */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Imagem</label>
          <div className="flex flex-col items-center gap-4 mt-2">
            <div 
              className="w-60 h-60 rounded-2xl overflow-hidden border-2 border-dashed border-white/20"
              style={{
                backgroundColor: "#ffffff",
                backgroundImage: "linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0), linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 10px 10px"
              }}
            ></div>
            
            <button className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-gray-300 text-xs font-bold py-2.5 px-5 rounded-lg transition-colors cursor-pointer">
              Escolher imagem
            </button>
          </div>
        </div>

        {/* botões de ação */}
        <div className="flex justify-center gap-6 mt-8">
          <button className="bg-white hover:bg-gray-200 text-rock-dark font-extrabold py-3.5 px-8 rounded-full transition-all hover:scale-105 active:scale-95 text-[16px] cursor-pointer">
            Adicionar
          </button>
          <button 
            onClick={onClose} 
            className="bg-rock-red hover:bg-red-700 text-white font-extrabold py-3.5 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rock-red/20 text-[16px] cursor-pointer"
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
}