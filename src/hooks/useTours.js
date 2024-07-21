import { useQuery } from "@tanstack/react-query";
import { getTours } from "../DBService/apiTours";
import { useSearchParams } from "react-router-dom";

export function useTours() {
  const [searchParams] = useSearchParams();
  const season = searchParams.get("season");
  const sort = searchParams.get("sort");
  const query = searchParams.get("query");

  const {
    isPending: isLoadingTours,
    data: tours,
    error: toursError,
  } = useQuery({
    queryKey: ["tours", season, sort, query],
    queryFn: () => getTours({ season, sort, query }),
    retry: false,
  });
  return { isLoadingTours, tours, toursError };
}
