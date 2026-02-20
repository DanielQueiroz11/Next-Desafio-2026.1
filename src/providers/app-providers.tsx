"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/navbar"; 
import Footer from "@/components/footer/footer";
import { AudioProvider } from "./audio-context"; 

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
      {!hideNavbar && <Navbar />}
      {children}
      {!hideFooter && <Footer />}
    </AudioProvider>
  );
}