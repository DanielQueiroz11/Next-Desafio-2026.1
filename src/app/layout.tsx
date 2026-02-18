import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import AppProvider from "../providers/app-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Caverna do Rock",
  description: "Site de vendas de roupas e acessórios de rock e metal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-rock-dark`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}