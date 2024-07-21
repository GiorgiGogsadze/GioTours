import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../DBService/apiAuth";
import { useAlertTop } from "../Alert/AlertTopContext";
import { useNavigate } from "react-router-dom";

export function useLogOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { alertTop } = useAlertTop();

  const {
    mutate: logout,
    isPending: isLoggingOut,
    error: logoutError,
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      alertTop("user logged out", "notify");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      alertTop("can't log out user now", "error");
    },
  });
  return { logout, isLoggingOut, logoutError };
}
