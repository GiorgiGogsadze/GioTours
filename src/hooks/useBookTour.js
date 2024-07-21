import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlertTop } from "../Alert/AlertTopContext";
import { createBooking } from "../DBService/apiBookings";

export function useBookTour() {
  const queryClient = useQueryClient();
  const { alertTop } = useAlertTop();

  const {
    mutate: bookTour,
    isPending: isBookingTour,
    error: bookTourError,
  } = useMutation({
    mutationFn: ({ userId, tourId }) => createBooking({ userId, tourId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
      alertTop("You Booked the tour", "success");
    },
    onError: (err) => {
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
      alertTop(err.message, "error", 2000);
    },
  });

  return { bookTour, isBookingTour, bookTourError };
}
