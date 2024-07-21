import { useState } from "react";
import { useUrl } from "../hooks/useUrl";
import ErrorPage from "./ErrorPage";
import { Link } from "react-router-dom";
export default function CustomUrlSelector({
  field,
  defaultValue,
  options,
  handleClick,
  mainClass,
  optContClass,
  optClass,
  optClassActive,
}) {
  const [drop, setDrop] = useState(false);
  const { value: param, setValue: setParam } = useUrl(field);
  if (!options || options.length === 0) return;
  let value = param || defaultValue || options[0].value;
  let option = options.find((el) => el.value === value);
  if (!option) {
    value = defaultValue || options[0].value;
    option = options.find((el) => el.value === value);
  }
  return (
    <div
      style={{ position: "relative", cursor: "pointer" }}
      onClick={() => setDrop((b) => !b)}
      onMouseLeave={() => setDrop(false)}
    >
      <div
        className={mainClass}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p>{option.label}</p>
        <span>▼</span>
      </div>
      {drop ? (
        <div
          style={{ position: "absolute", width: "100%", zIndex: 100 }}
          className={optContClass}
        >
          {options.map((el) => (
            <div
              key={el.value}
              className={`${optClass} ${
                el.value === value ? optClassActive : ""
              }`}
              onClick={() => {
                if (el.value === value) return;
                setParam(el.value);
                handleClick?.(el.value);
              }}
            >
              {el.label}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
