import { useState } from "react";
import { useDispatch } from "react-redux";
import { fillTours, searchTour } from "./data/toursSlice";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchTour(input));
    navigate("/");
  }
  return (
    <nav className="nav nav--tours">
      <form
        className="nav__search"
        onSubmit={handleSubmit}
        onChange={(e) => !e.target.value && dispatch(fillTours())}
      >
        <button className="nav__search-btn" type="submit">
          <svg>
            <use xlinkHref="/img/icons.svg#icon-search"></use>
          </svg>
        </button>
        <input
          className="nav__search-input"
          type="text"
          placeholder="Search tours"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </nav>
  );
}
