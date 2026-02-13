import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full h-20 bg-rock-dark flex items-center justify-between px-8 border-b border-white/10">
      <div className="text-2xl font-black tracking-tighter uppercase">
        <span className="text-white">Caverna do </span>
        <span className="text-rock-red">Rock</span>
      </div>

      <div className="flex items-center gap-8 font-medium">
        <Link
          href="/"
          className="bg-rock-red text-white px-5 py-2 rounded-full hover:bg-red-700 transition-colors font-bold"
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

        <button className="text-white hover:text-rock-red transition-colors">
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
            className="w-8 h-8"
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
