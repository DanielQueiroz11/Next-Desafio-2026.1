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
        className={`cursor-pointer flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all duration-300 border-2 ${
          isPlaying
            ? "bg-rock-red border-white animate-pulse" //quando tá tocando
            : "bg-black/80 border-gray-500 hover:bg-rock-red hover:border-white" //quando tá mutado
        }`}
        aria-label="Tocar música de fundo"
      >
       {isPlaying ? (
          // ícone com ondas
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" opacity="0.5">
               <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" begin="0s"/>
            </path>

            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" opacity="0.5">
               <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" begin="0.3s"/>
            </path>
          </svg>
        ) : (

          // ícone mute
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
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
        <span className="absolute left-17 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none group-hover:opacity-100">
          Tocar música 🎸
        </span>
      )}

      {isPlaying && (
        <span className="absolute left-17 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none group-hover:opacity-100">
          Mutar
        </span>
      )}
    </div>
  );
}