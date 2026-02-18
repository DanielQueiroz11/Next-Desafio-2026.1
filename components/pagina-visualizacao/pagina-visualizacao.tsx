"use client";

import Image from "next/image";
import { useState } from "react";

const mockProduct = {
  id: 1,
  name: "Camisa Linkin Park",
  description:
    "Camiseta do Linkin Park com estampa inspirada na identidade visual icônica da banda. Confeccionada em 100% algodão de alta qualidade, garantindo conforto, respirabilidade e ótima durabilidade. Design moderno e autêntico, ideal para shows, uso casual e para fãs que querem demonstrar seu estilo no dia a dia.",
  price: "R$74,99",
  installment: "Em até 2x sem juros",
  image: "/imagens/produto-1.jpg", 
  sizes: ["P", "M", "G", "GG"],
};

export default function PaginaVisualizacao() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [selectedModel, setSelectedModel] = useState("Masculino");

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <section className="w-full min-h-[calc(100vh-80px)] bg-rock-dark text-white py-12 px-4 md:px-8 flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* lado esquerdo */}
        <div className="flex flex-col gap-6">
          
          {/* título e preço */}
          <div>
             <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-wide">{mockProduct.name}</h1>
             <p className="text-rock-red text-4xl md:text-4xl font-extrabold mb-1">{mockProduct.price}</p>
             <p className="text-sm md:text-base text-gray-300 font-medium">{mockProduct.installment}</p>
          </div>

          {/* imagem */}
          <div className="relative w-full aspect-square bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-xl border border-white/10">
            <div className="relative w-full h-full p-4">
                <Image
                  src={mockProduct.image}
                  alt={mockProduct.name}
                  fill
                  priority
                />
            </div>
          </div>
        </div>

        {/* lado direito */}
        <div className="flex flex-col gap-8 pt-2">
          
          {/* descrição */}
          <div>
            <h3 className="text-xl font-bold mb-3 text-white">Descrição</h3>
            <p className="text-gray-300 text-base leading-relaxed text-justify">
              {mockProduct.description}
            </p>
          </div>

          {/* modelo */}
          <div>
            <h3 className="text-rock-red text-lg font-bold mb-2">Modelo</h3>
            <div className="flex gap-6 text-lg">
                {["Masculino", "Feminino"].map((model) => (
                  <span 
                    key={model}
                    onClick={() => setSelectedModel(model)}
                    className={`cursor-pointer transition-colors font-medium border-b-2 ${
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
            <h3 className="text-rock-red text-lg font-bold mb-3">Tamanho</h3>
            <div className="flex gap-3 font-bold text-lg">
                {mockProduct.sizes.map(size => (
                    <span 
                      key={size} 
                      className={`w-12 h-12 flex items-center justify-center rounded cursor-pointer transition-all border-2 ${
                        selectedSize === size 
                          ? 'text-white border-rock-red bg-rock-red/20' 
                          : 'text-gray-500 border-transparent hover:text-white hover:bg-white/5'
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
            <h3 className="text-rock-red text-lg font-bold mb-3">Quantidade</h3>
            <div className="flex items-center gap-6 text-2xl font-bold">
                <button 
                  onClick={decreaseQty} 
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-rock-red text-white flex items-center justify-center transition-colors"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button 
                  onClick={increaseQty} 
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-rock-red text-white flex items-center justify-center transition-colors"
                >
                  +
                </button>
            </div>
          </div>

          {/* botão adicionar */}
          <button className="w-full bg-rock-red text-white font-bold text-lg py-4 rounded-xl hover:bg-red-700 hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-3 mt-4 cursor-pointer">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
             </svg>
             Adicionar ao carrinho
          </button>

        </div>
      </div>
    </section>
  );
}