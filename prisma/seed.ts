import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // limpa os produtos antigos para evitar duplicação de dados
  await prisma.product.deleteMany();

  const products = [
    {
      title: "Camisa Linkin Park",
      description:
        "Tecido 100% algodão: macia, leve e confortável para o dia a dia.",
      price: 64.99,
      image: "/imagens/produto-1.jpg",
      createdAt: new Date(),
    },
    {
      title: "Moletom Metallica",
      description:
        "Modelo unissex com toque macio e elegante, perfeito para dias frios.",
      price: 139.99,
      image: "/imagens/produto-2.jpg",
      createdAt: new Date(),
    },
    {
      title: "Colar Guns N' Roses",
      description:
        "Colar temático do Guns N' Roses com pingente estilizado de caveira.",
      price: 29.99,
      image: "/imagens/produto-3.jpg",
      createdAt: new Date(),
    },
    {
      title: "Camiseta Iron Maiden",
      description:
        "Estampa exclusiva The Trooper com alta durabilidade e cores vivas.",
      price: 69.9,
      image: "/imagens/produto-4.jpg",
      createdAt: new Date(),
    },
    {
      title: "Caneca Rock N'Roll",
      description:
        "Caneca com estampa temática de rock, design moderno e altamente resistente.",
      price: 39.9,
      image: "/imagens/produto-5.jpg",
      createdAt: new Date(),
    },
    {
      title: "Moletom Red Hot Chili Peppers",
      description:
        "Moletom com estampa da logo da banda, muito confortável e versátil.",
      price: 149.99,
      image: "/imagens/produto-6.jpg",
      createdAt: new Date(),
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  // pra saber se deu certo!! --> mensagem de sucesso visível no terminal
  console.log("Banco de dados semeado com produtos de Rock com sucesso! 🤘");
}

// executa a função principal lidando com possíveis erros e encerrando a conexão ao final
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });