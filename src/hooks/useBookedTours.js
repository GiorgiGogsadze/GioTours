import { useQuery } from "@tanstack/react-query";
import { getBookedTours } from "../DBService/apiBookings";

export function useBookedTours({ userId }) {
  const {
    isPending: isLoadingBookedTours,
    data: bookedTours,
    error: bookedToursError,
  } = useQuery({
    queryKey: ["bookedTours", userId],
    queryFn: () => getBookedTours({ userId }),
    retry: false,
  });
  return { isLoadingBookedTours, bookedTours, bookedToursError };
}
