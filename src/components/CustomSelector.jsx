import { useState } from "react";

export default function CustomSelector({
  options,
  value,
  handleClick,
  mainClass,
  optContClass,
  optClass,
}) {
  const [drop, setDrop] = useState(false);
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
        <span>{options.find((el) => el.value === value).label}</span>
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
              onClick={() => handleClick(el.value)}
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
