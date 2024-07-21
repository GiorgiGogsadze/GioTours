import { useAlertTop } from "./AlertTopContext";
import s from "../styles/Alert.module.css";
import { useEffect } from "react";

export default function AlertTop() {
  const { isOn, duration, message, type, clearAlertTop } = useAlertTop();
  useEffect(() => {
    if (!isOn) return;
    setTimeout(() => {
      clearAlertTop();
    }, duration);
  }, [isOn, clearAlertTop, duration]);
  if (!message || !isOn) return null;
  return (
    <div className={`${s.alertTop} ${s[`alertTop--${type}`]}`}>{message}</div>
  );
}
