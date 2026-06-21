import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { CONFIG } from "../../config";
import AnimatedBackground from "../effects/AnimatedBackground";
import HeroLight from "../effects/HeroLight";

export default function Hero({ daysTogether, onFireworks }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateY = (x / bounds.width - 0.5) * 12;
    const rotateX = (0.5 - y / bounds.height) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="home" className="heart-bg relative min-h-screen overflow-hidden px-4 pb-16 pt-28 sm:px-6 md:px-10 md:pb-20 md:pt-40">
      <AnimatedBackground />
      <HeroLight />

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="relative z-10 text-center md:text-left">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-xs font-semibold text-roseLove shadow-soft animate-fade-up sm:text-sm">
            <Sparkles className="h-4 w-4 animate-spin-slow" />
            Hari spesial untuk orang spesial
          </p>

          <h1 className="font-script text-5xl font-bold leading-none text-roseLove sm:text-6xl md:text-8xl animate-fade-up animate-delay-150 shimmer-text">
            Happy Birthday
          </h1>
          <h2 className="mt-2 font-script text-3xl text-deepRose sm:text-4xl md:text-5xl animate-fade-up animate-delay-300">
            Ranaa, {CONFIG.partnerName} ♡
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-slate-700 md:mx-0 md:text-base md:leading-8 animate-fade-up animate-delay-500">
            Hari ini adalah hari yang sangat berharga buat kita berdua, karena disatu sisi Ranaa usianya bertambah dan satu sisi lagi Raihan harus makin semangat buat ke jenjang yang lebih serius, asik
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:items-start animate-fade-up animate-delay-700">
            <a
              href="#letter"
              className="group w-full rounded-full bg-roseLove px-6 py-4 text-center font-semibold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-1 hover:bg-deepRose sm:w-auto sm:px-7"
            >
              <span className="inline-flex items-center justify-center gap-2">
                Buka Surat Untukmu
                <Heart className="h-4 w-4 fill-current transition group-hover:scale-125" />
              </span>
            </a>
            <button
              onClick={onFireworks}
              type="button"
              className="w-full rounded-full border border-rose-200 bg-white/80 px-6 py-4 font-semibold text-deepRose transition hover:-translate-y-1 hover:bg-white sm:w-auto sm:px-7"
            >
              Nyalakan Kembang Api
            </button>
          </div>

          <div className="mt-10 inline-flex items-center gap-3 rounded-3xl bg-white/80 px-5 py-4 shadow-soft animate-fade-up animate-delay-900 sm:px-6">
            <Heart className="h-6 w-6 fill-roseLove text-roseLove animate-heartbeat" />
            <p className="text-sm text-slate-700">
              Kita sudah bersama selama <span className="font-bold text-roseLove">{daysTogether}</span> hari.
            </p>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-sm sm:max-w-md">
          <div className="absolute -left-10 -top-8 h-28 w-28 rounded-full bg-softRose blur-2xl animate-blob" />
          <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-rose-200 blur-2xl animate-blob animation-delay-2000" />

          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            style={{ transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            className="hero-tilt-card relative rounded-[2rem] bg-white p-3 shadow-soft transition-transform duration-200 sm:p-4"
          >
            <div className="absolute -right-5 -top-5 rotate-12 rounded-xl bg-softRose px-8 py-3 opacity-80" />
            <img
              src={CONFIG.heroImage}
              alt="Foto pasangan"
              className="h-[320px] w-full rounded-[1.5rem] object-cover sm:h-[380px] md:h-[440px]"
            />
            <div className="absolute -bottom-5 -right-5 rounded-full bg-roseLove p-4 text-white shadow-lg shadow-rose-300 animate-heart-glow sm:-bottom-6 sm:-right-6 sm:p-5">
              <Heart className="h-8 w-8 fill-current sm:h-10 sm:w-10" />
            </div>
            <div className="absolute left-6 top-6 rounded-full bg-white/75 px-3 py-2 text-[10px] font-bold text-roseLove backdrop-blur-md animate-float-slow sm:left-8 sm:top-8 sm:px-4 sm:text-xs">
              You are my favorite person
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
