"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/navbar"; 
import Footer from "@/components/footer/footer";
import { AudioProvider } from "./audio-context"; 
import { CartProvider } from "./cart-context"; 

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  {/* esconder as "páginas" :) */ }
  const hideNavbar = 
    pathname === "/login" || 
    pathname === "/esqueceu-senha" || 
    pathname === "/gerenciamento" || 
    pathname === "/cadastro";
  
  const hideFooter = 
    pathname === "/login" || 
    pathname === "/esqueceu-senha" || 
    pathname === "/cadastro";

  return (
    <AudioProvider>
      <CartProvider>
        {!hideNavbar && <Navbar />}
        {children}
        {!hideFooter && <Footer />}
      </CartProvider>
    </AudioProvider>
  );
}