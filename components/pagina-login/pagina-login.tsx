"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function PaginaLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); 
    router.push("/gerenciamento"); 
  };

  return (
    <main className="relative min-h-screen w-full flex items-start md:items-center justify-center bg-rock-dark overflow-hidden px-4 pt-12 md:pt-0">
      
      {/* imagem de fundo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/imagens/fundo-login.jpg"
          alt="Fundo Rock Bands"
          fill
          className="object-cover opacity-40 object-center md:object-[center_bottom]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/90"></div>
      </div>

      {/* card login */}
      <div className="relative z-10 w-full max-w-[450px] bg-black/70 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-2xl border border-white/10">
        
        {/* título */}
        <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-black text-center text-white mb-8 tracking-wide uppercase">
          Entrar
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          
          {/* campo nome */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-white font-bold ml-1 text-[16px] md:text-[18px]">
              Nome
            </label>
            <input
              type="text"
              id="name"
              placeholder="Seu nome e sobrenome"
              className="w-full bg-zinc-900/80 text-gray-200 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rock-red transition-all border border-white/5"
            />
          </div>

          {/* campo email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white font-bold ml-1 text-[16px] md:text-[18px]">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="seuemail@gmail.com"
              className="w-full bg-zinc-900/80 text-gray-200 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rock-red transition-all border border-white/5"
            />
          </div>

          {/* campo senha */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-white font-bold ml-1 text-[16px] md:text-[18px]">
              Senha
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="**********"
                className="w-full bg-zinc-900/80 text-gray-200 placeholder-gray-500 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-rock-red transition-all border border-white/5"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1 cursor-pointer focus:outline-none"
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* links rápidos */}
          <div className="flex justify-between items-center w-full px-1">
            <Link href="/esqueceu-senha" title="Recuperar senha"
              className="text-[13px] md:text-sm text-gray-400 hover:text-rock-red underline transition-colors">
              Esqueceu a senha?
            </Link>
            <Link href="/cadastro" title="Criar conta"
              className="text-[13px] md:text-sm text-gray-400 hover:text-rock-red underline transition-colors">
              Cadastre-se
            </Link>
          </div>

          {/* botão login */}
          <button
            type="submit"
            className="mt-2 w-full bg-rock-red hover:bg-red-700 text-white font-extrabold text-[18px] md:text-[20px] py-3.5 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-rock-red/20 cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* botão voltar para home */}
        <div className="mt-8 flex justify-center">
          <Link href="/"
            className="group flex items-center gap-2 bg-white text-rock-red font-bold px-6 py-2.5 rounded-full transition-all hover:bg-gray-100 hover:shadow-md active:scale-95 text-sm md:text-base">
            <svg className="transition-transform group-hover:-translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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