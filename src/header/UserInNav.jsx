import { NavLink } from "react-router-dom";
import { useCurUser } from "../hooks/useCurUser";
import { useLogOut } from "../hooks/useLogout";
import { useAlertConfirm } from "../Alert/AlertConfirmContext";

export default function UserInNav() {
  const { isLoadingCurUser, curUser, curUserError } = useCurUser();
  const { logout, isLoggingOut, logoutError } = useLogOut();
  const { alertConfirm } = useAlertConfirm();

  const { user_name, real_name, avatar_link } = curUser || {};

  const navName = user_name || real_name;
  const userAvatar = avatar_link;

  return curUser ? (
    <>
      <NavLink className="nav__el current-user" to={`/users/${curUser.id}`}>
        <img
          src={userAvatar}
          alt={`avatar of ${navName}`}
          className="nav__user-img"
        ></img>
        <span>
          {navName.length <= 10 ? navName : navName.slice(0, 10) + "..."}
        </span>
      </NavLink>
      <a
        disabled={isLoggingOut}
        className="nav__el nav__el--cta"
        onClick={logout}
      >
        Log out
      </a>
    </>
  ) : (
    <>
      <NavLink
        disabled={isLoadingCurUser}
        to="/signUp"
        className="nav__el nav__el--cta"
      >
        Sign Up
      </NavLink>
      <NavLink
        disabled={isLoadingCurUser}
        to="/logIn"
        className="nav__el nav__el--cta"
      >
        Login
      </NavLink>
    </>
  );
}
