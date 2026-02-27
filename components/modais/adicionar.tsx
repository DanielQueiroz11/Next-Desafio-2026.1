"use client";

import { useState, useEffect } from "react";
import { adicionarProduto } from "@/src/app/actions/produto-actions";

export default function ModalAdicionarProduto({
  onClose,
  totalProdutos, 
}: {
  onClose: () => void;
  totalProdutos: number; 
}) {
  const [preco, setPreco] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (value.length > 6) {
      value = value.slice(0, 6);
    }
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
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    await adicionarProduto(formData);

    setIsSubmitting(false);
    onClose(); 
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-6 overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[#1A1A1A] w-full max-w-[450px] rounded-[32px] p-8 flex flex-col gap-5 relative my-auto shadow-2xl border border-white/5 cursor-default mt-20 md:mt-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className="text-[22px] font-black text-white text-center mb-2">
          Adicionar produto
        </h2>

        {/* nome */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Nome</label>
          <input
            type="text"
            name="nome"
            required
            className="bg-[#0D0D0D] border border-transparent focus:border-rock-red rounded-xl p-3.5 text-white outline-none transition-colors shadow-inner"
          />
        </div>

        {/* imagem */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Imagem</label>
          <div className="flex flex-col items-center gap-4 mt-2">
            <div
              className="w-60 h-60 rounded-2xl border-2 border-dashed border-white/20"
              style={{
                backgroundColor: imagePreview ? "transparent" : "#ffffff",
                backgroundImage: imagePreview
                  ? `url(${imagePreview})`
                  : "linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0), linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0)",
                backgroundSize: imagePreview ? "contain" : "20px 20px",
                backgroundPosition: imagePreview ? "center" : "0 0, 10px 10px",
                backgroundRepeat: imagePreview ? "no-repeat" : "repeat",
              }}
            ></div>

            <label className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-gray-300 text-xs font-bold py-2.5 px-5 rounded-lg transition-colors cursor-pointer">
              Escolher imagem
              <input
                type="file"
                name="imagem"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* preço */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Preço</label>
          <div className="flex items-center bg-[#0D0D0D] border border-transparent focus-within:border-rock-red rounded-xl px-3.5 transition-colors shadow-inner">
            <span className="text-rock-red font-black mr-1">R$</span>
            <input
              type="text"
              name="preco"
              value={preco}
              onChange={handlePrecoChange}
              required
              className="bg-transparent w-full p-3.5 text-white outline-none"
              placeholder="0,00"
            />
          </div>
        </div>

        {/* ordem na vitrine */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">Posição na vitrine (0 é prioridade, aparece primeiro)</label>
          <input
            type="number"
            name="ordem"
            defaultValue="0"
            min="0"
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === 'e') {
                e.preventDefault();
              }
            }}
            onWheel={(e) => {
              (e.target as HTMLInputElement).blur();
            }}
            className="bg-[#0D0D0D] border border-transparent focus:border-rock-red rounded-xl p-3.5 text-white outline-none transition-colors shadow-inner"
            placeholder="Ex: 1 (Para ser o primeiro)"
          />
          <p className="text-gray-400 text-[12px] px-1 mt-1 font-medium">
            💡 Atualmente, há <span className="text-white font-bold">{totalProdutos}</span> {totalProdutos === 1 ? 'produto cadastrado' : 'produtos cadastrados'}. 
          </p>
        </div>

        {/* descrição geral */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">
            Descrição (geral)
          </label>
          <textarea
            rows={2}
            name="descricaoGeral"
            required
            className="bg-[#0D0D0D] border border-transparent focus:border-rock-red rounded-xl p-3.5 text-white outline-none transition-colors resize-none shadow-inner"
          />
        </div>

        {/* descrição individual */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white font-bold text-sm">
            Descrição (visualização individual)
          </label>
          <textarea
            rows={4}
            name="descricaoIndividual"
            className="bg-[#0D0D0D] border border-transparent focus:border-rock-red rounded-xl p-3.5 text-white outline-none transition-colors resize-none shadow-inner"
          />
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`font-extrabold py-3.5 px-8 rounded-full transition-all text-[16px] cursor-pointer ${
              isSubmitting
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-white hover:bg-gray-200 text-rock-dark hover:scale-105 active:scale-95"
            }`}
          >
            {isSubmitting ? "Salvando..." : "Adicionar"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-rock-red hover:bg-red-700 text-white font-extrabold py-3.5 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rock-red/20 text-[16px] cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}