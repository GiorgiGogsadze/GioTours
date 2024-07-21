import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function DropDown({ main, drops }) {
  const [droped, setDroped] = useState(false);
  return (
    <div
      className="about--container"
      onClick={() => setDroped(false)}
      onMouseLeave={() => setDroped(false)}
    >
      <NavLink
        to={main.to}
        className="nav__el"
        onMouseEnter={() => setDroped(true)}
      >
        {main.label}
      </NavLink>
      {droped ? (
        <div className="about-dropDown">
          {drops.map((el) => (
            <HashLink key={el.to} smooth to={el.to} className="nav__el">
              {el.label}
            </HashLink>
          ))}
        </div>
      ) : null}
    </div>
  );
}
