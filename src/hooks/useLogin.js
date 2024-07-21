import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi, getUserInfo } from "../DBService/apiAuth";
import { useNavigate } from "react-router-dom";
import { useAlertTop } from "../Alert/AlertTopContext";
import { useUrl } from "./useUrl";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { value: transferto } = useUrl("transferto");

  const { alertTop } = useAlertTop();
  const {
    mutate: login,
    isPending: isLoggingIn,
    error: loginError,
  } = useMutation({
    mutationFn: ({ userName, password }) => loginApi({ userName, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["curUser"], getUserInfo(data?.user));
      alertTop(`Welcome ${getUserInfo(data?.user).real_name || ""}`, "success");
      navigate(transferto || "/", { replace: true });
    },
    onError: (err) => {
      alertTop(err.message, "error", 2000);
    },
  });

  return { login, isLoggingIn, loginError };
}
