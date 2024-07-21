import { useQuery } from "@tanstack/react-query";
import { adminGetTours } from "./apiAdminTours";
import { useSearchParams } from "react-router-dom";

export function useAdminTours() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const {
    data: adminTours,
    isPending: isLoadingAdminTours,
    error: adminToursError,
  } = useQuery({
    queryKey: ["adminTours", query],
    queryFn: () => adminGetTours(query),
  });

  return { adminTours, isLoadingAdminTours, adminToursError };
}
