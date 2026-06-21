import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function ConfettiHearts({ trigger }) {
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
