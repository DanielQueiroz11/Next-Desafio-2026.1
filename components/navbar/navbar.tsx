"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AudioPlayer from "@/components/audio-player/audio-player";
import { useAudio } from "@/src/providers/audio-context";
import { useCart } from "@/src/providers/cart-context";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isPlaying, toggleAudio } = useAudio();
  const { cartCount } = useCart();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <nav className="relative w-full h-20 bg-rock-dark flex items-center justify-between px-6 md:px-8 border-b border-white/10 z-50">
      {/* menu hambúrguer (mobile e tablet) */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-white lg:hidden hover:text-rock-red transition-colors z-50 relative"
      >
        {isMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-9 h-9"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="bi bi-list w-9 h-9"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        )}
      </button>

      {/* centro: logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:transform-none lg:translate-x-0 lg:translate-y-0 flex items-center z-50">
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="relative flex flex-col md:flex-row items-center gap-0.5 md:gap-2 text-[22px] md:text-[26px] lg:text-[28px] min-[1920px]:text-[34px] font-black tracking-wider uppercase cursor-pointer transition-all duration-300 will-change-transform hover:scale-103 leading-none md:leading-normal"
        >
          <span className="text-white">Caverna</span>
          <span className="text-white">
            do <span className="text-rock-red">Rock</span>
          </span>
        </Link>
      </div>

      {/* área direita - campos + carrinho */}
      <div className="flex items-center gap-6 md:gap-4 lg:gap-8 min-[1920px]:gap-12 font-medium z-50 relative">
        {/* links (apenas desktop a partir de lg: 1024px) */}
        <div className="hidden lg:flex items-center gap-3 lg:gap-8 min-[1920px]:gap-12">
          <AudioPlayer
            isPlaying={isPlaying}
            onToggle={toggleAudio}
            isRadio={true}
          />

          <Link
            href="/"
            className="bg-rock-red text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full font-bold text-sm lg:text-[17px] min-[1920px]:text-[20px] min-[1920px]:px-6 min-[1920px]:py-2.5 transition-transform duration-300 hover:scale-[1.05] active:scale-95 will-change-transform"
          >
            Home
          </Link>
          <Link
            href="/contato"
            className="text-white hover:text-rock-red transition-colors text-sm lg:text-[16px] min-[1920px]:text-[18px]"
          >
            Contato
          </Link>
          <Link
            href="/produtos"
            className="text-white hover:text-rock-red transition-colors text-sm lg:text-[16px] min-[1920px]:text-[18px]"
          >
            Produtos
          </Link>
          <Link
            href="/login"
            className="text-white hover:text-rock-red transition-colors text-sm lg:text-[16px] min-[1920px]:text-[18px]"
          >
            Login
          </Link>
          <Link
            href="/gerenciamento"
            className="text-white hover:text-rock-red transition-colors text-sm lg:text-[16px] min-[1920px]:text-[18px]"
          >
            Gerenciamento
          </Link>
        </div>

        {/* carrinho */}
        <Link
          href="/carrinho"
          onClick={() => setIsMenuOpen(false)}
          className="relative text-white hover:text-rock-red transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 md:w-8 md:h-8 lg:w-8 lg:h-8 min-[1920px]:w-10 min-[1920px]:h-10"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>

          {/* quantidade no carrinho */}
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-rock-red text-white text-[10px] md:text-[12px] lg:text-[13px] min-[1920px]:text-[15px] font-bold w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 min-[1920px]:w-6 min-[1920px]:h-6 rounded-full flex items-center justify-center border border-rock-dark">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full h-[calc(100vh-80px)] bg-[#0d0d0d]/98 backdrop-blur-md border-t border-white/10 lg:hidden flex flex-col items-center pt-8 pb-12 px-6 shadow-2xl animate-in slide-in-from-top-2 duration-300 z-40 overflow-y-auto">
          {/* links em formato de lista */}
          <div className="flex flex-col w-full max-w-sm gap-2">
            <Link
              href="/"
              className="w-full text-center py-4 text-white font-bold text-xl border-b border-white/5 hover:text-rock-red hover:bg-white/5 transition-all rounded-t-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/contato"
              className="w-full text-center py-4 text-white font-bold text-xl border-b border-white/5 hover:text-rock-red hover:bg-white/5 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            <Link
              href="/produtos"
              className="w-full text-center py-4 text-white font-bold text-xl border-b border-white/5 hover:text-rock-red hover:bg-white/5 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Produtos
            </Link>
            <Link
              href="/login"
              className="w-full text-center py-4 text-white font-bold text-xl border-b border-white/5 hover:text-rock-red hover:bg-white/5 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/gerenciamento"
              className="w-full text-center py-4 text-white font-bold text-xl border-b border-white/5 hover:text-rock-red hover:bg-white/5 transition-all rounded-b-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Gerenciamento
            </Link>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <span className="text-gray-500 text-[13px] font-bold uppercase tracking-[0.15em]">
              Rádio da Caverna
            </span>
            <div className="flex flex-col items-center gap-2">
              <AudioPlayer
                isPlaying={isPlaying}
                onToggle={toggleAudio}
                isRadio={true}
              />
              <span className="text-gray-500/70 text-[11px] font-medium tracking-wide">
                {isPlaying ? "Toque para pausar" : "Toque para ouvir"}
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
