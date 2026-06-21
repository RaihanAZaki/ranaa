import { memories } from "../../data";
import Reveal from "../ui/Reveal";

export default function Memories() {
  return (
    <section id="memories" className="px-4 py-16 sm:px-6 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <Reveal>
          <p className="font-semibold text-roseLove">Our Story</p>
          <h2 className="mt-2 font-script text-4xl font-bold text-deepRose sm:text-5xl md:text-6xl">
            Kenangan Kita ♡
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Beberapa momen kecil yang selalu terasa besar karena aku melewatinya bersamamu.
          </p>
        </Reveal>

        <div className="relative mt-10 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-8">
          <div className="absolute left-1/2 top-12 hidden h-1 w-2/3 -translate-x-1/2 rounded-full bg-softRose md:block story-line" />
          {memories.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 180}>
                <div className="group relative rounded-[2rem] border border-rose-100 bg-white p-6 shadow-soft transition duration-500 hover:-translate-y-3 hover:shadow-rose-200 sm:p-8 memory-card-3d">
                  <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-roseLove to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-softRose text-roseLove shadow-lg shadow-rose-100 transition group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 sm:text-xl">{item.title}</h3>
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
