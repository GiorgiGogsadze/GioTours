import { useForm } from "react-hook-form";
import { useSignup } from "../hooks/useSignup";
import UserInfoForm from "./UserInfoForm";
import MediaOptions from "./MediaOptions";

export default function SignUpForm() {
  const { signup, isSigningUp, signupErr } = useSignup();
  const form = useForm();

  function onSubmit({ fullName, userName, password, email, phone }) {
    signup(
      { fullName, userName, password, email, phone },
      { onSuccess: form.reset }
    );
  }

  return (
    <UserInfoForm
      onSubmit={onSubmit}
      type="create"
      isLoading={isSigningUp}
      form={form}
      formMessage={
        <div className="form__message">
          <p>
            Remember <span>USER NAME</span> and <span>PASSWORD</span>
          </p>
        </div>
      }
    >
      <div className="form__message">
        <p>or</p>
      </div>
      <MediaOptions />
    </UserInfoForm>
  );
}
