export default function FloatingBalloons({ amount = 6 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(amount)].map((_, index) => (
        <span
          key={index}
          className="balloon"
          style={{
            left: `${(index * 16 + 3) % 100}%`,
            animationDelay: `${index * 0.6}s`,
            animationDuration: `${8 + (index % 5)}s`,
            transform: `scale(${0.75 + (index % 4) * 0.08})`
          }}
        />
      ))}
    </div>
  );
}
