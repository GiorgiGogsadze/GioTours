import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAddTour } from "./apiAdminTours";
import { useAlertTop } from "../Alert/AlertTopContext";

export function useAdminAddTour() {
  const queryClient = useQueryClient();
  const { alertTop } = useAlertTop();

  const {
    mutate: addTour,
    isPending: isAddingTour,
    error: addTourError,
  } = useMutation({
    mutationFn: ({ tour, image }) => adminAddTour({ tour, image }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminTours"],
      });
      alertTop("The Tour was added", "success");
    },
    onError: (err) => {
      alertTop(err.message, "error", 2000);
    },
  });
  return { addTour, isAddingTour, addTourError };
}
