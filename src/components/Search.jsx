import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUrl } from "../hooks/useUrl";

export default function Search({ isAdmin }) {
  const field = "query";
  const {
    value: queryStr,
    setValue: setQuery,
    remove: removeQueryStr,
  } = useUrl(field);

  const [input, setInput] = useState(queryStr || "");
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    setInput(queryStr || "");
  }, [queryStr]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);
    e.target.querySelector("input")?.blur();
    if (!input || input === queryStr) return;
    if (!isAdmin) {
      let newSearch;
      if (search?.includes(`${field}=`)) {
        let s1 = search.split(`${field}=`);
        let s2 = s1[1].split("&");
        s2[0] = input;
        newSearch = s1[0] + `${field}=` + s2.join("&");
      } else {
        newSearch = search
          ? search + `&${field}=${input}`
          : `?${field}=${input}`;
      }
      navigate({
        pathname: "/",
        search: newSearch,
      });
      scrollTo({ left: 0, top: 0, behavior: "smooth" });
    } else {
      setQuery(input);
    }
  }
  return (
    <nav className="nav nav--tours">
      <form
        className="nav__search"
        onSubmit={handleSubmit}
        onChange={(e) => !e.target.value && removeQueryStr()}
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
