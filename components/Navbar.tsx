"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative w-full h-20 bg-rock-dark flex items-center justify-between px-4 md:px-8 border-b border-white/10 z-50">
      
      {/* menu hambúrguer (mobile) */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-white md:hidden hover:text-rock-red transition-colors"
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

      {/* logo */}
      <Link 
        href="/" 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:transform-none md:translate-x-0 md:translate-y-0 flex flex-col md:flex-row items-center gap-0.5 md:gap-2 text-[20px] md:text-[28px] font-black tracking-wider uppercase cursor-pointer transition-all duration-100 hover:scale-103 leading-none md:leading-normal"
      >
        <span className="text-white">Caverna</span>
        <span className="text-white">
          do <span className="text-rock-red">Rock</span>
        </span>
      </Link>

      {/* área direita - campos + carrinho */}
      <div className="flex items-center gap-8 font-medium">
        
        {/* links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="bg-rock-red text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors font-bold">
              Home
            </Link>
            <Link href="/contato" className="text-white hover:text-rock-red transition-colors">
              Contato
            </Link>
            <Link href="/produtos" className="text-white hover:text-rock-red transition-colors">
              Produtos
            </Link>
            <Link href="/gerenciamento" className="text-white hover:text-rock-red transition-colors">
              Gerenciamento
            </Link>
            <Link href="/login" className="text-white hover:text-rock-red transition-colors">
              Login
            </Link>
        </div>

        {/* carrinho */}
        <button className="text-white hover:text-rock-red transition-colors cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 md:w-8 md:h-8" 
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        </button>
      </div>

      {/* menu mobile */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-rock-dark border-b border-white/10 md:hidden flex flex-col items-center py-2 shadow-xl animate-in slide-in-from-top-5 duration-200">
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
            href="/gerenciamento" 
            className="w-full text-center py-3 text-white font-bold text-lg hover:bg-white/5 hover:text-rock-red transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Gerenciamento
          </Link>
          <Link 
            href="/login" 
            className="w-full text-center py-3 text-white font-bold text-lg hover:bg-white/5 hover:text-rock-red transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}