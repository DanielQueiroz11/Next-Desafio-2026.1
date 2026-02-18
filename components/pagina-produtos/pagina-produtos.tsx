import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Camisa Linkin Park",
    description: "Tecido 100% algodão: macia, leve e confortável para o dia a dia.",
    price: "R$64,99",
    installment: "2x de R$32,50 sem juros",
    image: "/imagens/produto-1.jpg",
  },
  {
    id: 2,
    name: "Moletom Metallica",
    description: "Modelo unissex com toque macio e elegante, perfeito para dias frios.",
    price: "R$139,99",
    installment: "3x de R$46,67 sem juros",
    image: "/imagens/produto-2.jpg",
  },
  {
    id: 3,
    name: "Colar Guns N' Roses",
    description: "Colar temático do Guns N' Roses com pingente estilizado de caveira.",
    price: "R$29,99",
    installment: "2x de R$15,00 sem juros",
    image: "/imagens/produto-3.jpg",
  },
  {
    id: 4,
    name: "Camiseta Iron Maiden",
    description: "Estampa exclusiva The Trooper com alta durabilidade e cores vivas.",
    price: "R$69,90",
    installment: "2x de R$34,95 sem juros",
    image: "/imagens/produto-4.jpg",
  },
  {
    id: 5,
    name: "Caneca Rock N'Roll",
    description: "Caneca com estampa temática de rock, design moderno e altamente resistente.",
    price: "R$39,90",
    installment: "2x de R$19,95 sem juros",
    image: "/imagens/produto-5.jpg",
  },
  {
    id: 6,
    name: "Moletom Red Hot Chili Peppers",
    description: "Moletom com estampa da logo da banda, muito confortável e versátil.",
    price: "R$149,99",
    installment: "3x de R$50,00 sem juros",
    image: "/imagens/produto-6.jpg",
  },
];

export default function PaginaProdutos() {
  return (
    <section className="w-full min-h-screen bg-rock-dark py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* barra de pesquisa aqui pro futuro!! */}

        {/* grid de produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full max-w-[380px] bg-[#121212] border border-white/5 rounded-lg overflow-hidden hover:border-rock-red/50 transition-all duration-300 shadow-lg hover:shadow-rock-red/10"
            >
              <div className="group relative w-full h-[320px] bg-white flex items-center justify-center overflow-hidden cursor-pointer">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* conteúdo do card */}
              <div className="p-6 flex flex-col h-auto">
                <h3 className="text-white text-xl font-bold mb-2 cursor-pointer hover:text-rock-red transition-colors">
                  {product.name}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
                  {product.description}
                </p>

                <div className="mt-auto">
                  <span className="block text-rock-red text-2xl font-extrabold mb-1">
                    {product.price}
                  </span>

                  <span className="block text-gray-400 text-sm mb-6">
                    {product.installment
                      .split(/(R\$\d+,\d+)/)
                      .map((part, index) => (
                        <span
                          key={index}
                          className={
                            part.startsWith("R$")
                              ? "text-rock-red font-bold"
                              : ""
                          }
                        >
                          {part}
                        </span>
                      ))}
                  </span>

                  <button className="w-full bg-rock-red text-white font-bold py-3 rounded-full hover:bg-red-700 hover:scale-[1.03] active:scale-95 transition-all shadow-md cursor-pointer">
                    Ver mais
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}