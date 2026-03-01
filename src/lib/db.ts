import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

// cria uma referência no objeto global  para armazenar a instância do prisma
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

// verifica se já existe uma conexão rodando no escopo global
const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

// se o ambiente não for de produção, salva a conexão no global para reaproveitamento
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma