import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlertTop } from "../Alert/AlertTopContext";
import { getUserInfo, updateCurrentUser } from "../DBService/apiAuth";

export function useEditCurUser() {
  const queryClient = useQueryClient();
  const { alertTop } = useAlertTop();

  const {
    mutate: editCurUser,
    isPending: isEditingCurUser,
    error: editCurUserError,
  } = useMutation({
    mutationFn: (params) => updateCurrentUser(params),
    onSuccess: (data) => {
      queryClient.setQueryData(["curUser"], getUserInfo(data?.user));
      alertTop(`User Updated Successfully`, "success");
    },
    onError: (err) => {
      alertTop(err.message, "error", 2000);
    },
  });

  return { editCurUser, isEditingCurUser, editCurUserError };
}
