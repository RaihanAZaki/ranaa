import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const value = documentHeight <= 0 ? 0 : (window.scrollY / documentHeight) * 100;
      setProgress(value);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[80] h-1 w-full bg-transparent">
      <div className="h-full bg-roseLove transition-all duration-150" style={{ width: `${progress}%` }} />
    </div>
  );
}
