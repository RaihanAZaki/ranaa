import { useState } from "react";
import { Gift, Heart, Play, X } from "lucide-react";
import ConfettiHearts from "../effects/ConfettiHearts";
import MagicParticles from "../effects/MagicParticles";

const YOUTUBE_URL =
  "https://www.youtube.com/embed/E_rB5CvBY0k?rel=0&modestbranding=1";

export default function GiftSurprise({ onFireworks }) {
  const [isOpen, setIsOpen] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  const openSurprise = () => {
    setIsOpen(true);
    setConfettiKey((value) => value + 1);
    onFireworks();
  };

  return (
    <>
      <ConfettiHearts trigger={confettiKey} />

      <button
        type="button"
        onClick={openSurprise}
        className="fixed bottom-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-roseLove shadow-lg shadow-rose-200 ring-1 ring-rose-100 transition hover:-translate-y-1 hover:scale-105 sm:bottom-6 sm:left-6 sm:h-14 sm:w-14"
        aria-label="Open birthday surprise"
      >
        <Gift className="h-5 w-5 animate-wiggle sm:h-6 sm:w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm animate-fade-in sm:px-5">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white p-4 text-center shadow-2xl animate-pop-big sm:p-6">
            <div className="pointer-events-none absolute inset-0 z-0">
              <MagicParticles amount={18} />
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-30 rounded-full bg-white/90 p-2 text-roseLove shadow-md transition hover:bg-rose-100"
              aria-label="Close surprise"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative z-10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-softRose text-roseLove">
              <Heart className="h-7 w-7 fill-current animate-heartbeat" />
            </div>

            <h3 className="relative z-10 font-script text-4xl font-bold text-roseLove sm:text-5xl">
              Surprise Video ♡
            </h3>

            <p className="relative z-10 mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              Ini sedikit video spesial buat kamu.
            </p>

            <div className="relative z-10 mt-5 overflow-hidden rounded-[1.5rem] bg-black shadow-lg shadow-rose-100">
              <iframe
                className="aspect-video w-full"
                src={YOUTUBE_URL}
                title="Surprise Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setConfettiKey((value) => value + 1);
                onFireworks();
              }}
              className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-full bg-roseLove px-6 py-3 font-semibold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-1 hover:bg-deepRose"
            >
              <Play className="h-4 w-4 fill-current" />
              Love Explosion ♥
            </button>
          </div>
        </div>
      )}
    </>
  );
}