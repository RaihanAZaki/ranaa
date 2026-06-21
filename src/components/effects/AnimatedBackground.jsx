import MagicParticles from "./MagicParticles";
import FloatingHearts from "./FloatingHearts";
import FallingPetals from "./FallingPetals";

export default function AnimatedBackground() {
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
