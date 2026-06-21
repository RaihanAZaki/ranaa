export default function MagicParticles({ amount = 20 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(amount)].map((_, index) => (
        <span
          key={index}
          className="magic-particle"
          style={{
            left: `${(index * 31) % 100}%`,
            top: `${(index * 47) % 100}%`,
            animationDelay: `${index * 0.19}s`,
            animationDuration: `${2.8 + (index % 5) * 0.6}s`
          }}
        />
      ))}
    </div>
  );
}
