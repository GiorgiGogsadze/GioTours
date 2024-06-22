import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { clearAlert } from "../data/usersSlice";
import { useEffect } from "react";

export default function UserAlert({ clearFields }) {
  const { error, success } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        clearFields();
        dispatch(clearAlert());
        navigate("/");
      }, 1000);
    }
    if (error) {
      clearFields();
      setTimeout(() => {
        dispatch(clearAlert());
      }, 2000);
    }
  }, [dispatch, navigate, success, error, clearFields]);

  return (
    <>
      {error ? <Alert type="error" message={error} /> : ""}
      {success ? <Alert type="success" message={success} /> : ""}
    </>
  );
}
