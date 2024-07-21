import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlertTop } from "../Alert/AlertTopContext";
import { changeAccountAccess as changeAccountAccessApi } from "../DBService/apiAccounts";

export function useChangeAccountAccess(userId) {
  const queryClient = useQueryClient();
  const { alertTop } = useAlertTop();

  const {
    mutate: changeAccountAccess,
    isPending: isChangingAccountAccess,
    error: changeAccountAccessError,
  } = useMutation({
    mutationFn: (isPublic) => changeAccountAccessApi(userId, isPublic),
    onSuccess: (data) => {
      queryClient.setQueryData(["account", userId], data);
    },
    onError: (err) => {
      alertTop(err.message, "error", 2000);
    },
  });

  return {
    changeAccountAccess,
    isChangingAccountAccess,
    changeAccountAccessError,
  };
}
