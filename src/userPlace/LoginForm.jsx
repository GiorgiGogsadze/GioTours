import { useState } from "react";
import MediaOptions from "./MediaOptions";
import UserAlert from "./UserAlert";
import { useDispatch } from "react-redux";
import { login } from "../data/usersSlice";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  function clearFields() {
    setName("");
    setPassword("");
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !password) return;
    dispatch(login({ name, password }));
  }
  return (
    <>
      <UserAlert clearFields={clearFields} />
      <div className="main-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form className="form form--main" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Enter User Name or Email
            </label>
            <input
              className="form__input"
              id="name"
              type="text"
              placeholder=""
              required=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              className="form__input"
              id="password"
              type="password"
              placeholder="••••••••"
              required=""
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form__group">
            <button type="submit" className="btn btn--green">
              Login
            </button>
          </div>
        </form>
        <MediaOptions />
      </div>
    </>
  );
}
