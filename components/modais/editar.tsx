"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { editarProduto, verificarOrdem } from "@/src/app/actions/produto-actions";

type Produto = {
  id: number;
  title: string;
  price: number;
  description: string;
  fullDescription: string | null;
  image: string | null;
  ordem: number; // A tipagem da ordem
};

export default function ModalEditarProduto({ 
  produto, 
  onClose 
}: { 
  produto: Produto; 
  onClose: () => void;
}) {
  const precoInicial = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(produto.price);

  const [nome, setNome] = useState(produto.title);
  const [preco, setPreco] = useState(precoInicial);
  const [descGeral, setDescGeral] = useState(produto.description);
  const [descIndiv, setDescIndiv] = useState(produto.fullDescription || "");
  const [imagePreview, setImagePreview] = useState<string | null>(produto.image);
  
  const [ordem, setOrdem] = useState(produto.ordem === 0 ? "" : produto.ordem.toString());
  const [avisoOrdem, setAvisoOrdem] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // checar em tempo real se a posição está ocupada
  useEffect(() => {
    const checarPosicao = async () => {
      const numeroDigitado = parseInt(ordem);
      
      if (numeroDigitado && numeroDigitado > 0) {
        const ocupante = await verificarOrdem(numeroDigitado, produto.id);
        
        if (ocupante) {
          // compara os IDs para saber quem é o mais recente (ID maior = mais novo)
          if (produto.id > ocupante.id) {
            setAvisoOrdem(`A posição ${numeroDigitado} já é do(a) "${ocupante.title}". Se salvar, o(a) "${produto.title}" assumirá a frente por ser mais recente.`);
          } else {
            setAvisoOrdem(`A posição ${numeroDigitado} já é do(a) "${ocupante.title}". Se salvar, o(a) "${produto.title}" ficará logo atrás por ser mais antigo.`);
          }
        } else {
          setAvisoOrdem(null);
        }
      } else {
        setAvisoOrdem(null); // limpa o aviso se apagar ou colocar 0
      }
    };

    const timeoutId = setTimeout(checarPosicao, 500);
    return () => clearTimeout(timeoutId);
  }, [ordem, produto.id, produto.title]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (!value) {
      setPreco("");
      return;
    }
    if (value.length > 6) value = value.slice(0, 6);
    
    const numericValue = parseInt(value, 10) / 100;
    const formatted = numericValue.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setPreco(formatted);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    await editarProduto(formData);
    setIsSubmitting(false);
    onClose();
  };

  const getParcelaInfo = () => {
    const valorNumerico = parseFloat(preco.replace(/\./g, "").replace(",", ".")) || 0;
    let parcelas = Math.ceil(valorNumerico / 20);
    parcelas = Math.max(1, Math.min(6, parcelas));
    
    if (parcelas === 1 || valorNumerico === 0) return { prefix: "À vista", value: "", suffix: "" };
    
    const valorParcela = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valorNumerico / parcelas);
    return { prefix: `${parcelas}x de `, value: valorParcela, suffix: " sem juros" };
  };

  const parcela = getParcelaInfo();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-6 overflow-y-auto" 
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form onSubmit={handleSubmit} className="bg-[#1A1A1A] w-full max-w-[450px] rounded-[32px] p-8 flex flex-col gap-5 relative my-auto shadow-2xl border border-white/5 cursor-default mt-20 md:mt-auto" onClick={(e) => e.stopPropagation()}>
        
        <input type="hidden" name="id" value={produto.id} />

        <button type="button" onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <h2 className="text-[22px] font-black text-white text-center mb-2">Editar produto</h2>

        {/* nome */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Nome</label>
          <input type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required className="bg-[#0D0D0D] border border-transparent focus:border-rock-red rounded-xl p-3.5 text-white outline-none transition-colors shadow-inner" />
        </div>

        {/* ordem na vitrine */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Posição na vitrine</label>
          <input 
            type="number" 
            name="ordem" 
            value={ordem}
            min="0" 
            onKeyDown={(e) => {
              // bloqueia a digitação do sinal de menos (-) e da letra (e)
              if (e.key === '-' || e.key === 'e') {
                e.preventDefault();
              }
            }}
            onWheel={(e) => {
              (e.target as HTMLInputElement).blur();
            }}
            onChange={(e) => setOrdem(e.target.value)}
            className={`bg-[#0D0D0D] border rounded-xl p-3.5 text-white outline-none transition-colors shadow-inner ${avisoOrdem ? "border-yellow-500/50 focus:border-yellow-500" : "border-transparent focus:border-rock-red"}`} 
            placeholder="Ex: 1"
          />
          {avisoOrdem ? (
            <p className="text-yellow-500 text-[11px] px-1 font-medium leading-tight mt-1">{avisoOrdem}</p>
          ) : (
            <p className="text-gray-400 text-[11px] px-1 mt-1">Números menores aparecem primeiro (Ex: 1, 2, 3...)</p>
          )}
        </div>

        {/* imagem */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Imagem</label>
          <div className="flex flex-col items-center gap-4 mt-2">
            <div className="relative w-60 h-60 bg-white rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
              {imagePreview ? (
                <Image src={imagePreview} alt={nome} fill className="object-contain p-2" />
              ) : (
                <span className="text-gray-400 text-sm">Sem imagem</span>
              )}
            </div>
            
            <label className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-gray-300 text-xs font-bold py-2.5 px-5 rounded-lg transition-colors cursor-pointer">
              Mudar imagem
              <input type="file" name="imagem" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
        </div>

        {/* preço */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Preço</label>
          <div>
            <div className="flex items-center bg-[#0D0D0D] border border-transparent focus-within:border-rock-red rounded-xl px-3.5 transition-colors shadow-inner">
              <span className="text-rock-red font-black mr-1">R$</span>
              <input type="text" name="preco" value={preco} onChange={handlePrecoChange} required className="bg-transparent w-full p-3.5 text-rock-red font-bold outline-none" placeholder="0,00" />
            </div>
            <p className="text-gray-400 text-[11px] mt-1.5 px-1">
              {parcela.prefix}
              {parcela.value && <span className="text-rock-red font-bold">{parcela.value}</span>}
              {parcela.suffix}
            </p>
          </div>
        </div>

        {/* descrição geral */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Descrição (geral)</label>
          <textarea rows={2} name="descricaoGeral" value={descGeral} onChange={(e) => setDescGeral(e.target.value)} required className="bg-[#0D0D0D] border border-transparent focus:border-rock-red rounded-xl p-3.5 text-white outline-none transition-colors resize-none shadow-inner text-sm leading-relaxed" />
        </div>

        {/* descrição individual */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Descrição (visualização individual)</label>
          <textarea rows={4} name="descricaoIndividual" value={descIndiv} onChange={(e) => setDescIndiv(e.target.value)} className="bg-[#0D0D0D] border border-transparent focus:border-rock-red rounded-xl p-3.5 text-white outline-none transition-colors resize-none shadow-inner text-sm leading-relaxed" />
        </div>

        {/* botões */}
        <div className="flex justify-center gap-6 mt-4">
          <button type="submit" disabled={isSubmitting} className={`font-extrabold py-3.5 px-8 rounded-full transition-all text-sm cursor-pointer ${isSubmitting ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-white hover:bg-gray-200 text-rock-dark hover:scale-105 active:scale-95"}`}>
            {isSubmitting ? "Salvando..." : "Salvar"}
          </button>
          <button type="button" onClick={onClose} disabled={isSubmitting} className="bg-rock-red hover:bg-red-700 text-white font-extrabold py-3.5 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rock-red/20 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
            Cancelar
          </button>
        </div>

      </form>
    </div>
  );
}