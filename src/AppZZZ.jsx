import { useEffect, useMemo, useRef, useState } from "react";
import {
  Cake,
  CalendarHeart,
  Gift,
  Heart,
  Music,
  Pause,
  Sparkles,
  X
} from "lucide-react";

const CONFIG = {
  partnerName: "Sayang",
  yourName: "Aku",
  birthdayDate: "2026-07-20T00:00:00",
  relationshipStart: "2023-01-12T00:00:00",
  heroImage: "/assets/hero-couple.svg",
  musicUrl: "/assets/music.mp3"
};

const memories = [
  {
    icon: CalendarHeart,
    title: "Pertama Bertemu",
    date: "12 Januari 2023",
    text: "Hari di mana semuanya berawal. Aku tidak pernah menyangka kamu akan menjadi seseorang yang sangat berarti."
  },
  {
    icon: Heart,
    title: "Menjadi Kita",
    date: "14 Februari 2023",
    text: "Dari banyak cerita sederhana, kita belajar saling memahami, saling menjaga, dan tumbuh bersama."
  },
  {
    icon: Cake,
    title: "Hari Ini",
    date: "Ulang Tahunmu",
    text: "Hari spesial untuk mengingatkan kamu bahwa kamu sangat dicintai dan sangat berharga."
  }
];

const wishes = [
  "Semoga semua hal baik datang pelan-pelan, lalu menetap lama di hidupmu.",
  "Semoga kamu selalu merasa cukup dicintai, cukup dihargai, dan cukup kuat untuk semua mimpimu.",
  "Semoga aku bisa terus menjadi salah satu alasan kecil kamu tersenyum."
];

const gallery = [
  "/assets/memory-1.svg",
  "/assets/memory-2.svg",
  "/assets/memory-3.svg",
  "/assets/memory-4.svg"
];

function getTimeLeft(targetDate) {
  const difference = new Date(targetDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
}

function getDaysTogether(startDate) {
  const difference = new Date().getTime() - new Date(startDate).getTime();
  return Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24)));
}

function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function Reveal({ children, className = "", delay = 0 }) {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${isVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-sm"} transition-all duration-1000 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

function OpeningScene({ onOpen }) {
  const [isLeaving, setIsLeaving] = useState(false);

  const openPage = () => {
    setIsLeaving(true);
    onOpen();
  };

  return (
    <div className={`fixed inset-0 z-[120] overflow-hidden bg-[#fff1f4] transition duration-1000 ${isLeaving ? "pointer-events-none opacity-0 scale-105" : "opacity-100"}`}>
      <div className="absolute inset-0 magical-grid" />
      <MagicParticles amount={44} />
      <FloatingBalloons amount={9} />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 text-center">
        <div className="opening-card w-full max-w-xl rounded-[3rem] border border-white/80 bg-white/70 p-8 shadow-2xl shadow-rose-200/70 backdrop-blur-2xl md:p-12">
          <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-roseLove text-white shadow-2xl shadow-rose-300 animate-heart-glow">
            <Gift className="h-11 w-11 animate-wiggle" />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-roseLove">A little surprise</p>
          <h1 className="mt-4 font-script text-6xl font-bold leading-none text-deepRose md:text-7xl shimmer-text">
            For You ♡
          </h1>
          <p className="mx-auto mt-5 max-w-md leading-8 text-slate-700">
            Klik tombol ini untuk membuka halaman ulang tahun yang aku buat khusus untuk kamu.
          </p>

          <button
            type="button"
            onClick={openPage}
            className="group relative mt-9 overflow-hidden rounded-full bg-roseLove px-8 py-4 font-bold text-white shadow-xl shadow-rose-300 transition hover:-translate-y-1 hover:bg-deepRose"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/30 transition duration-700 group-hover:translate-x-full" />
            <span className="relative inline-flex items-center gap-2">
              Buka Kejutan
              <Heart className="h-5 w-5 fill-current animate-heartbeat" />
            </span>
          </button>

          <div className="mx-auto mt-9 h-1.5 w-44 overflow-hidden rounded-full bg-rose-100">
            <div className="h-full rounded-full bg-roseLove animate-progress" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const links = ["Home", "Memories", "Letter", "Gallery"];

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-5 py-4 md:px-10 animate-slide-down">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/70 bg-white/75 px-5 py-3 shadow-soft backdrop-blur-xl">
        <a href="#home" className="flex items-center gap-2 font-bold text-roseLove">
          <Heart className="h-5 w-5 fill-current animate-heartbeat" />
          <span>For My Love</span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="relative transition hover:text-roseLove after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-roseLove after:transition-all hover:after:w-full">
              {link}
            </a>
          ))}
        </div>

        <a href="#letter" className="rounded-full bg-roseLove px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 hover:bg-deepRose hover:shadow-rose-300">
          Untukmu
        </a>
      </nav>
    </header>
  );
}

