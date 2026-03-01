import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import AppProvider from "../providers/app-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Caverna do Rock",
  description: "Site de vendas de roupas e acessórios de rock e metal.",
};

// componente raiz (server component)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // tag html principal 
    <html lang="pt-br">
      <body className={`${inter.className} bg-rock-dark`}>
        {/* isolamento dos provedores de estado (client) protegendo a renderização no servidor */}
        <AppProvider>
          {/* área onde as páginas específicas (page.tsx) serão renderizadas dinamicamente */}
          {children}
        </AppProvider>
      </body>
    </html>
  );
}