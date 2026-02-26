"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/src/providers/cart-context";

interface ProdutoProps {
  produto: {
    id: number;
    title: string;
    description: string | null;
    price: number;
    image: string | null;
  };
}

const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const formatarParcela = (valor: number) => {
  let parcelas = Math.ceil(valor / 20);
  parcelas = Math.max(1, Math.min(6, parcelas));

  if (parcelas === 1) return `À vista por ${formatadorMoeda.format(valor)}`;

  const valorParcela = valor / parcelas;
  return `Em até ${parcelas}x de ${formatadorMoeda.format(valorParcela)} sem juros`;
};

export default function PaginaVisualizacao({ produto }: ProdutoProps) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [selectedModel, setSelectedModel] = useState("Masculino");

  const [showModal, setShowModal] = useState(false);

  const { addToCart } = useCart();

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({
      id: produto.id,
      name: produto.title,
      price: produto.price,
      quantity: quantity,
      size: selectedSize,
      image: produto.image || "/imagens/produto-1.jpg",
    });

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const tamanhosDisponiveis = ["P", "M", "G", "GG"];

  return (
    <section className="w-full min-h-[calc(100vh-80px)] bg-rock-dark text-white py-8 md:py-12 px-6 sm:px-8 md:px-12 flex justify-center relative">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-start">
        {/* lado esquerdo */}
        <div className="flex flex-col gap-6">
          {/* título e preço */}
          <div>
            <h1 className="text-[26px] md:text-[30px] lg:text-[34px] xl:text-[40px] 2xl:text-[48px] font-black mb-2 tracking-wide leading-tight">
              {produto.title}
            </h1>
            <p className="text-rock-red text-[32px] md:text-[36px] lg:text-[42px] xl:text-[46px] 2xl:text-[52px] font-extrabold mb-1">
              R$ {produto.price.toFixed(2).replace(".", ",")}
            </p>
            <p className="text-[14px] md:text-base text-gray-300 font-medium">
              {formatarParcela(produto.price)}
            </p>
          </div>

          {/* imagem */}
          <div className="relative w-full aspect-square bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-xl border border-white/10 group">
            <div className="relative w-full h-full p-6 md:p-8">
              <Image
                src={produto.image || "/imagens/produto-1.jpg"}
                alt={produto.title}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>

        {/* lado direito */}
        <div className="flex flex-col gap-8 md:pt-2">
          {/* descrição */}
          <div>
            <h3 className="text-[18px] md:text-xl font-bold mb-3 text-white uppercase tracking-wider">
              Descrição
            </h3>
            <p className="text-gray-300 text-[15px] md:text-base leading-relaxed text-justify">
              {produto.description ||
                "Descrição não disponível para este produto."}
            </p>
          </div>

          {/* modelo */}
          <div>
            <h3 className="text-rock-red text-[16px] md:text-lg font-bold mb-3 uppercase tracking-wider">
              Modelo
            </h3>
            <div className="flex gap-6 text-[15px] md:text-lg">
              {["Masculino", "Feminino"].map((model) => (
                <span
                  key={model}
                  onClick={() => setSelectedModel(model)}
                  className={`cursor-pointer transition-colors font-bold pb-1 border-b-2 ${
                    selectedModel === model
                      ? "text-white border-white"
                      : "text-gray-500 border-transparent hover:text-gray-300"
                  }`}
                >
                  {model}
                </span>
              ))}
            </div>
          </div>

          {/* tamanho */}
          <div>
            <h3 className="text-rock-red text-[16px] md:text-lg font-bold mb-3 uppercase tracking-wider">
              Tamanho
            </h3>
            <div className="flex flex-wrap gap-3 font-bold text-[15px] md:text-lg">
              {tamanhosDisponiveis.map((size) => (
                <span
                  key={size}
                  className={`w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-lg cursor-pointer transition-all border-2 ${
                    selectedSize === size
                      ? "text-white border-rock-red bg-rock-red/20 scale-105"
                      : "text-gray-500 border-transparent hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* quantidade */}
          <div>
            <h3 className="text-rock-red text-[16px] md:text-lg font-bold mb-3 uppercase tracking-wider">
              Quantidade
            </h3>
            <div className="flex items-center gap-5 text-xl md:text-2xl font-bold">
              <button
                onClick={decreaseQty}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/5 hover:bg-rock-red text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              >
                -
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                onClick={increaseQty}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/5 hover:bg-rock-red text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* botões de ação */}
          <div className="flex flex-col gap-4 mt-2">
            {/* botão adicionar */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-rock-red text-white font-extrabold text-[18px] md:text-xl py-4 rounded-full hover:bg-red-700 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-rock-red/20 flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Adicionar ao carrinho
            </button>

            {/* link direto para o carrinho */}
            <Link
              href="/carrinho"
              className="text-center text-[16px] md:text-base text-gray-400 hover:text-white mt-1 underline transition-colors font-medium"
            >
              Ir para o carrinho
            </Link>
          </div>
        </div>
      </div>

      {/* modal de sucesso */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-6"
          onClick={handleCloseModal}
        >
          <div
            className="bg-[#1A1A1A] border border-white/10 p-8 pt-10 rounded-3xl shadow-2xl max-w-sm w-full flex flex-col items-center text-center relative cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* botão X */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
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

            <div className="w-20 h-20 bg-rock-red/20 text-rock-red rounded-full flex items-center justify-center mb-6 border border-rock-red/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-wide uppercase">
              Tudo certo!
            </h3>
            <p className="text-gray-400 text-[15px] md:text-[16px] leading-relaxed">
              O produto foi adicionado ao seu carrinho.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
