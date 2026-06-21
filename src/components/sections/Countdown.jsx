import Reveal from "../ui/Reveal";

export default function Countdown({ timeLeft }) {
  const items = [
    ["Hari", timeLeft.days],
    ["Jam", timeLeft.hours],
    ["Menit", timeLeft.minutes],
    ["Detik", timeLeft.seconds]
  ];

  return (
    <section className="px-4 py-8 sm:px-6 md:px-10 md:py-10">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[1.5rem] bg-gradient-to-r from-rose-50 to-pink-100 p-4 text-center shadow-soft sm:rounded-[2rem] sm:p-6 md:p-8">
          <div className="absolute inset-0 opacity-60 aurora" />
          <div className="relative z-10">
            <h2 className="font-script text-3xl font-bold text-roseLove sm:text-4xl md:text-5xl">
              Menuju Hari Spesialmu ♡
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {items.map(([label, value], index) => (
                <div
                  key={label}
                  className="count-card rounded-2xl bg-white/90 p-4 shadow-lg shadow-rose-100 transition hover:-translate-y-2 hover:shadow-rose-200 sm:rounded-3xl sm:p-6"
                >
                  <p key={value} className="flip-number text-3xl font-bold text-roseLove sm:text-4xl">
                    {String(value).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">{label}</p>
                  <div className="mx-auto mt-3 h-1 w-10 overflow-hidden rounded-full bg-rose-100 sm:mt-4 sm:w-12">
                    <div
                      className="h-full rounded-full bg-roseLove animate-progress"
                      style={{ animationDelay: `${index * 0.18}s` }}
                    />
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
