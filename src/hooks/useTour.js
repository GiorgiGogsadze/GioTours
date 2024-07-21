import { useQuery } from "@tanstack/react-query";
import { getTourById } from "../DBService/apiTours";
import { useParams } from "react-router-dom";

export function useTour() {
  const { tourId } = useParams();
  const {
    isPending: isLoadingTour,
    data: tour,
    error: tourError,
  } = useQuery({
    queryKey: ["tour", +tourId],
    queryFn: () => getTourById(+tourId),
    retry: false,
    // refetchInterval: 5000,
  });
  return { isLoadingTour, tour, tourError };
}
