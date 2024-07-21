import { useUrl } from "../hooks/useUrl";

export default function CustomSelector({
  field,
  options,
  handleClick,
  optContClass,
  optClass,
  optClassActive,
  defaultValues,
}) {
  const {
    value: param,
    setValue: setParam,
    remove: removeParam,
  } = useUrl(field);
  if (!options || options.length === 0) return;
  const value =
    param || (defaultValues ? defaultValues.join(",") + "," : undefined) || "";
  return (
    <div className={optContClass}>
      {options.map((el) => {
        const isActive = value?.includes(el.value + ",");
        return (
          <div
            key={el.value}
            className={`${optClass} ${isActive ? optClassActive : ""}`}
            onClick={() => {
              if (isActive) {
                const newValue = value.split(el.value + ",").join("");
                newValue ? setParam(newValue) : removeParam();
              } else {
                setParam(value ? value + el.value + "," : el.value + ",");
              }
              handleClick?.(el.value, isActive);
            }}
          >
            {el.label}
          </div>
        );
      })}
    </div>
  );
}
