import { useEffect, useState } from "react";
import { isDateActive } from "../helper/isDateActive";

const calculateTimeLeft = (difference) => {
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  return { days, hours, minutes };
};

export default function Timer({ toDate }) {
  const [difference, setDifference] = useState(
    () => new Date(toDate) - new Date()
  );
  const timeLeft = calculateTimeLeft(difference);

  useEffect(() => {
    if (!isDateActive(toDate)) return;
    const timer = setInterval(() => {
      setDifference(new Date(toDate) - new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [toDate]);

  if (difference < 0) return null;
  return (
    <div className="overview-box__detail timer-container">
      <svg className="overview-box__icon">
        <use xlinkHref="/img/icons.svg#icon-clock"></use>
      </svg>
      Starts in:
      <span>{timeLeft.days}</span> days
      <span>{timeLeft.hours}</span> hours
      <span>{timeLeft.minutes}</span> minutes
    </div>
  );
}
