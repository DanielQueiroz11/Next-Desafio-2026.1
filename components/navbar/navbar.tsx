"use client";

import { useState } from "react";
import Link from "next/link";
import AudioPlayer from "@/components/audio-player/audio-player";
import { useAudio } from "@/src/providers/audio-context";
import { useCart } from "@/src/providers/cart-context";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { isPlaying, toggleAudio } = useAudio();
  
  const { cartCount } = useCart();

  return (
    <nav className="relative w-full h-20 bg-rock-dark flex items-center justify-between px-6 md:px-8 border-b border-white/10 z-50">
      
      {/* menu hambúrguer (mobile e tablet) */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-white lg:hidden hover:text-rock-red transition-colors"
      >
        {isMenuOpen ? (
           <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
           </svg>
        ) : (
           <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-list w-9 h-9" fill="currentColor" viewBox="0 0 16 16">
             <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
           </svg>
        )}
      </button>

      {/* centro: player + logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:transform-none lg:translate-x-0 lg:translate-y-0 flex items-center">
        
        {/* logo */}
        <Link 
          href="/" 
          className="relative flex flex-col md:flex-row items-center gap-0.5 md:gap-2 text-[20px] md:text-[22px] lg:text-[28px] min-[1920px]:text-[34px] font-black tracking-wider uppercase cursor-pointer transition-all duration-300 will-change-transform hover:scale-103 leading-none md:leading-normal"
        >
          <div className="hidden md:flex lg:hidden absolute top-1/2 -translate-y-1/2 -left-16 items-center">
            <AudioPlayer isPlaying={isPlaying} onToggle={toggleAudio} isRadio={true} />
          </div>

          <span className="text-white">Caverna</span>
          <span className="text-white">
            do <span className="text-rock-red">Rock</span>
          </span>
        </Link>
      </div>

      {/* área direita - campos + carrinho */}
      <div className="flex items-center gap-6 md:gap-4 lg:gap-8 min-[1920px]:gap-12 font-medium">
        
        {/* links (apenas desktop) */}
        <div className="hidden lg:flex items-center gap-3 lg:gap-8 min-[1920px]:gap-12">
            
            {/* player de áudio :) (não é visível no mobile) */}
            <AudioPlayer isPlaying={isPlaying} onToggle={toggleAudio} isRadio={true} />

            <Link href="/" className="bg-rock-red text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full hover:bg-red-700 transition-colors font-bold text-sm lg:text-[17px] min-[1920px]:text-[20px] min-[1920px]:px-6 min-[1920px]:py-2.5">
              Home
            </Link>
            <Link href="/contato" className="text-white hover:text-rock-red transition-colors text-sm lg:text-[16px] min-[1920px]:text-[18px]">
              Contato
            </Link>
            <Link href="/produtos" className="text-white hover:text-rock-red transition-colors text-sm lg:text-[16px] min-[1920px]:text-[18px]">
              Produtos
            </Link>
             <Link href="/login" className="text-white hover:text-rock-red transition-colors text-sm lg:text-[16px] min-[1920px]:text-[18px]">
              Login
            </Link>
            <Link href="/gerenciamento" className="text-white hover:text-rock-red transition-colors text-sm lg:text-[16px] min-[1920px]:text-[18px]">
              Gerenciamento
            </Link>
        </div>

        {/* carrinho */}
        <Link 
          href="/carrinho"
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

      {/* menu mobile e tablet */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-rock-dark border-b border-white/10 lg:hidden flex flex-col items-center py-2 shadow-xl animate-in slide-in-from-top-5 duration-200">
          <Link 
            href="/" 
           className="w-full text-center py-3 text-rock-red font-bold text-lg hover:bg-white/5 hover:text-rock-red transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/contato" 
            className="w-full text-center py-3 text-white font-bold text-lg hover:bg-white/5 hover:text-rock-red transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contato
          </Link>
          <Link 
            href="/produtos" 
            className="w-full text-center py-3 text-white font-bold text-lg hover:bg-white/5 hover:text-rock-red transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Produtos
          </Link>
           <Link 
            href="/login" 
            className="w-full text-center py-3 text-white font-bold text-lg hover:bg-white/5 hover:text-rock-red transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
          <Link 
            href="/gerenciamento" 
            className="w-full text-center py-3 text-white font-bold text-lg hover:bg-white/5 hover:text-rock-red transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Gerenciamento
          </Link>
        </div>
      )}
    </nav>
  );
}