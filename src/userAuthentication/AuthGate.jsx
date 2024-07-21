import { useNavigate } from "react-router-dom";
import { useCurUser } from "../hooks/useCurUser";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

export default function AuthGate({ children }) {
  const { isLoadingCurUser, curUserError, isAuthenticated } = useCurUser();
  const navigate = useNavigate();
  useEffect(() => {
    if ((!isLoadingCurUser && !isAuthenticated) || curUserError)
      navigate("/login");
  }, [isAuthenticated, isLoadingCurUser, curUserError, navigate]);
  if (isLoadingCurUser) return <Spinner />;
  if (isAuthenticated) return children;
}
