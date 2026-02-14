import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[450px] flex flex-col items-center justify-center text-center overflow-hidden bg-rock-dark">
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/imagens/fundo LP.jpg"
          alt="Fundo Rock"
          fill
          className="object-cover object-[center_36%]"
          priority
        />
      </div>

      <div className="relative z-10 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-normal text-white drop-shadow-lg">
          Vista o som que você ama
        </h1>
        <p className="text-gray-200 text-lg md:text-[21px] font-medium drop-shadow-md">
          As melhores camisetas, moletons e acessórios do rock e metal!
        </p>
      </div>
    </section>
  );
}