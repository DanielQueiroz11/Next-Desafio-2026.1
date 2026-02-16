"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const produtos = [
  {
    id: 1,
    nome: "Camisa Linkin Park",
    preco: "R$64,99",
    parcelamento: "2x de R$32,50",
    imagem: "/imagens/produto-1.jpg",
  },
  {
    id: 2,
    nome: "Moletom Metallica",
    preco: "R$159,99",
    parcelamento: "3x de R$53,33",
    imagem: "/imagens/produto-2.jpg",
  },
  {
    id: 3,
    nome: "Colar Guns N' Roses",
    preco: "R$29,99",
    parcelamento: "2x de R$15,00",
    imagem: "/imagens/produto-3.jpg",
  },
  {
    id: 4,
    nome: "Camisa Iron Maiden",
    preco: "R$69,90",
    parcelamento: "2x de R$34,95",
    imagem: "/imagens/produto-4.jpg",
  },
  {
    id: 5,
    nome: "Caneca Rock N' Roll",
    preco: "R$39,90",
    parcelamento: "2x de R$19,95",
    imagem: "/imagens/produto-5.jpg",
  },
  {
    id: 6,
    nome: "Moletom Red Hot Chili Peppers",
    preco: "R$149,99",
    parcelamento: "3x de R$50,00",
    imagem: "/imagens/produto-6.jpg",
  },
];

export default function Destaques() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerPage = isMobile ? 1 : 3;
  const maxIndex = produtos.length - itemsPerPage;

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
    if (isMobile) {
      const interval = setInterval(() => {
        nextSlide();
      }, 2000); {/* 2 segundos */}
      return () => clearInterval(interval);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, maxIndex]);

  return (
    <section className="w-full max-w-[1300px] mx-auto px-4 py-16 overflow-hidden">
      <div className="flex items-center justify-center gap-4 mb-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#E11D48"
          stroke="#E11D48"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 md:w-8 md:h-8"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>

        <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide text-white">
          Destaques
        </h2>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#E11D48"
          stroke="#E11D48"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 md:w-8 md:h-8"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      </div>
      <div className="relative w-full md:px-12">
        
        {/* seta esquerda */}
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
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (isMobile ? 100 : 33.333333)}%)`,
            }}
          >
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="basis-full md:basis-1/3 flex-shrink-0 px-2 box-border"
              >
                <div
                  className="flex flex-col h-auto md:h-full w-full bg-zinc-900 rounded-xl overflow-hidden shadow-lg 
                  p-1
                  hover:-translate-y-2 hover:shadow-2xl 
                  transition-all duration-300 transform-gpu will-change-transform group cursor-pointer"
                >
                  <div className="bg-white aspect-square w-full relative overflow-hidden rounded-t-lg md:rounded-t-xl">
                    <Image
                      src={produto.imagem}
                      alt={produto.nome}
                      fill
                      className="object-contain p-2 md:p-4 transition-transform duration-300"
                    />
                  </div>

                  <div className="px-2 pt-2 pb-2 md:px-3 md:pt-3 md:pb-1 flex flex-col gap-0 md:gap-1 antialiased">
                    <h3 className="text-[16px] md:text-[21px] font-bold text-white truncate leading-tight mb-2.5 md:mb-0.5">
                      {produto.nome}
                    </h3>

                    <div className="mt-1 md:mt-3">
                      <p className="text-rock-red font-extrabold text-lg md:text-[22px] leading-none mb-0.5 md:mb-1">
                        {produto.preco}
                      </p>
                      <p className="text-[10px] md:text-[13px] text-gray-400 font-medium">
                        {produto.parcelamento.split(" R$")[0]}{" "}
                        <span className="text-rock-red font-bold">
                          R${produto.parcelamento.split(" R$")[1]}
                        </span>{" "}
                        sem juros
                      </p>
                    </div>

                    <div className="hidden md:block w-full h-1 bg-rock-red mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* seta direita */}
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

      {/* labels */}
      <div className="flex md:hidden justify-center items-center gap-2 mt-6">
        {produtos.map((_, index) => (
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

      <div className="flex justify-center mt-12">
        <Link
          href="/produtos"
          className="bg-rock-red hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 text-[22px]"
        >
          Explorar produtos
        </Link>
      </div>
    </section>
  );
}