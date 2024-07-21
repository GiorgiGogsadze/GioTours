import useOutsideClick from "../hooks/useOutsideClick";
import s from "../styles/Alert.module.css";
import { useAlertConfirm } from "./AlertConfirmContext";

export default function AlertConfirm() {
  const { isOn, confirmLabel, message, onConfirm, clearAlertConfirm } =
    useAlertConfirm();
  const container = useOutsideClick(clearAlertConfirm);
  if (!isOn) return null;
  return (
    <div className={s.alertConfirmContainer}>
      <div className={s.alertConfirm} ref={container}>
        <button className={s.exitIcon} onClick={clearAlertConfirm}>
          &#x2718;
        </button>
        <p className={s.message}>{message}</p>
        <div className={s.buttonContainer}>
          <button
            className="btn btn--white btn--small"
            onClick={clearAlertConfirm}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              clearAlertConfirm();
              onConfirm();
            }}
            className="btn btn--red btn--small"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
