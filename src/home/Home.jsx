import ListParameters from "./ListParameters";
import TourList from "../tours/TourList";
import { useTours } from "../hooks/useTours";
import Spinner from "../components/Spinner";
import ErrorPage from "../components/ErrorPage";

export default function Home() {
  const { isLoadingTours, tours, toursError } = useTours();
  if (toursError)
    return (
      <ErrorPage message="There was Error Loading Tours. Try again later" />
    );
  return (
    <>
      <ListParameters />
      {isLoadingTours ? <Spinner /> : <TourList tours={tours} />}
    </>
  );
}
