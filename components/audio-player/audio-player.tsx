"use client";

import { useRef, useEffect } from "react";

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  isRadio?: boolean;
}

export default function AudioPlayer({ isPlaying, onToggle, isRadio = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const MP3_URL = "/audios/led-zep.mp3";
  const RADIO_URL = "https://s2-webradio.antenne.de/heavy-metal";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;

      if (!isRadio) {
        const savedTime = sessionStorage.getItem("musicTime");
        if (savedTime) {
          audioRef.current.currentTime = parseFloat(savedTime);
        }
      }
    }
  }, [isRadio]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((e) => console.log("Erro/Autoplay:", e));
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current && !isRadio) {
      sessionStorage.setItem("musicTime", audioRef.current.currentTime.toString());
    }
  };

  return (
    <div className="hidden md:block absolute bottom-120 left-5 z-20 group">
      <audio
        ref={audioRef}
        src={isRadio ? RADIO_URL : MP3_URL} 
        loop={!isRadio} 
        onTimeUpdate={!isRadio ? handleTimeUpdate : undefined} 
      />

      <button
        onClick={onToggle}
        className={`cursor-pointer flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 border-2 ${
          isPlaying
            ? "bg-rock-red border-white animate-pulse" 
            : "bg-black/80 border-gray-500 hover:bg-rock-red hover:border-white"
        }`}
        aria-label={isRadio ? "Tocar rádio" : "Tocar música"}
      >
        {isPlaying ? (
          // ícone som ligado
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
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
          // ícone mutar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
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
      
      {/* tooltips */}
      {!isPlaying && (
        <span className="absolute left-17 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none group-hover:opacity-100">
          {isRadio ? "Ouvir rádio ao vivo 📻" : "Tocar música 🎸"}
        </span>
      )}

      {isPlaying && (
        <span className="absolute left-17 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none group-hover:opacity-100">
          {isRadio ? "Parar rádio" : "Mutar"}
        </span>
      )}
    </div>
  );
}