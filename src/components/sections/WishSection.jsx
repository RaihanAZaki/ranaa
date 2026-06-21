import { Sparkles } from "lucide-react";
import { wishes } from "../../data";
import Reveal from "../ui/Reveal";

export default function WishSection() {
  return (
    <section className="px-4 py-10 sm:px-6 md:px-10 md:py-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center">
            <p className="font-semibold text-roseLove">Three Wishes</p>
            <h2 className="mt-2 font-script text-4xl font-bold text-deepRose sm:text-5xl md:text-6xl">
              Doa Kecil Untukmu
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {wishes.map((wish, index) => (
            <Reveal key={wish} delay={index * 140}>
              <div className="wish-card group relative min-h-52 overflow-hidden rounded-[2rem] border border-rose-100 bg-white p-6 shadow-soft sm:min-h-56 sm:p-7">
                <div className="absolute right-6 top-6 text-5xl font-black text-rose-100 transition group-hover:scale-125 group-hover:text-rose-200">
                  0{index + 1}
                </div>
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-roseLove shadow-lg shadow-rose-100">
                  <Sparkles className="h-7 w-7 animate-spin-slow" />
                </div>
                <p className="relative z-10 mt-8 text-left text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
                  {wish}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
