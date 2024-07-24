import { Outlet, useNavigate } from "react-router-dom";
import s from "./Admin.module.css";
import { useCurUser } from "../hooks/useCurUser";
// import { useEffect } from "react";
import Spinner from "../components/Spinner";

export default function AdminGate() {
  const { curUser, isLoadingCurUser, curUserError } = useCurUser();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // if (curUserError || (!isLoadingCurUser && !curUser?.is_super_admin))
  //   if (!isLoadingCurUser) {
  //     if (curUser && !curUser.is_super_admin) {
  //       navigate("/", { replace: true });
  //     } else if (!curUser || curUserError || !curUser.is_super_admin) {
  //       navigate("/login?transferto=/admin", { replace: true });
  //     }
  //   }
  // }, [isLoadingCurUser, curUserError, navigate, curUser]);

  if (isLoadingCurUser) return <Spinner />;

  // if (curUser?.is_super_admin) return <Outlet />;
  return (
    <>
      {curUser?.is_super_admin || (
        <p className={s.topMessage}>
          You aren&apos;t logged in with admin account. You see this page as
          Route Protection is disabled, but your changes wont be saved.
        </p>
      )}
      <Outlet />
    </>
  );
}
