import { Gift, Heart } from "lucide-react";
import Reveal from "../ui/Reveal";
import MagicParticles from "../effects/MagicParticles";
import FloatingBalloons from "../effects/FloatingBalloons";

export default function FinalMessage({ onFireworks }) {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-white px-4 py-16 text-center sm:px-6 md:px-10 md:py-20">
      <MagicParticles amount={30} />
      <FloatingBalloons amount={5} />
      <div className="absolute left-8 top-12 text-roseLove opacity-40">
        <Heart className="h-12 w-12 fill-current animate-pulseSoft sm:h-16 sm:w-16" />
      </div>
      <div className="absolute bottom-10 right-10 text-roseLove opacity-40">
        <Gift className="h-14 w-14 animate-float sm:h-20 sm:w-20" />
      </div>

      <Reveal>
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="font-script text-5xl font-bold text-roseLove shimmer-text sm:text-6xl md:text-7xl">
            I Love You ♡
          </h2>
          <p className="mt-6 text-sm leading-7 text-slate-700 sm:text-base">
            Terima kasih sudah hadir di hidupku dan menjadi bagian terindah dalam hidupku ya sayang.
          </p>
          <p className="mt-5 text-xl font-bold text-deepRose animate-heartbeat sm:text-2xl">
            Selamat ulang tahun, cantikku! ♥
          </p>
          <button
            type="button"
            onClick={onFireworks}
            className="mt-9 rounded-full bg-roseLove px-8 py-4 font-bold text-white shadow-xl shadow-rose-300 transition hover:-translate-y-1 hover:bg-deepRose"
          >
            Fireworks ✨
          </button>
        </div>
      </Reveal>
    </footer>
  );
}
