import s from "../styles/ListParameters.module.css";
import CustomUrlChooser from "../components/CustomUrlChooser";
import CustomUrlSelector from "../components/CustomUrlSelector";
import { useState } from "react";

const sortOptions = [
  { value: "id-desc", label: "Newly added" },
  { value: "start_date-asc", label: "start date ↑" },
  { value: "start_date-desc", label: "start date ↓" },
  { value: "price-asc", label: "Price ↑" },
  { value: "price-desc", label: "Price ↓" },
  { value: "number_of_bookings-asc", label: "bookings ↑" },
  { value: "number_of_bookings-desc", label: "bookings ↓" },
];

const seasonOptions = [
  { value: "spring", label: "Spring" },
  { value: "summer", label: "Summer" },
  { value: "fall", label: "Fall" },
  { value: "winter", label: "Winter" },
];

export default function ListParameters() {
  const [parameters, setParameters] = useState({
    search: "",
    continent: "all",
    season: "all",
    transport: "all",
    sort: "start_date",
  });
  return (
    <div className={s.container}>
      <div className={s.filtersContainer}>
        <label>Filters: </label>
        <CustomUrlChooser
          field="season"
          options={seasonOptions}
          // handleClick={(value, isActive) => console.log(value, isActive)}
          optContClass={s.chooserOptCont}
          optClass={s.chooserOpt}
          optClassActive={s.chooserOptActive}
          // defaultValues={["spring", "summer", "fall", "winter"]}
        />
      </div>

      <CustomUrlSelector
        field="sort"
        options={sortOptions}
        // handleClick={(value) => console.log(value)}
        mainClass={s.selector}
        optContClass={s.optionsBox}
        optClass={s.option}
        optClassActive={s.optionActive}
      />
    </div>
  );
}
