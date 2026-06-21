import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { CONFIG } from "../../config";
import { useInView } from "../../hooks/useInView";
import Reveal from "../ui/Reveal";

export default function LoveLetter() {
  const { ref, isVisible } = useInView(0.25);
  const letterText = `Happy birthday, ${CONFIG.partnerName}.\n\nSemoga di umurmu yang baru ini, kamu selalu diberikan kesehatan, kebahagiaan, dan semua hal baik yang selama ini kamu impikan.\n\nTerima kasih sudah menjadi tempat pulang, teman cerita, dan alasan aku tersenyum setiap hari. Aku mungkin tidak selalu sempurna, tapi aku akan selalu berusaha menjadi orang yang bisa membuatmu merasa dicintai.\n\nAku sayang kamu, hari ini, besok, dan seterusnya.`;

  return (
    <section id="letter" ref={ref} className="px-4 py-16 sm:px-6 md:px-10 md:py-20">
      <Reveal>
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-pink-100 via-rose-50 to-white p-5 shadow-soft sm:p-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10 md:rounded-[2.5rem] md:p-14">
          <div className="absolute inset-0 opacity-70 aurora" />
          <div className="relative z-10 mx-auto max-w-xs">
            <MagicalEnvelope open={isVisible} />
          </div>

          <div className="relative z-10">
            <p className="font-semibold text-roseLove">From My Heart</p>
            <h2 className="mt-2 font-script text-4xl font-bold text-deepRose sm:text-5xl md:text-6xl">
              Surat Untukmu ♡
            </h2>

            <TypewriterText text={letterText} start={isVisible} />
            <p className="mt-8 font-script text-3xl text-roseLove">Love, {CONFIG.yourName} ♡</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function TypewriterText({ text, start }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!start || visible >= text.length) return undefined;
    const timeoutId = window.setTimeout(() => {
      setVisible((value) => Math.min(value + 2, text.length));
    }, 18);

    return () => window.clearTimeout(timeoutId);
  }, [start, text.length, visible]);

  return (
    <div className="mt-7 min-h-[300px] rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-lg shadow-rose-100/60 backdrop-blur-xl sm:min-h-[320px] sm:p-6">
      <p className="whitespace-pre-line text-sm leading-8 text-slate-700 md:text-base">
        {text.slice(0, visible)}
        {visible < text.length && <span className="typing-cursor">|</span>}
      </p>
    </div>
  );
}

function MagicalEnvelope({ open }) {
  return (
    <div className={`envelope-3d ${open ? "is-open" : ""}`}>
      <div className="letter-paper">
        <p className="font-script text-3xl text-roseLove">I love you</p>
      </div>
      <div className="envelope-back" />
      <div className="envelope-left" />
      <div className="envelope-right" />
      <div className="envelope-front" />
      <div className="envelope-flap" />
      <Heart className="envelope-heart h-9 w-9 fill-current" />
    </div>
  );
}
