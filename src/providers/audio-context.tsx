"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
}

const AudioContext = createContext({} as AudioContextType);

export function AudioProvider({ children }: { children: ReactNode }) {
  // estado local para controlar se a música está tocando ou pausada
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // busca no session storage do navegador se a música já estava tocando antes de atualizar a página
    const savedState = sessionStorage.getItem("musicStatus");
    if (savedState === "playing") {
      setIsPlaying(true);
    }
  }, []);

  // função que inverte o estado atual da música e salva a preferência no navegador
  const toggleAudio = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    sessionStorage.setItem("musicStatus", newState ? "playing" : "paused");
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

// hook para facilitar a importação e o uso do contexto em outras páginas do site
export const useAudio = () => useContext(AudioContext);