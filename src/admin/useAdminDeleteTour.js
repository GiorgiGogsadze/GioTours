import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminDeleteTour } from "./apiAdminTours";
import { useAlertTop } from "../Alert/AlertTopContext";

export function useAdminDeleteTour() {
  const queryClient = useQueryClient();
  const { alertTop } = useAlertTop();

  const {
    mutate: deleteTour,
    isPending: isDeletingTour,
    error: deleteTourError,
  } = useMutation({
    mutationFn: (tourId) => adminDeleteTour(tourId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminTours"],
      });
      alertTop("The Tour was deleted", "success");
    },
    onError: (err) => {
      alertTop(err.message, "error", 2000);
    },
  });
  return { deleteTour, isDeletingTour, deleteTourError };
}
