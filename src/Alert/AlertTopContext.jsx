import { createContext, useContext, useState } from "react";

const AlertTopContext = createContext();

function AlertTopProvider({ children }) {
  const [isOn, setIsOn] = useState(false);
  const [type, setType] = useState("notify");
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(1500);

  function alertTop(message, type = "notify", duration = 1500) {
    setType(type);
    setMessage(message);
    setDuration(duration);
    setIsOn(true);
  }

  function clearAlertTop() {
    setIsOn(false);
    setType("notify");
    setMessage("");
    setDuration(1500);
  }

  return (
    <AlertTopContext.Provider
      value={{ isOn, type, message, duration, alertTop, clearAlertTop }}
    >
      {children}
    </AlertTopContext.Provider>
  );
}

function useAlertTop() {
  const context = useContext(AlertTopContext);
  if (context === undefined)
    throw new Error("Alert Context was used outside of Provider");
  return context;
}

export { AlertTopProvider, useAlertTop };
