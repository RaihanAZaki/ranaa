import { useEffect, useRef, useState } from "react";

export default function CursorTrail() {
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
        <span key={heart.id} className="cursor-heart" style={{ left: heart.x, top: heart.y }}>
          ♥
        </span>
      ))}
    </div>
  );
}
