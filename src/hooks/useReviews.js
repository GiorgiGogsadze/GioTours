import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../DBService/apiReviews";

export function useReviews() {
  const {
    isPending: isLoadingReviews,
    data: reviews,
    error: reviewsError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => getReviews(),
    retry: false,
  });
  return { isLoadingReviews, reviews, reviewsError };
}
