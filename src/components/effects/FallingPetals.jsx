export default function FallingPetals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(22)].map((_, index) => (
        <span
          key={index}
          className="absolute top-[-2rem] rounded-full bg-rose-300/50 animate-petal"
          style={{
            left: `${(index * 13) % 100}%`,
            width: `${8 + (index % 3) * 4}px`,
            height: `${8 + (index % 3) * 4}px`,
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${7 + (index % 6)}s`
          }}
        />
      ))}
    </div>
  );
}
