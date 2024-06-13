import { useDispatch } from "react-redux";
import s from "./ListParameters.module.css";
import CustomSelector from "./CustomSelector";
import {
  filterContinent,
  filterSeason,
  filterTransport,
  sortTours,
} from "./data/toursSlice";

const sortOptions = [
  { value: "none", label: "Sort by date" },
  { value: "soon", label: "First soonest" },
  { value: "late", label: "First Latest" },
];
const continentOptions = [
  { value: "all", label: "All" },
  { value: "Europe", label: "Europe" },
  { value: "Asia", label: "Asia" },
  { value: "Africa", label: "Africa" },
  { value: "North America", label: "North America" },
  { value: "South America", label: "South America" },
  { value: "Australia", label: "Australia" },
];
const seasonOptions = [
  { value: "all", label: "All" },
  { value: "Spring", label: "Spring" },
  { value: "Summer", label: "Summer" },
  { value: "Fall", label: "Fall" },
  { value: "Winter", label: "Winter" },
];
const transportOptions = [
  { value: "all", label: "All" },
  { value: "Plane", label: "Plane" },
  { value: "Bus", label: "Bus" },
  { value: "Ship", label: "Ship" },
];
export default function ListParameters() {
  const dispatch = useDispatch();
  return (
    <div className={s.container}>
      <div className={s.filtersContainer}>
        <div>
          <label>Continent</label>
          <CustomSelector
            options={continentOptions}
            defaultValue="all"
            handleClick={(value) => dispatch(filterContinent(value))}
            mainClass={s.selector}
            optContClass={s.optionsBox}
            optClass={s.option}
          />
        </div>
        <div>
          <label>Season</label>
          <CustomSelector
            options={seasonOptions}
            defaultValue="all"
            handleClick={(value) => dispatch(filterSeason(value))}
            mainClass={s.selector}
            optContClass={s.optionsBox}
            optClass={s.option}
          />
        </div>
        <div>
          <label>Transport</label>
          <CustomSelector
            options={transportOptions}
            defaultValue="all"
            handleClick={(value) => dispatch(filterTransport(value))}
            mainClass={s.selector}
            optContClass={s.optionsBox}
            optClass={s.option}
          />
        </div>
      </div>
      <CustomSelector
        options={sortOptions}
        defaultValue="none"
        handleClick={(value) => dispatch(sortTours(value))}
        mainClass={s.selector}
        optContClass={s.optionsBox}
        optClass={s.option}
      />
    </div>
  );
}
