"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react"; 
import Navbar from "@/components/navbar/navbar"; 
import Footer from "@/components/footer/footer";
import AudioPlayer from "../../components/pagina-inicial/audio-player"; 
import { AudioProvider, useAudio } from "./audio-context"; 

function GlobalPlayer() {
  const { isPlaying, toggleAudio } = useAudio();
  return <AudioPlayer isPlaying={isPlaying} onToggle={toggleAudio} isRadio={true} />;
}

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const hideLayout = pathname === "/login" || pathname === "/esqueceu-senha";

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  return (
    <AudioProvider>
      {!hideLayout && <Navbar />}
      {children}
      {isMounted && !hideLayout && <GlobalPlayer />}
      {!hideLayout && <Footer />}
    </AudioProvider>
  );
}