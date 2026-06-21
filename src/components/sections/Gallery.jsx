import { Heart, Play } from "lucide-react";
import { gallery } from "../../data";
import Reveal from "../ui/Reveal";

function GalleryMedia({ item, className = "" }) {
  if (item.type === "video") {
    return (
      <video
        src={item.src}
        className={className}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return (
    <img
      src={item.src}
      alt={item.title}
      className={className}
    />
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="overflow-hidden px-4 py-16 sm:px-6 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <Reveal>
          <p className="font-semibold text-roseLove">Little Pieces of Us</p>

          <h2 className="mt-2 font-script text-4xl font-bold text-deepRose sm:text-5xl md:text-6xl">
            Galeri Kita ♡
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Bagian ini kedepannya akan selalu bertambah sesuai dengan kenangan kita seberapa banyak yak.
          </p>
        </Reveal>

        <Reveal>
          <div className="scene-3d mx-auto mt-40 hidden h-[430px] max-w-4xl md:block">
            <div className="carousel-3d">
              {gallery.map((item, index) => (
                <div key={item.src} className="carousel-card" style={{ "--i": index }}>
                  <div className="relative overflow-hidden rounded-[20px]">
                    <GalleryMedia
                      item={item}
                      className="h-[255px] w-full object-cover"
                    />

                    {item.type === "video" && (
                      <div className="absolute left-3 top-3 rounded-full bg-white/80 p-2 text-roseLove backdrop-blur-md">
                        <Play className="h-4 w-4 fill-current" />
                      </div>
                    )}
                  </div>

                  <p>{item.title || `Memory ${index + 1}`}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:hidden">
          {gallery.map((item, index) => (
            <Reveal key={item.src} delay={index * 140}>
              <div
                className={`${
                  index % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"
                } group relative overflow-hidden rounded-3xl bg-white p-2 shadow-soft transition duration-500 hover:rotate-0 hover:scale-105 sm:p-3`}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <GalleryMedia
                    item={item}
                    className="h-40 w-full rounded-2xl object-cover transition duration-500 group-hover:scale-110 sm:h-56"
                  />

                  {item.type === "video" && (
                    <div className="absolute left-3 top-3 rounded-full bg-white/80 p-2 text-roseLove backdrop-blur-md">
                      <Play className="h-4 w-4 fill-current" />
                    </div>
                  )}
                </div>

                <div className="absolute inset-2 flex items-center justify-center rounded-2xl bg-roseLove/0 opacity-0 transition duration-500 group-hover:bg-roseLove/25 group-hover:opacity-100 sm:inset-3">
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