import { useInView } from "../../hooks/useInView";

export default function Reveal({ children, className = "", delay = 0 }) {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${
        isVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-sm"
      } transition-all duration-1000 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
