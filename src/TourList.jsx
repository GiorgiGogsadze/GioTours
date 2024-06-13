import TourCard from "./TourCard";
import { useSelector } from "react-redux";

export default function TourList() {
  const { currentLang } = useSelector((state) => state.lang);
  const { tours } = useSelector((state) => state.tours);

  return (
    <div className="card-container">
      {tours.map((el) => (
        <TourCard
          key={el.id}
          id={el.id}
          imgSrc={el.imgSrc}
          price={el.price}
          startDate={el.startDate}
          title={el[currentLang].title}
          location={el[currentLang].location}
        />
      ))}
    </div>
  );
}
