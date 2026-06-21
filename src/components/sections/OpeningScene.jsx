import { useState } from "react";
import { Gift, Heart } from "lucide-react";
import MagicParticles from "../effects/MagicParticles";
import FloatingBalloons from "../effects/FloatingBalloons";

export default function OpeningScene({ onOpen }) {
  const [isLeaving, setIsLeaving] = useState(false);

  const openPage = () => {
    setIsLeaving(true);
    onOpen();
  };

  return (
    <div
      className={`fixed inset-0 z-[120] overflow-hidden bg-[#fff1f4] transition duration-1000 ${
        isLeaving ? "pointer-events-none opacity-0 scale-105" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 magical-grid" />
      <MagicParticles amount={44} />
      <FloatingBalloons amount={9} />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 text-center sm:px-5">
        <div className="opening-card w-full max-w-xl rounded-[2rem] border border-white/80 bg-white/70 p-6 shadow-2xl shadow-rose-200/70 backdrop-blur-2xl sm:rounded-[3rem] sm:p-8 md:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-roseLove text-white shadow-2xl shadow-rose-300 animate-heart-glow sm:mb-7 sm:h-24 sm:w-24">
            <Gift className="h-9 w-9 animate-wiggle sm:h-11 sm:w-11" />
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-roseLove sm:text-sm sm:tracking-[0.4em]">
            A little surprise
          </p>
          <h1 className="mt-4 font-script text-5xl font-bold leading-none text-deepRose shimmer-text sm:text-6xl md:text-7xl">
            For You ♡
          </h1>
          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
            Klik tombol ini untuk membuka halaman ulang tahun yang aku buat khusus untuk kamu.
          </p>

          <button
            type="button"
            onClick={openPage}
            className="group relative mt-8 w-full overflow-hidden rounded-full bg-roseLove px-7 py-4 font-bold text-white shadow-xl shadow-rose-300 transition hover:-translate-y-1 hover:bg-deepRose sm:mt-9 sm:w-auto sm:px-8"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/30 transition duration-700 group-hover:translate-x-full" />
            <span className="relative inline-flex items-center justify-center gap-2">
              Buka Kejutan
              <Heart className="h-5 w-5 fill-current animate-heartbeat" />
            </span>
          </button>

          <div className="mx-auto mt-8 h-1.5 w-40 overflow-hidden rounded-full bg-rose-100 sm:mt-9 sm:w-44">
            <div className="h-full rounded-full bg-roseLove animate-progress" />
          </div>
        </div>
      </div>
    </div>
  );
}
