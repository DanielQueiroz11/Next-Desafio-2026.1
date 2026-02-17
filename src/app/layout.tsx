import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
      <body
        className={`${inter.variable} ${inter.className} bg-rock-dark text-white antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}