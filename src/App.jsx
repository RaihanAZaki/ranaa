import { useEffect, useMemo, useState } from "react";
import { CONFIG } from "./config";
import { getDaysTogether, getTimeLeft } from "./utils/date";
import { trackVisitor } from "./utils/visitorTracker";
import Navbar from "./components/layout/Navbar";
import OpeningScene from "./components/sections/OpeningScene";
import Hero from "./components/sections/Hero";
import Countdown from "./components/sections/Countdown";
import Memories from "./components/sections/Memories";
import WishSection from "./components/sections/WishSection";
import LoveLetter from "./components/sections/LoveLetter";
import Gallery from "./components/sections/Gallery";
import FinalMessage from "./components/sections/FinalMessage";
import MusicButton from "./components/controls/MusicButton";
import GiftSurprise from "./components/controls/GiftSurprise";
import ScrollProgress from "./components/effects/ScrollProgress";
import CursorTrail from "./components/effects/CursorTrail";
import Fireworks from "./components/effects/Fireworks";

export default function App() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(CONFIG.birthdayDate));
  const [fireworkTrigger, setFireworkTrigger] = useState(0);
  const [showOpening, setShowOpening] = useState(true);
  const daysTogether = useMemo(() => getDaysTogether(CONFIG.relationshipStart), []);

  const runFireworks = () => setFireworkTrigger((value) => value + 1);

  useEffect(() => {
    trackVisitor();
  }, []);

  const openSurprise = () => {
    runFireworks();
    window.setTimeout(() => setShowOpening(false), 900);
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(getTimeLeft(CONFIG.birthdayDate));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <main className="overflow-x-hidden">
      <ScrollProgress />
      <CursorTrail />
      <Fireworks trigger={fireworkTrigger} />
      {showOpening && <OpeningScene onOpen={openSurprise} />}
      <Navbar />
      <Hero daysTogether={daysTogether} onFireworks={runFireworks} />
      <Countdown timeLeft={timeLeft} />
      <Memories />
      <WishSection />
      <LoveLetter />
      <Gallery />
      <FinalMessage onFireworks={runFireworks} />
      <GiftSurprise onFireworks={runFireworks} />
      <MusicButton />
    </main>
  );
}
