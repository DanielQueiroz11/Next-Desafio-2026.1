"use client";

import { usePathname } from "next/navigation";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  return (
    <>
      {/* mostra navbar quando não é login page */}
      {!isLoginPage && <Navbar />}
      
      {children}
      
      {/* mostra footer quando não é login page */}
      {!isLoginPage && <Footer />}
    </>
  );
}