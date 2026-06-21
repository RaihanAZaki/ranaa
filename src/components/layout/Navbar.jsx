import { Heart } from "lucide-react";

export default function Navbar() {
  const links = ["Home", "Memories", "Letter", "Gallery"];

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-3 py-3 md:px-10 animate-slide-down">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/70 bg-white/80 px-4 py-3 shadow-soft backdrop-blur-xl">
        <a href="#home" className="flex items-center gap-2 font-bold text-roseLove">
          <Heart className="h-5 w-5 fill-current animate-heartbeat" />
          <span className="text-sm sm:text-base">For My Love</span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="relative transition hover:text-roseLove after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-roseLove after:transition-all hover:after:w-full"
            >
              {link}
            </a>
          ))}
        </div>

        <a
          href="#letter"
          className="rounded-full bg-roseLove px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 hover:bg-deepRose hover:shadow-rose-300 sm:px-5 sm:text-sm"
        >
          Untukmu
        </a>
      </nav>
    </header>
  );
}
