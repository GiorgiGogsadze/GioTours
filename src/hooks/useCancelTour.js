import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlertTop } from "../Alert/AlertTopContext";
import { deleteBooking } from "../DBService/apiBookings";

export function useCanctelTour() {
  const queryClient = useQueryClient();
  const { alertTop } = useAlertTop();

  const {
    mutate: cancelTour,
    isPending: isCancelingTour,
    error: cancelTourError,
  } = useMutation({
    mutationFn: ({ userId, tourId }) => deleteBooking({ userId, tourId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
      alertTop("You Canceled the Booking", "success");
    },
    onError: (err) => {
      alertTop(err.message, "error", 2000);
    },
  });

  return { cancelTour, isCancelingTour, cancelTourError };
}
