import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { CONFIG } from "../../config";

export default function MusicButton() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playMusic = async () => {
    if (!audioRef.current) return;

    try {
      audioRef.current.volume = 0.45;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await playMusic();
      }
    } catch {
      alert("Tambahkan file music.mp3 di folder public/assets terlebih dahulu.");
    }
  };

  useEffect(() => {
    playMusic();

    const startAfterInteraction = () => {
      playMusic();
      window.removeEventListener("click", startAfterInteraction);
      window.removeEventListener("touchstart", startAfterInteraction);
      window.removeEventListener("keydown", startAfterInteraction);
    };

    window.addEventListener("click", startAfterInteraction);
    window.addEventListener("touchstart", startAfterInteraction);
    window.addEventListener("keydown", startAfterInteraction);

    return () => {
      window.removeEventListener("click", startAfterInteraction);
      window.removeEventListener("touchstart", startAfterInteraction);
      window.removeEventListener("keydown", startAfterInteraction);
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={CONFIG.musicUrl}
      />

      <button
        type="button"
        onClick={toggleMusic}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-roseLove text-white shadow-lg shadow-rose-300 transition hover:-translate-y-1 hover:bg-deepRose sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
        aria-label="Toggle music"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <Music className="h-5 w-5 sm:h-6 sm:w-6" />
        )}
      </button>
    </>
  );
}