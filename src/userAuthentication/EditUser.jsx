import { useForm } from "react-hook-form";
import { useCurUser } from "../hooks/useCurUser";
import UserInfoForm from "./UserInfoForm";
import { useCallback, useEffect } from "react";
import AvatarChanger from "./AvatarChanger";
import { useEditCurUser } from "../hooks/useEditCurUser";

// protected by authGate
export default function EditUser() {
  const { curUser, isLoadingCurUser, curUserError } = useCurUser();
  const { isRegisteredHere, real_name, email, phone, user_name, avatar_link } =
    curUser;
  const { editCurUser, isEditingCurUser, editCurUserError } = useEditCurUser();

  const genForm = useForm();
  const pasForm = useForm();

  const initalizeGeneralInfo = useCallback(() => {
    genForm.setValue("fullName", real_name);
    genForm.setValue("email", email);
    genForm.setValue("phone", phone);
    genForm.setValue("userName", user_name);
  }, [genForm, real_name, email, phone, user_name]);

  useEffect(() => {
    initalizeGeneralInfo();
  }, [initalizeGeneralInfo]);

  function isDisabled(name) {
    return (
      (name === "email" && !isRegisteredHere && email) ||
      (name === "phone" && !isRegisteredHere && phone) ||
      (name === "userName" && user_name)
    );
  }

  function onGeneralSave({
    fullName,
    email: emailPar,
    phone: phonePar,
    userName,
  }) {
    const parameters = {};
    if (fullName !== real_name) parameters.fullName = fullName;
    if (!isDisabled("email") && emailPar !== email) parameters.email = emailPar;
    if (!isDisabled("phone") && phonePar !== phone) parameters.phone = phonePar;
    if (
      !isDisabled("userName") &&
      userName !== curUser.user_metadata.user_name
    ) {
      parameters.userName = userName;
      if (isRegisteredHere) parameters.doChangeEmail = true;
    }
    if (Object.keys(parameters).length === 0) return;
    parameters.type = "general";
    editCurUser(parameters, { onSettled: initalizeGeneralInfo });
  }

  function onAvatarSave({ avatarFile }) {
    editCurUser({
      type: "avatar",
      avatarId: curUser.id,
      oldAvatarUrl: avatar_link,
      avatarFile,
    });
  }

  function onPasswordSave({ password }) {
    editCurUser(
      { type: "password", newPassword: password },
      { onSuccess: pasForm.reset }
    );
  }

  return (
    <div className="edit__container">
      <UserInfoForm
        onSubmit={onGeneralSave}
        type="edit"
        isLoading={isEditingCurUser}
        form={genForm}
        include="general"
        customTitle="Edit General Info"
        isDisabled={isDisabled}
      />
      <AvatarChanger
        curAvatar={avatar_link}
        onSubmit={onAvatarSave}
        isLoading={isEditingCurUser}
      />
      {isRegisteredHere && (
        <UserInfoForm
          onSubmit={onPasswordSave}
          type="edit"
          isLoading={isEditingCurUser}
          form={pasForm}
          include="password"
          customTitle="Change Password"
        />
      )}
    </div>
  );
}
