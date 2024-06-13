import { useState } from "react";

export default function CustomSelector({
  options,
  defaultValue,
  handleClick,
  mainClass,
  optContClass,
  optClass,
}) {
  const [drop, setDrop] = useState(false);
  const [mainValue, setMainValue] = useState(defaultValue);
  if (!options) return;
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
        <span>{options.find((el) => el.value === mainValue).label}</span>
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
              className={optClass}
              onClick={() => {
                setMainValue(el.value);
                handleClick(el.value);
              }}
            >
              {el.label}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
