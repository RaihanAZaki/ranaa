import { Heart } from "lucide-react";

export default function FloatingHearts({ amount = 12 }) {
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
