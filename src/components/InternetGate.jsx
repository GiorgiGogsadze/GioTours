import { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";

export default function InternetGate({ children }) {
  const [isInternet, setIsInternet] = useState(window.navigator.onLine);
  useEffect(() => {
    window.addEventListener("offline", () => setIsInternet(false));
    window.addEventListener("online", () => setIsInternet(true));
  }, []);
  return isInternet ? (
    children
  ) : (
    <ErrorPage message="Please, connect to Internet" />
  );
}
