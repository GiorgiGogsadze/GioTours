import { createContext, useContext, useState } from "react";

const AlertConfirmContext = createContext();

function AlertConfirmProvider({ children }) {
  const [isOn, setIsOn] = useState(false);
  const [confirmLabel, setConfirmLabel] = useState("Confirm");
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState();

  function alertConfirm(onConfirm, message, confirmLabel = "Confirm") {
    setMessage(message);
    setConfirmLabel(confirmLabel);
    setOnConfirm(() => onConfirm);
    setIsOn(true);
  }

  function clearAlertConfirm() {
    setIsOn(false);
    setConfirmLabel("Confirm");
    setMessage("");
    setOnConfirm();
  }

  return (
    <AlertConfirmContext.Provider
      value={{
        isOn,
        setIsOn,
        confirmLabel,
        message,
        onConfirm,
        clearAlertConfirm,
        alertConfirm,
      }}
    >
      {children}
    </AlertConfirmContext.Provider>
  );
}

function useAlertConfirm() {
  const context = useContext(AlertConfirmContext);
  if (context === undefined)
    throw new Error("Alert Context was used outside of Provider");
  return context;
}

export { AlertConfirmProvider, useAlertConfirm };
