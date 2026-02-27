"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Produto = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string | null;
};

export default function Destaques({ produtos = [] }: { produtos: Produto[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const formatarPreco = (valor: number) => formatadorMoeda.format(valor);

  const renderParcelamento = (valor: number) => {
    let parcelas = Math.ceil(valor / 20);
    parcelas = Math.max(1, Math.min(6, parcelas));
    
    if (parcelas === 1) return <span>À vista</span>;
    
    const valorParcela = valor / parcelas;
    return (
      <>
        {parcelas}x de <span className="text-rock-red font-bold">{formatadorMoeda.format(valorParcela)}</span> sem juros
      </>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 6 no celular e 8 em telas maiores
  const displayProdutos = isMobile
    ? produtos.slice(0, 6)
    : produtos.slice(0, 8);

  const itemsPerPage = isMobile ? 1 : isTablet ? 2 : 3;
  const maxIndex = Math.max(0, displayProdutos.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= maxIndex) return 0;
      return prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) return maxIndex;
      return prevIndex - 1;
    });
  };

  useEffect(() => {
    if (isMobile && displayProdutos.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, 2000);
      return () => clearInterval(interval);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, maxIndex, displayProdutos.length]);

  const getTranslateX = () => {
    if (isMobile) return 100;
    if (isTablet) return 50;
    return 33.333333;
  };

  if (displayProdutos.length === 0) return null;

  return (
    <section className="w-full max-w-[1300px] mx-auto px-4 py-16 overflow-hidden">
      {/* título */}
      <div className="flex items-center justify-center gap-4 mb-12">
        {/* raio esquerdo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#E11D48"
          stroke="#E11D48"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>

        <h2 className="text-[30px] md:text-[34px] lg:text-[40px] xl:text-[42px] 2xl:text-[50px] font-extrabold uppercase tracking-wide text-white">
          Destaques
        </h2>

        {/* raio direito */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#E11D48"
          stroke="#E11D48"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      </div>

      <div className="relative w-full md:px-12 lg:px-16">
        {/* seta esquerda (aparece no tablet e no PC) */}
        <button
          onClick={prevSlide}
          className="absolute left-0 z-20 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-full hover:bg-gray-200 transition hidden md:flex items-center justify-center cursor-pointer shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className="overflow-hidden w-full py-4 -my-4">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * getTranslateX()}%)`,
            }}
          >
            {displayProdutos.map((produto) => (
              <div
                key={produto.id}
                className="w-full md:w-1/2 lg:w-1/3 flex-none px-2 box-border"
              >
                <Link
                  href={`/produtos-individuais/${produto.id}`}
                  className="block h-full"
                >
                  <div className="flex flex-col h-auto lg:h-full w-full bg-[#121212] rounded-xl overflow-hidden shadow-lg p-1 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 transform-gpu will-change-transform group cursor-pointer">
                    
                    <div className="bg-white aspect-square w-full relative overflow-hidden rounded-t-lg md:rounded-t-xl">
                      <Image
                        src={produto.image || "/imagens/produto-padrao.jpg"}
                        alt={produto.title}
                        fill
                        className="object-contain p-2 md:p-4 transition-transform duration-300"
                      />
                    </div>

                    <div className="px-2 pt-2 pb-2 md:px-3 md:pt-3 md:pb-1 flex flex-col gap-0 md:gap-1 antialiased">
                      <h3 className="text-[16px] md:text-[21px] font-bold text-white truncate leading-tight mb-2.5 md:mb-0.5">
                        {produto.title}
                      </h3>

                      {/* descrição */}
                      <p className="text-gray-400 text-[12px] md:text-[14px] leading-snug line-clamp-2 min-h-[34px] md:min-h-[40px] mb-2">
                        {produto.description}
                      </p>

                      <div className="mt-1 md:mt-3">
                        <p className="text-rock-red font-extrabold text-lg md:text-[22px] leading-none mb-0.5 md:mb-1">
                          {formatarPreco(produto.price)}
                        </p>
                        
                        <p className="text-[10px] md:text-[13px] text-gray-400 font-medium">
                          {renderParcelamento(produto.price)}
                        </p>
                      </div>

                      <div className="hidden lg:block w-full h-1 bg-rock-red mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>

                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* seta direita (aparece no tablet e PC) */}
        <button
          onClick={nextSlide}
          className="absolute right-0 z-20 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-full hover:bg-gray-200 transition hidden md:flex items-center justify-center cursor-pointer shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* labels (aparecem no celular e tablet) */}
      <div className="flex lg:hidden justify-center items-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentIndex === index
                ? "bg-rock-red"
                : "bg-zinc-600 hover:bg-zinc-500"
            }`}
            aria-label={`Ir para o slide ${index + 1}`}
          />
        ))}
      </div>

      {/* botão inferior */}
      <div className="flex justify-center mt-12">
        <Link
          href="/produtos"
          className="bg-rock-red hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 text-[20px] md:text-[21px] xl:text-[23px] 2xl:text-[26px]"
        >
          Explorar produtos
        </Link>
      </div>
    </section>
  );
}