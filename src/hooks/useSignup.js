import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserInfo, signup as signupApi } from "../DBService/apiAuth";
import { useNavigate } from "react-router-dom";
import { useAlertTop } from "../Alert/AlertTopContext";
import { useUrl } from "./useUrl";

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { alertTop } = useAlertTop();
  const { value: transferto } = useUrl("transferto");

  const {
    mutate: signup,
    isPending: isSigningUp,
    error: signupErr,
  } = useMutation({
    mutationFn: ({ fullName, userName, password, email, phone }) =>
      signupApi({ fullName, userName, password, email, phone }),
    onSuccess: (data) => {
      queryClient.setQueryData(["curUser"], getUserInfo(data?.user));
      alertTop("Account sucessfully created!", "success");
      navigate(transferto || "/", { replace: true });
    },
    onError: (err) => {
      alertTop(err.message, "error", 2000);
    },
  });

  return { signup, isSigningUp, signupErr };
}
