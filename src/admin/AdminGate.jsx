import { Outlet, useNavigate } from "react-router-dom";
import { useCurUser } from "../hooks/useCurUser";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

export default function AdminGate() {
  const { curUser, isLoadingCurUser, curUserError } = useCurUser();
  const navigate = useNavigate();

  useEffect(() => {
    // if (curUserError || (!isLoadingCurUser && !curUser?.is_super_admin))
    if (!isLoadingCurUser) {
      if (curUser && !curUser.is_super_admin) {
        navigate("/", { replace: true });
      } else if (!curUser || curUserError || !curUser.is_super_admin) {
        navigate("/login?transferto=/admin", { replace: true });
      }
    }
  }, [isLoadingCurUser, curUserError, navigate, curUser]);

  if (isLoadingCurUser) return <Spinner />;

  if (curUser?.is_super_admin) return <Outlet />;
}
