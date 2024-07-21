import { useState } from "react";
import MediaOptions from "./MediaOptions";
import { useLogin } from "../hooks/useLogin";
import SpinnerMini from "../components/SpinnerMini";
import { Link } from "react-router-dom";
import { useUrl } from "../hooks/useUrl";

export default function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggingIn, loginError } = useLogin();
  const { value: transferto } = useUrl("transferto");

  function clearFields() {
    setUserName("");
    setPassword("");
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!userName || !password) return;
    login({ userName, password }, { onSuccess: clearFields });
  }
  return (
    <div className="main-form">
      <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
      <form className="form form--main" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label" htmlFor="userName">
            User Name
          </label>
          <input
            autoCorrect="off"
            autoCapitalize="none"
            className="form__input"
            id="userName"
            type="text"
            required
            value={userName}
            disabled={isLoggingIn}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            className="form__input"
            id="password"
            type="password"
            required
            value={password}
            disabled={isLoggingIn}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form__group">
          <button
            type="submit"
            className="btn btn--green"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? <SpinnerMini /> : "Login"}
          </button>
        </div>
      </form>
      <div className="form__message">
        <p>Don&apos;t have account? </p>{" "}
        <Link to={transferto ? `/signup?transferto=${transferto}` : "/signup"}>
          Sign up
        </Link>
        <p>or</p>
      </div>
      <MediaOptions />
    </div>
  );
}
