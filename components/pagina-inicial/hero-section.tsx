"use client";

import Image from "next/image";
import { useAudio } from "../../src/providers/audio-context";

export default function HeroSection() {
  const { toggleAudio } = useAudio();

  return (
    <section className="relative w-full min-h-[450px] flex flex-col items-center justify-center text-center overflow-hidden bg-rock-dark">
      
      {/* imagem de fundo */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/imagens/fundo LP.jpg"
          alt="Fundo Rock"
          fill
          className="object-cover object-[center_36%]"
          priority
        />
      </div>

      {/* textos */}
      <div className="relative z-10 px-4 max-w-4xl mx-auto">
        <h1 className="text-[33px] md:text-[53px] font-black mb-6 tracking-normal text-white drop-shadow-lg uppercase">
          Vista o <span onClick={toggleAudio} className="text-rock-red cursor-pointer hover:brightness-125 transition-all">som</span> que você <span className="text-rock-red">ama</span>
        </h1>
        <p className="text-gray-200 text-lg md:text-[21.5px] font-medium drop-shadow-md">
          As melhores camisetas, moletons e acessórios do rock e metal!🎸
        </p>
      </div>  
    </section>
  );
}