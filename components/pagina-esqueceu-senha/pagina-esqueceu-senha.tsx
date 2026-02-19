"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PaginaEsqueceuSenha() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-rock-dark overflow-hidden px-4">
      {/* imagem fundo (mesma do login) */}
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

      {/* card principal */}
      <div className="relative z-10 w-full max-w-[450px] bg-black/70 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-2xl border border-white/10 text-center">
        
        {!isSubmitted ? (
          // formulário
          <div className="animate-in fade-in zoom-in duration-500">
            {/* ícone cadeado*/}
            <div className="flex justify-center mb-6 text-rock-red">
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            
            <h2 className="text-3xl font-black text-white mb-3 tracking-wide">
              Recuperar Senha
            </h2>
            
            <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed">
              Até as lendas do rock esquecem a letra às vezes. 🎸<br />
              Digite seu e-mail abaixo e enviaremos um código de recuperação.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-white font-bold ml-1 text-[16px]">
                  E-mail cadastrado
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="seuemail@gmail.com"
                  className="w-full bg-zinc-900/80 text-gray-200 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rock-red transition-all border border-white/5"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full bg-rock-red hover:bg-red-700 text-white font-extrabold text-lg py-3 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-rock-red/20 cursor-pointer"
              >
                Enviar Código
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6 animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500">
            {/* ícone sucesso*/}
            <div className="flex justify-center mb-6 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            
            <h2 className="text-2xl font-black text-white mb-4">
              Código Enviado! 🤘
            </h2>
            
            <p className="text-gray-400 mb-6 text-sm md:text-base leading-relaxed">
              As instruções de recuperação foram enviadas para o e-mail:<br/>
              <strong className="text-white mt-2 block break-all">{email}</strong>
            </p>

            <p className="text-[12.5px] text-gray-500 mb-6">
              Não esqueça de verificar a caixa de spam ou lixo eletrônico!
            </p>
          </div>
        )}

        {/* botão para voltar*/}
        <div className="mt-8 flex justify-center">
          <Link
            href="/login"
            className="group flex items-center gap-2 text-gray-400 hover:text-white font-regular underline transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:-translate-x-1"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Voltar para o Login
          </Link>
        </div>

      </div>
    </main>
  );
}