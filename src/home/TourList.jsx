import TourCard from "./TourCard";
import { useSelector } from "react-redux";

export default function TourList() {
  const { currentLang } = useSelector((state) => state.lang);
  const { tours } = useSelector((state) => state.tours);

  if (tours.length === 0)
    return <h1 className="heading-secondary">No Tours have been found!</h1>;
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
