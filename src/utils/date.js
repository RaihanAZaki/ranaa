export const isBirthdayToday = () => {
  const today = new Date();

  // 5 = Juni, karena bulan JavaScript mulai dari 0
  return today.getMonth() === 5 && today.getDate() === 23;
};

export function getTimeLeft(targetDate) {
  const difference = new Date(targetDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
}

export function getDaysTogether(startDate) {
  const difference = new Date().getTime() - new Date(startDate).getTime();
  return Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24)));
}
