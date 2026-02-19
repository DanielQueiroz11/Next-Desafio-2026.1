import Image from "next/image";
import Link from "next/link";

export default function PaginaLogin() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-rock-dark overflow-hidden px-4">
      

      <div className="absolute inset-0 z-0">
        <Image
          src="/imagens/fundo-login.jpg" 
          alt="Fundo Rock Bands"
          fill
          className="object-cover opacity-40 object-[center_bottom]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/90"></div>
      </div>

      {/* card login */}
      <div className="relative z-10 w-full max-w-[450px] bg-black/70 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-2xl border border-white/10">
        
        {/* título */}
        <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-8 tracking-wide">
          Entrar
        </h2>

        {/* formulário */}
        <form className="flex flex-col gap-5">
          
        {/* campos */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-white font-bold ml-1 text-[18px]">
              Nome
            </label>
            <input
              type="text"
              id="name"
              placeholder="Seu nome e sobrenome"
              className="w-full bg-zinc-900/80 text-gray-200 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rock-red transition-all border border-white/5"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white font-bold ml-1 text-[18px]">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="seuemail@gmail.com"
              className="w-full bg-zinc-900/80 text-gray-200 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rock-red transition-all border border-white/5"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-white font-bold ml-1 text-[18px]">
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="**********"
              className="w-full bg-zinc-900/80 text-gray-200 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rock-red transition-all border border-white/5"
            />
          </div>

          {/* botão login */}
          <button
            type="submit"
            className="mt-4 w-full bg-rock-red hover:bg-red-700 text-white font-black text-lg py-3 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-rock-red/20 cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* botão voltar para home */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="group flex items-center gap-2 bg-white text-rock-red font-bold px-6 py-2 rounded-full transition-all hover:bg-gray-100 hover:shadow-md active:scale-95"
          >
            {/* ícone seta */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:-translate-x-1"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Voltar para Home
          </Link>
        </div>

      </div>
    </main>
  );
}