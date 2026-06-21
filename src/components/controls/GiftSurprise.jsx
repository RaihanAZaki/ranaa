import { useState } from "react";
import { Gift, Heart, X } from "lucide-react";
import ConfettiHearts from "../effects/ConfettiHearts";
import MagicParticles from "../effects/MagicParticles";

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
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/30 px-4 backdrop-blur-sm animate-fade-in sm:px-5">
          <div className="surprise-modal relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white p-6 text-center shadow-2xl animate-pop-big sm:p-8">
            <MagicParticles amount={18} />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-rose-50 p-2 text-roseLove transition hover:bg-rose-100"
              aria-label="Close surprise"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative z-10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-softRose text-roseLove">
              <Heart className="h-8 w-8 fill-current animate-heartbeat" />
            </div>
            <h3 className="relative z-10 font-script text-5xl font-bold text-roseLove">Surprise ♡</h3>
            <p className="relative z-10 mt-4 text-sm leading-7 text-slate-700 sm:text-base">
              Kamu adalah hadiah paling indah yang pernah datang di hidupku. Semoga hari ini penuh senyum, peluk, dan hal-hal baik untukmu.
            </p>
            <button
              type="button"
              onClick={() => {
                setConfettiKey((value) => value + 1);
                onFireworks();
              }}
              className="relative z-10 mt-7 rounded-full bg-roseLove px-6 py-3 font-semibold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-1 hover:bg-deepRose"
            >
              Love Explosion ♥
            </button>
          </div>
        </div>
      )}
    </>
  );
}
