"use client";

export default function PaginaGerenciamento() {
  return (
    // container principal:
    <main className="flex min-h-screen bg-rock-dark">
      
      <aside className="hidden md:flex flex-col w-[250px] bg-white min-h-screen">
        <div className="p-8 text-center text-gray-500 border-b border-gray-200">
        </div>
      </aside>

      {/* área da direita (topbar + conteúdo) */}
      <section className="flex-1 flex flex-col min-w-0">
        
        {/* topbar */}
        <header className="relative w-full h-24 bg-[#2A2A2A] flex items-center justify-center px-8 shadow-md">
          
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

        {/* área conteúdo (cards) */}
        <div className="p-8 flex-1">
        </div>

      </section>
      
    </main>
  );
}