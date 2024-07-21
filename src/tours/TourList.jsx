import ErrorPage from "../components/ErrorPage";
import TourCard from "./TourCard";

export default function TourList({ tours }) {
  if (!tours)
    return <ErrorPage message="Couldn't get bookings. Try again later" />;
  if (tours.length === 0)
    return <h1 className="heading-secondary">No Tours</h1>;
  return (
    <div className="card-container">
      {tours.map((el) => (
        <TourCard key={el.id} tour={el} />
      ))}
    </div>
  );
}
