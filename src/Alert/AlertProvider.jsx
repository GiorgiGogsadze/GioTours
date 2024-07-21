import { AlertConfirmProvider } from "./AlertConfirmContext";
import { AlertTopProvider } from "./AlertTopContext";

export default function AlertProvider({ children }) {
  return (
    <AlertConfirmProvider>
      <AlertTopProvider>{children}</AlertTopProvider>
    </AlertConfirmProvider>
  );
}
