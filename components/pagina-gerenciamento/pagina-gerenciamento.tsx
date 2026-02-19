"use client";

import Link from "next/link";
import Image from "next/image"; 

export default function PaginaGerenciamento() {
  return (
    <main className="flex min-h-screen bg-rock-dark">
      
      {/* sidebar */}
      <aside className="hidden md:flex flex-col w-[250px] bg-rock-dark min-h-screen shadow-2xl z-10">
        
        {/* logo */}
        <div className="pt-8 pb-6 flex justify-center px-4">
          <Link 
            href="/" 
            className="relative w-full max-w-[200px] h-[89px] hover:scale-105 transition-transform cursor-pointer block"
          >
            <Image
              src="/imagens/logo-footer.jpg" 
              alt="Logo Caverna do Rock"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* título */}
        <div className="px-8 pb-3">
          <h2 className="text-white font-extrabold text-[18px]">Admin</h2>
        </div>

        {/* linha preta */}
        <div className="w-full h-[2px] bg-rock-red mb-8"></div>

        {/* links */}
        <nav className="flex flex-col px-8 gap-6">
          <Link 
            href="/" 
            className="text-white font-bold text-[16px] hover:text-rock-red transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/gerenciamento" 
            className="text-white font-bold text-[16px] hover:text-rock-red transition-colors"
          >
            Gerenciar Produtos
          </Link>
          
          {/* Logout*/}
          <Link 
            href="/login" 
            className="text-white font-bold text-[16px] hover:text-rock-red transition-colors"
          >
            Logout
          </Link>
        </nav>
      </aside>

      {/* parte da direita */}
      <section className="flex-1 flex flex-col min-w-0">
        
        {/* topbar */}
        <header className="relative w-full h-24 bg-[#2A2A2A] flex items-center justify-center px-8 shadow-md z-0">
          
          {/* título */}
          <h1 className="text-white text-2xl md:text-[28px] font-black tracking-wider uppercase">
            Gerenciamento de Produtos
          </h1>

          {/* botão adicionar */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2">
            <button className="bg-rock-red hover:bg-red-700 text-white font-medium px-6 py-2.5 rounded-md transition-colors shadow-lg cursor-pointer">
              Adicionar produto
            </button>
          </div>
          
        </header>

        {/* área do conteúdo */}
        <div className="p-8 flex-1 bg-white">
        </div>

      </section>
      
    </main>
  );
}