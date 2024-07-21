import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlertTop } from "../Alert/AlertTopContext";
import { setReview } from "../DBService/apiReviews";

export function useWriteReview() {
  const queryClient = useQueryClient();
  const { alertTop } = useAlertTop();

  const {
    mutate: writeReview,
    isPending: isWritingReview,
    error: writeReviewError,
  } = useMutation({
    mutationFn: ({ accountId, review, rate }) =>
      setReview({ accountId, review, rate }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      alertTop("Thank you for your review", "success");
    },
    onError: (err) => {
      alertTop(err.message, "error", 2000);
    },
  });

  return { writeReview, isWritingReview, writeReviewError };
}
