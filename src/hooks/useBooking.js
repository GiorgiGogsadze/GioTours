import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../DBService/apiBookings";

export function useBooking({ userId, tourId }) {
  const {
    isPending: isLoadingBooking,
    data: booking,
    error: bookingError,
  } = useQuery({
    queryKey: ["booking", userId, tourId],
    queryFn: () => getBooking({ userId, tourId }),
    retry: false,
    // refetchInterval: 5000,
  });
  return { isLoadingBooking, booking, bookingError };
}
