import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full h-20 bg-rock-dark flex items-center justify-between px-4 md:px-8 border-b border-white/10">
      
      {/* botão hambúrguer para mobile */}
      <button className="text-white md:hidden hover:text-rock-red transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>
      </button>

      {/* logo (CDR)*/}
      <Link href="/" className="text-[24px] md:text-[28px] font-black tracking-wider uppercase cursor-pointer transition-all duration-100 hover:scale-103">
        <span className="text-white">Caverna do </span>
        <span className="text-rock-red">Rock</span>
      </Link>

      {/* parte direita (links + carrinho) */}
      <div className="flex items-center gap-8 font-medium">
        <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="bg-rock-red text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors font-bold"
            >
              Home
            </Link>
            <Link
              href="/contato"
              className="text-white hover:text-rock-red transition-colors"
            >
              Contato
            </Link>
            <Link
              href="/produtos"
              className="text-white hover:text-rock-red transition-colors"
            >
              Produtos
            </Link>
            <Link
              href="/gerenciamento"
              className="text-white hover:text-rock-red transition-colors"
            >
              Gerenciamento
            </Link>
            <Link
              href="/login"
              className="text-white hover:text-rock-red transition-colors"
            >
              Login
            </Link>
        </div>

        <button className="text-white hover:text-rock-red transition-colors cursor-pointer">
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
            className="w-6 h-6 md:w-8 md:h-8" 
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        </button>
      </div>
    </nav>
  );
}