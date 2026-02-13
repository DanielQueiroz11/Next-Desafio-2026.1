import Image from "next/image";
import Link from "next/link";

export default function Destaques() {
  return (
    <section className="w-full max-w-[1300px] mx-auto px-4 py-16">
      <h2 className="text-[35px] font-bold text-center mb-12 text-white">
        Destaques
      </h2>

      <div className="flex items-center justify-center gap-4 md:gap-8">
        <button className="p-3 bg-white text-black rounded hover:bg-gray-200 transition hidden md:block">
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
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* produto 1 */}
          <div className="flex flex-col gap-3 group cursor-pointer">
            <div className="bg-white aspect-square w-full relative overflow-hidden rounded-sm">
              <Image
                src="/imagens/produto-1.jpg"
                alt="Camisa Linkin Park"
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-2">
              <h3 className="text-lg font-medium text-white">
                Camisa Linkin Park
              </h3>
              <p className="text-rock-red font-bold text-xl">R$64,99</p>
              <p className="text-xs text-gray-400">
                2x de <span className="text-rock-red font-medium">R$32,50</span> sem juros
              </p>
            </div>
          </div>

          {/* produto 2 */}
          <div className="flex flex-col gap-3 group cursor-pointer">
            <div className="bg-white aspect-square w-full relative overflow-hidden rounded-sm">
              <Image
                src="/imagens/produto-2.jpg"
                alt="Moletom Metallica"
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-2">
              <h3 className="text-lg font-medium text-white">
                Moletom Metallica
              </h3>
              <p className="text-rock-red font-bold text-xl">R$139,99</p>
              <p className="text-xs text-gray-400">
                3x de <span className="text-rock-red font-medium">R$46,67</span> sem juros
              </p>
            </div>
          </div>

          {/* produto 3 */}
          <div className="flex flex-col gap-3 group cursor-pointer">
            <div className="bg-white aspect-square w-full relative overflow-hidden rounded-sm">
              <Image
                src="/imagens/produto-3.jpg"
                alt="Colar Guns N' Roses"
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-2">
              <h3 className="text-lg font-medium text-white">
                Colar Guns N&apos; Roses
              </h3>
              <p className="text-rock-red font-bold text-xl">R$29,99</p>
              <p className="text-xs text-gray-400">
                2x de <span className="text-rock-red font-medium">R$15,00</span> sem juros
              </p>
            </div>
          </div>
        </div>

        <button className="p-3 bg-white text-black rounded hover:bg-gray-200 transition hidden md:block">
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
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center mt-12">
        <Link
          href="/produtos"
          className="bg-rock-red hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition-colors text-lg"
        >
          Explorar produtos
        </Link>
      </div>
    </section>
  );
}