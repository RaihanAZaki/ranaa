import { useEffect, useRef, useState } from "react";

export default function Fireworks({ trigger }) {
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
      className={`pointer-events-none fixed inset-0 z-[95] transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
