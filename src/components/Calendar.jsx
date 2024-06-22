import { useEffect, useState } from "react";

const calculateTimeLeft = (difference) => {
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

  return { days, hours };
};

export default function Calendar({ difference }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(difference));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(difference));
    }, 3600000); // Update every hour

    return () => clearInterval(timer);
  }, [difference]);

  return (
    <span>
      Starts in {timeLeft.days} days, {timeLeft.hours} hours
    </span>
  );
}
