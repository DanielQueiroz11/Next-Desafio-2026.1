"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
}

const AudioContext = createContext({} as AudioContextType);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const savedState = sessionStorage.getItem("musicStatus");
    if (savedState === "playing") {
      setIsPlaying(true);
    }
  }, []);

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

export const useAudio = () => useContext(AudioContext);