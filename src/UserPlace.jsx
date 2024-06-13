import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "./data/usersSlice";

export default function UserPlace() {
  const { currentUser } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  return currentUser.userName ? (
    <>
      <div className="current-user">
        <span>{currentUser.userName}</span>
      </div>
      <a className="nav__el nav__el--cta" onClick={() => dispatch(logout())}>
        Log out
      </a>
    </>
  ) : (
    <>
      <NavLink to="/signUp" className="nav__el nav__el--cta">
        Sign Up
      </NavLink>
      <NavLink to="/logIn" className="nav__el nav__el--cta">
        Login
      </NavLink>
    </>
  );
}