function Hero({ daysTogether, onFireworks }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateY = ((x / bounds.width) - 0.5) * 12;
    const rotateX = ((0.5 - y / bounds.height)) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="home" className="heart-bg relative min-h-screen overflow-hidden px-5 pb-20 pt-32 md:px-10 md:pt-40">
      <AnimatedBackground />
      <HeroLight />

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="relative z-10 text-center md:text-left">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-sm font-semibold text-roseLove shadow-soft animate-fade-up">
            <Sparkles className="h-4 w-4 animate-spin-slow" />
            Hari spesial untuk orang spesial
          </p>

          <h1 className="font-script text-7xl font-bold leading-none text-roseLove md:text-8xl animate-fade-up animate-delay-150 shimmer-text">
            Happy Birthday
          </h1>
          <h2 className="mt-2 font-script text-4xl text-deepRose md:text-5xl animate-fade-up animate-delay-300">
            My Love, {CONFIG.partnerName} ♡
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-slate-700 md:mx-0 animate-fade-up animate-delay-500">
            Hari ini bukan cuma tentang bertambahnya umurmu, tapi tentang betapa bersyukurnya aku karena dunia pernah menghadirkan kamu.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:items-start animate-fade-up animate-delay-700">
            <a href="#letter" className="group rounded-full bg-roseLove px-7 py-4 font-semibold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-1 hover:bg-deepRose">
              <span className="inline-flex items-center gap-2">
                Buka Surat Untukmu
                <Heart className="h-4 w-4 fill-current transition group-hover:scale-125" />
              </span>
            </a>
            <button onClick={onFireworks} type="button" className="rounded-full border border-rose-200 bg-white/80 px-7 py-4 font-semibold text-deepRose transition hover:-translate-y-1 hover:bg-white">
              Nyalakan Kembang Api
            </button>
          </div>

          <div className="mt-10 inline-flex items-center gap-3 rounded-3xl bg-white/80 px-6 py-4 shadow-soft animate-fade-up animate-delay-900">
            <Heart className="h-6 w-6 fill-roseLove text-roseLove animate-heartbeat" />
            <p className="text-sm text-slate-700">
              Kita sudah bersama selama <span className="font-bold text-roseLove">{daysTogether}</span> hari.
            </p>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-md">
          <div className="absolute -left-10 -top-8 h-28 w-28 rounded-full bg-softRose blur-2xl animate-blob" />
          <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-rose-200 blur-2xl animate-blob animation-delay-2000" />

          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            style={{ transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            className="hero-tilt-card relative rounded-[2rem] bg-white p-4 shadow-soft transition-transform duration-200"
          >
            <div className="absolute -right-5 -top-5 rotate-12 rounded-xl bg-softRose px-8 py-3 opacity-80" />
            <img src={CONFIG.heroImage} alt="Foto pasangan" className="h-[440px] w-full rounded-[1.5rem] object-cover" />
            <div className="absolute -bottom-6 -right-6 rounded-full bg-roseLove p-5 text-white shadow-lg shadow-rose-300 animate-heart-glow">
              <Heart className="h-10 w-10 fill-current" />
            </div>
            <div className="absolute left-8 top-8 rounded-full bg-white/75 px-4 py-2 text-xs font-bold text-roseLove backdrop-blur-md animate-float-slow">
              You are my favorite person
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Countdown({ timeLeft }) {
  const items = [
    ["Hari", timeLeft.days],
    ["Jam", timeLeft.hours],
    ["Menit", timeLeft.minutes],
    ["Detik", timeLeft.seconds]
  ];

  return (
    <section className="px-5 py-10 md:px-10">
      <Reveal>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-rose-50 to-pink-100 p-8 text-center shadow-soft relative">
          <div className="absolute inset-0 opacity-60 aurora" />
          <div className="relative z-10">
            <h2 className="font-script text-4xl font-bold text-roseLove md:text-5xl">Menuju Hari Spesialmu ♡</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {items.map(([label, value], index) => (
                <div key={label} className="count-card rounded-3xl bg-white/90 p-6 shadow-lg shadow-rose-100 transition hover:-translate-y-2 hover:shadow-rose-200">
                  <p key={value} className="flip-number text-4xl font-bold text-roseLove">{String(value).padStart(2, "0")}</p>
                  <p className="mt-1 text-sm font-medium text-slate-600">{label}</p>
                  <div className="mx-auto mt-4 h-1 w-12 overflow-hidden rounded-full bg-rose-100">
                    <div className="h-full rounded-full bg-roseLove animate-progress" style={{ animationDelay: `${index * 0.18}s` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Memories() {
  return (
    <section id="memories" className="px-5 py-20 md:px-10">
      <div className="mx-auto max-w-6xl text-center">
        <Reveal>
          <p className="font-semibold text-roseLove">Our Story</p>
          <h2 className="mt-2 font-script text-5xl font-bold text-deepRose md:text-6xl">Kenangan Kita ♡</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Beberapa momen kecil yang selalu terasa besar karena aku melewatinya bersamamu.
          </p>
        </Reveal>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          <div className="absolute left-1/2 top-12 hidden h-1 w-2/3 -translate-x-1/2 rounded-full bg-softRose md:block story-line" />
          {memories.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 180}>
                <div className="group relative rounded-[2rem] border border-rose-100 bg-white p-8 shadow-soft transition duration-500 hover:-translate-y-3 hover:shadow-rose-200 memory-card-3d">
                  <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-roseLove to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-softRose text-roseLove shadow-lg shadow-rose-100 transition group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-roseLove">{item.date}</p>
                  <p className="mt-5 text-sm leading-7 text-slate-600">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WishSection() {
  return (
    <section className="px-5 py-12 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center">
            <p className="font-semibold text-roseLove">Three Wishes</p>
            <h2 className="mt-2 font-script text-5xl font-bold text-deepRose md:text-6xl">Doa Kecil Untukmu</h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {wishes.map((wish, index) => (
            <Reveal key={wish} delay={index * 140}>
              <div className="wish-card group relative min-h-56 overflow-hidden rounded-[2rem] border border-rose-100 bg-white p-7 shadow-soft">
                <div className="absolute right-6 top-6 text-5xl font-black text-rose-100 transition group-hover:scale-125 group-hover:text-rose-200">0{index + 1}</div>
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-roseLove shadow-lg shadow-rose-100">
                  <Sparkles className="h-7 w-7 animate-spin-slow" />
                </div>
                <p className="relative z-10 mt-8 text-left text-base leading-8 text-slate-700">{wish}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LoveLetter() {
  const { ref, isVisible } = useInView(0.25);
  const letterText = `Happy birthday, ${CONFIG.partnerName}.\n\nSemoga di umurmu yang baru ini, kamu selalu diberikan kesehatan, kebahagiaan, dan semua hal baik yang selama ini kamu impikan.\n\nTerima kasih sudah menjadi tempat pulang, teman cerita, dan alasan aku tersenyum setiap hari. Aku mungkin tidak selalu sempurna, tapi aku akan selalu berusaha menjadi orang yang bisa membuatmu merasa dicintai.\n\nAku sayang kamu, hari ini, besok, dan seterusnya.`;

  return (
    <section id="letter" ref={ref} className="px-5 py-20 md:px-10">
      <Reveal>
        <div className="mx-auto grid max-w-6xl items-center gap-10 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-pink-100 via-rose-50 to-white p-8 shadow-soft md:grid-cols-[0.8fr_1.2fr] md:p-14 relative">
          <div className="absolute inset-0 opacity-70 aurora" />
          <div className="relative z-10 mx-auto max-w-xs">
            <MagicalEnvelope open={isVisible} />
          </div>

          <div className="relative z-10">
            <p className="font-semibold text-roseLove">From My Heart</p>
            <h2 className="mt-2 font-script text-5xl font-bold text-deepRose md:text-6xl">Surat Untukmu ♡</h2>

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
    <div className="mt-7 min-h-[320px] rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-lg shadow-rose-100/60 backdrop-blur-xl">
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
        <span>today, tomorrow, always</span>
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

function Gallery() {
  return (
    <section id="gallery" className="px-5 py-20 md:px-10 overflow-hidden">
      <div className="mx-auto max-w-6xl text-center">
        <Reveal>
          <p className="font-semibold text-roseLove">Little Pieces of Us</p>
          <h2 className="mt-2 font-script text-5xl font-bold text-deepRose md:text-6xl">Galeri Kita ♡</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Bagian ini dibuat seperti carousel 3D. Ganti gambar SVG di folder assets dengan foto asli kalian.
          </p>
        </Reveal>

        <Reveal>
          <div className="scene-3d mx-auto mt-16 hidden h-[430px] max-w-4xl md:block">
            <div className="carousel-3d">
              {gallery.map((image, index) => (
                <div key={image} className="carousel-card" style={{ "--i": index }}>
                  <img src={image} alt={`Kenangan ${index + 1}`} />
                  <p>Memory {index + 1}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-5 md:hidden">
          {gallery.map((image, index) => (
            <Reveal key={image} delay={index * 140}>
              <div className={`${index % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"} group relative overflow-hidden rounded-3xl bg-white p-3 shadow-soft transition duration-500 hover:rotate-0 hover:scale-105`}>
                <img src={image} alt={`Kenangan ${index + 1}`} className="h-56 w-full rounded-2xl object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-3 flex items-center justify-center rounded-2xl bg-roseLove/0 opacity-0 transition duration-500 group-hover:bg-roseLove/25 group-hover:opacity-100">
                  <Heart className="h-10 w-10 fill-white text-white drop-shadow-lg animate-heartbeat" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalMessage({ onFireworks }) {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-white px-5 py-20 text-center md:px-10">
      <MagicParticles amount={30} />
      <FloatingBalloons amount={5} />
      <div className="absolute left-8 top-12 text-roseLove opacity-40">
        <Heart className="h-16 w-16 fill-current animate-pulseSoft" />
      </div>
      <div className="absolute bottom-10 right-10 text-roseLove opacity-40">
        <Gift className="h-20 w-20 animate-float" />
      </div>

      <Reveal>
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="font-script text-6xl font-bold text-roseLove md:text-7xl shimmer-text">I Love You ♡</h2>
          <p className="mt-6 text-slate-700">
            Terima kasih sudah hadir di hidupku dan menjadi bagian terindah dalam setiap hariku.
          </p>
          <p className="mt-5 text-2xl font-bold text-deepRose animate-heartbeat">Selamat ulang tahun, cintaku! ♥</p>
          <button
            type="button"
            onClick={onFireworks}
            className="mt-9 rounded-full bg-roseLove px-8 py-4 font-bold text-white shadow-xl shadow-rose-300 transition hover:-translate-y-1 hover:bg-deepRose"
          >
            Fireworks Finale ✨
          </button>
        </div>
      </Reveal>
    </footer>
  );
}

function MusicButton() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch {
      alert("Tambahkan file music.mp3 di folder public/assets terlebih dahulu.");
    }
  };

  return (
    <>
      <audio ref={audioRef} loop src={CONFIG.musicUrl} />
      <button
        type="button"
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-roseLove text-white shadow-lg shadow-rose-300 transition hover:-translate-y-1 hover:bg-deepRose"
        aria-label="Toggle music"
      >
        {isPlaying ? <Pause className="h-6 w-6" /> : <Music className="h-6 w-6" />}
      </button>
    </>
  );
}

function GiftSurprise({ onFireworks }) {
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
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white text-roseLove shadow-lg shadow-rose-200 ring-1 ring-rose-100 transition hover:-translate-y-1 hover:scale-105"
        aria-label="Open birthday surprise"
      >
        <Gift className="h-6 w-6 animate-wiggle" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/30 px-5 backdrop-blur-sm animate-fade-in">
          <div className="surprise-modal relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white p-8 text-center shadow-2xl animate-pop-big">
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
            <p className="relative z-10 mt-4 leading-7 text-slate-700">
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

function AnimatedBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-28 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl animate-blob" />
        <div className="absolute right-[-7rem] top-12 h-72 w-72 rounded-full bg-rose-200/60 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-8rem] left-1/3 h-80 w-80 rounded-full bg-fuchsia-100/70 blur-3xl animate-blob animation-delay-4000" />
      </div>
      <MagicParticles amount={36} />
      <FloatingHearts amount={18} />
      <FallingPetals />
    </>
  );
}

function HeroLight() {
  return <div className="pointer-events-none absolute inset-0 hero-spotlight" />;
}

function MagicParticles({ amount = 20 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(amount)].map((_, index) => (
        <span
          key={index}
          className="magic-particle"
          style={{
            left: `${(index * 31) % 100}%`,
            top: `${(index * 47) % 100}%`,
            animationDelay: `${index * 0.19}s`,
            animationDuration: `${2.8 + (index % 5) * 0.6}s`
          }}
        />
      ))}
    </div>
  );
}

function FloatingBalloons({ amount = 6 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(amount)].map((_, index) => (
        <span
          key={index}
          className="balloon"
          style={{
            left: `${(index * 16 + 3) % 100}%`,
            animationDelay: `${index * 0.6}s`,
            animationDuration: `${8 + (index % 5)}s`,
            transform: `scale(${0.75 + (index % 4) * 0.08})`
          }}
        />
      ))}
    </div>
  );
}

function FloatingHearts({ amount = 12 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(amount)].map((_, index) => (
        <Heart
          key={index}
          className="absolute fill-rose-200 text-rose-200 opacity-40 animate-drift"
          style={{
            left: `${(index * 17) % 100}%`,
            top: `${(index * 23) % 100}%`,
            width: `${18 + (index % 4) * 8}px`,
            height: `${18 + (index % 4) * 8}px`,
            animationDelay: `${index * 0.35}s`,
            animationDuration: `${5 + (index % 5)}s`
          }}
        />
      ))}
    </div>
  );
}

function FallingPetals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(22)].map((_, index) => (
        <span
          key={index}
          className="absolute top-[-2rem] rounded-full bg-rose-300/50 animate-petal"
          style={{
            left: `${(index * 13) % 100}%`,
            width: `${8 + (index % 3) * 4}px`,
            height: `${8 + (index % 3) * 4}px`,
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${7 + (index % 6)}s`
          }}
        />
      ))}
    </div>
  );
}

function ConfettiHearts({ trigger }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!trigger) return undefined;
    setVisible(true);
    const timeoutId = window.setTimeout(() => setVisible(false), 2500);
    return () => window.clearTimeout(timeoutId);
  }, [trigger]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      {[...Array(46)].map((_, index) => (
        <Heart
          key={`${trigger}-${index}`}
          className="absolute top-[-2rem] fill-roseLove text-roseLove animate-confetti"
          style={{
            left: `${(index * 29) % 100}%`,
            width: `${14 + (index % 5) * 5}px`,
            height: `${14 + (index % 5) * 5}px`,
            animationDelay: `${(index % 9) * 0.08}s`,
            animationDuration: `${1.6 + (index % 7) * 0.12}s`
          }}
        />
      ))}
    </div>
  );
}

function CursorTrail() {
  const [hearts, setHearts] = useState([]);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const handleMove = (event) => {
      const now = Date.now();
      if (now - lastTimeRef.current < 75) return;
      lastTimeRef.current = now;

      const id = `${now}-${Math.random()}`;
      setHearts((current) => [...current.slice(-16), { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => {
        setHearts((current) => current.filter((heart) => heart.id !== id));
      }, 900);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="cursor-heart"
          style={{ left: heart.x, top: heart.y }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const value = documentHeight <= 0 ? 0 : (window.scrollY / documentHeight) * 100;
      setProgress(value);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[80] h-1 w-full bg-transparent">
      <div className="h-full bg-roseLove transition-all duration-150" style={{ width: `${progress}%` }} />
    </div>
  );
}

function Fireworks({ trigger }) {
  const canvasRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!trigger) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    setActive(true);
    const context = canvas.getContext("2d");
    let animationFrameId = 0;
    let launchIntervalId = 0;
    let isRunning = true;
    const rockets = [];
    const particles = [];
    const colors = ["#F65A83", "#FFD6DF", "#C63A62", "#FFFFFF", "#FF9BB2"];

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const createRocket = () => {
      const startX = window.innerWidth / 2 + (Math.random() - 0.5) * window.innerWidth * 0.7;
      const targetX = Math.random() * window.innerWidth;
      const targetY = 90 + Math.random() * window.innerHeight * 0.45;
      rockets.push({
        x: startX,
        y: window.innerHeight + 30,
        targetX,
        targetY,
        speed: 0.035 + Math.random() * 0.025,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    };

    const explode = (x, y, color) => {
      const amount = 46;
      for (let index = 0; index < amount; index += 1) {
        const angle = (Math.PI * 2 * index) / amount;
        const speed = 1.5 + Math.random() * 4;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.012 + Math.random() * 0.018,
          color
        });
      }
    };

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.globalCompositeOperation = "lighter";

      for (let index = rockets.length - 1; index >= 0; index -= 1) {
        const rocket = rockets[index];
        rocket.x += (rocket.targetX - rocket.x) * rocket.speed;
        rocket.y += (rocket.targetY - rocket.y) * rocket.speed;

        context.beginPath();
        context.arc(rocket.x, rocket.y, 3, 0, Math.PI * 2);
        context.fillStyle = rocket.color;
        context.fill();

        if (Math.abs(rocket.x - rocket.targetX) < 4 && Math.abs(rocket.y - rocket.targetY) < 4) {
          explode(rocket.x, rocket.y, rocket.color);
          rockets.splice(index, 1);
        }
      }

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.025;
        particle.life -= particle.decay;

        context.globalAlpha = Math.max(particle.life, 0);
        context.beginPath();
        context.arc(particle.x, particle.y, 2.5, 0, Math.PI * 2);
        context.fillStyle = particle.color;
        context.fill();

        if (particle.life <= 0) particles.splice(index, 1);
      }

      context.globalAlpha = 1;
      if (isRunning || rockets.length || particles.length) {
        animationFrameId = window.requestAnimationFrame(draw);
      } else {
        setActive(false);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    createRocket();
    launchIntervalId = window.setInterval(createRocket, 260);
    animationFrameId = window.requestAnimationFrame(draw);

    const stopLaunchTimeout = window.setTimeout(() => {
      isRunning = false;
      window.clearInterval(launchIntervalId);
    }, 2700);

    return () => {
      isRunning = false;
      window.clearInterval(launchIntervalId);
      window.clearTimeout(stopLaunchTimeout);
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-[95] transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`}
    />
  );
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(CONFIG.birthdayDate));
  const [fireworkTrigger, setFireworkTrigger] = useState(0);
  const [showOpening, setShowOpening] = useState(true);
  const daysTogether = useMemo(() => getDaysTogether(CONFIG.relationshipStart), []);

  const runFireworks = () => setFireworkTrigger((value) => value + 1);

  const openSurprise = () => {
    runFireworks();
    window.setTimeout(() => setShowOpening(false), 900);
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(getTimeLeft(CONFIG.birthdayDate));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <main>
      <ScrollProgress />
      <CursorTrail />
      <Fireworks trigger={fireworkTrigger} />
      {showOpening && <OpeningScene onOpen={openSurprise} />}
      <Navbar />
      <Hero daysTogether={daysTogether} onFireworks={runFireworks} />
      <Countdown timeLeft={timeLeft} />
      <Memories />
      <WishSection />
      <LoveLetter />
      <Gallery />
      <FinalMessage onFireworks={runFireworks} />
      <GiftSurprise onFireworks={runFireworks} />
      <MusicButton />
    </main>
  );
}
