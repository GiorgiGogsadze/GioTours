import { useState } from "react";
import MediaOptions from "./MediaOptions";
import { useDispatch } from "react-redux";
import UserAlert from "./UserAlert";
import { createUser } from "./data/usersSlice";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !name || !password1 || !password2) return;
    dispatch(createUser({ email, userName: name, password1, password2 }));
  }

  function clearFields() {
    setEmail("");
    setName("");
    setPassword1("");
    setPassword2("");
  }
  return (
    <>
      <UserAlert clearFields={clearFields} />
      <div className="main-form">
        <h2 className="heading-secondary ma-bt-lg">Cretae Account</h2>
        <form className="form form--main" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Enter Email
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              placeholder="george@example.com"
              required=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Create User Name
            </label>
            <input
              className="form__input"
              id="name"
              type="text"
              placeholder="George19"
              required=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password1">
              Create Password
            </label>
            <input
              className="form__input"
              id="password1"
              type="password"
              placeholder="••••••••"
              required=""
              minLength="6"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password2">
              Confirm Password
            </label>
            <input
              className="form__input"
              id="password2"
              type="password"
              placeholder="••••••••"
              required=""
              minLength="6"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <div className="form__group">
            <button type="submit" className="btn btn--green">
              Sign up
            </button>
          </div>
        </form>

        <MediaOptions />
      </div>
    </>
  );
}
