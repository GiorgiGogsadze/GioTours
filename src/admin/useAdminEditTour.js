import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminEditTour } from "./apiAdminTours";
import { useAlertTop } from "../Alert/AlertTopContext";

export function useAdminEditTour() {
  const queryClient = useQueryClient();
  const { alertTop } = useAlertTop();

  const {
    mutate: editTour,
    isPending: isEditingTour,
    error: editTourError,
  } = useMutation({
    mutationFn: ({ oldTour, updatedTour, newImg, renew }) =>
      adminEditTour({ oldTour, updatedTour, newImg, renew }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminTours"],
      });
      alertTop("The Tour was edited", "success");
    },
    onError: (err) => {
      alertTop(err.message, "error", 2000);
    },
  });
  return { editTour, isEditingTour, editTourError };
}
