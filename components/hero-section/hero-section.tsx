import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full py-20 md:py-32 flex flex-col items-center justify-center text-center overflow-hidden bg-rock-dark">
      <div className="absolute inset-0 z-0 opacity-30">
        <Image
          src="/imagens/fundo LP.jpg"
          alt="Fundo Rock"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white drop-shadow-lg">
          Vista o som que você ama
        </h1>
        <p className="text-gray-200 text-lg md:text-xl font-medium drop-shadow-md">
          As melhores camisetas, moletons e acessórios de rock e metal!
        </p>
      </div>
    </section>
  );
}
