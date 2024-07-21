import { useEffect, useRef } from "react";

export default function useOutsideClick(
  onOutsideClick,
  { exceptIds, listenCapturing = true } = {}
) {
  const ref = useRef();
  useEffect(() => {
    function close(e) {
      const exceptContains =
        exceptIds &&
        exceptIds.reduce((acc, el) => {
          return acc || document.getElementById(el)?.contains(e.target);
        }, false);

      if (ref.current && !ref.current.contains(e.target) && !exceptContains)
        onOutsideClick();
    }
    document.addEventListener("click", close, listenCapturing);
    return () => document.removeEventListener("click", close, listenCapturing);
  }, [exceptIds, onOutsideClick, listenCapturing]);
  return ref;
}
