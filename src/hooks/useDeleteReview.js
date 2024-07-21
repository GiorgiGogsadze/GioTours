import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlertTop } from "../Alert/AlertTopContext";
import { deleteReview as deleteReviewApi } from "../DBService/apiReviews";

export function useDeleteReview() {
  const queryClient = useQueryClient();
  const { alertTop } = useAlertTop();

  const {
    mutate: deleteReview,
    isPending: isDeletingReview,
    error: deleteReviewError,
  } = useMutation({
    mutationFn: ({ accountId }) => deleteReviewApi({ accountId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      alertTop("Review was deleted", "success");
    },
    onError: (err) => {
      alertTop(err.message, "error", 2000);
    },
  });

  return { deleteReview, isDeletingReview, deleteReviewError };
}
