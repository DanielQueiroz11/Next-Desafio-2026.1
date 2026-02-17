"use client";

import { useRef, useEffect } from "react";

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function AudioPlayer({ isPlaying, onToggle }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; 
      
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="hidden md:block absolute bottom-75 left-20 z-20 group">
      <audio
        ref={audioRef}
        loop
        src="/audios/led-zep.mp3" // https://s2-webradio.antenne.de/heavy-metal (rádio)
      />

      <button
        onClick={onToggle}
        className={`cursor-pointer flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 border-2 ${
          isPlaying
            ? "bg-rock-red border-white animate-pulse" //quando tá tocando
            : "bg-black/80 border-gray-500 hover:bg-rock-red hover:border-white" //quando tá mutado
        }`}
        aria-label="Tocar música de fundo"
      >
        {isPlaying ? (
          // ícone de som ligado 
          <div className="flex items-end gap-[2px] h-4">
            <span className="w-1 bg-white animate-[bounce_1s_infinite] h-2"></span>
            <span className="w-1 bg-white animate-[bounce_1.2s_infinite] h-4"></span>
            <span className="w-1 bg-white animate-[bounce_0.8s_infinite] h-3"></span>
          </div>
        ) : (

          // ícone mute
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-300"
          >
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>
      
      {/* tooltips */ }
      {!isPlaying && (
        <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none group-hover:opacity-100">
          Tocar música 🎸
        </span>
      )}

      {isPlaying && (
        <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none group-hover:opacity-100">
          Mutar
        </span>
      )}
    </div>
  );
}