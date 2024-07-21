import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../DBService/apiAuth";

export function useCurUser() {
  const {
    isPending: isLoadingCurUser,
    data: curUser,
    error: curUserError,
  } = useQuery({
    queryKey: ["curUser"],
    queryFn: getCurrentUser,
    retry: false,
  });

  return {
    isLoadingCurUser,
    curUser,
    curUserError,
    isAuthenticated: curUser?.role === "authenticated",
  };
}
