"use client";

import { useRef, useEffect } from "react";

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  isRadio?: boolean;
}

export default function AudioPlayer({ isPlaying, onToggle, isRadio = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const MP3_URL = "/audios/led-zep.mp3";
  const RADIO_URL = "https://s2-webradio.antenne.de/heavy-metal";

  // funciona apenas para PC e androids, o iOS ignora isso, rs
  const MAX_VOLUME = 0.3; 

  useEffect(() => {
    if (audioRef.current) {
      if (!isRadio) {
        const savedTime = sessionStorage.getItem("musicTime");
        if (savedTime) {
          audioRef.current.currentTime = parseFloat(savedTime);
        }
      }
    }
  }, [isRadio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    if (isPlaying) {
      // fade-in
      audio.volume = 0; 
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            fadeIntervalRef.current = setInterval(() => {
              if (audio.volume < MAX_VOLUME - 0.05) {
                audio.volume = Math.min(MAX_VOLUME, audio.volume + 0.05);
              } else {
                audio.volume = MAX_VOLUME; 
                if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
              }
            }, 500); //pra começar
          })
          .catch((e) => console.log("Erro/Autoplay:", e));
      }
    } else {
      // fade-out
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.05);
        } else {
          audio.volume = 0;
          audio.pause(); 
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        }
      }, 30); //pra pausar
    }

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current && !isRadio) {
      sessionStorage.setItem("musicTime", audioRef.current.currentTime.toString());
    }
  };

  return (
    <div className="relative flex items-center justify-center group z-20">
      <audio
        ref={audioRef}
        src={isRadio ? RADIO_URL : MP3_URL} 
        loop={!isRadio} 
        onTimeUpdate={!isRadio ? handleTimeUpdate : undefined} 
      />

      <button
        onClick={onToggle}
        className={`cursor-pointer flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 border-2 ${
          isPlaying
            ? "bg-rock-red border-white animate-pulse" 
            : "bg-black/80 border-gray-500 hover:bg-rock-red hover:border-white"
        }`}
        aria-label={isRadio ? "Tocar rádio" : "Tocar música"}
      >
        {isPlaying ? (
          // ícone som ligado 
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
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
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>
      
      {/* tooltips */}
      {!isPlaying && (
        <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none group-hover:opacity-100">
          {isRadio ? "Ouvir rádio 📻" : "Tocar música 🎸"}
        </span>
      )}

      {isPlaying && (
        <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none group-hover:opacity-100">
          {isRadio ? "Parar rádio" : "Mutar"}
        </span>
      )}
    </div>
  );
}