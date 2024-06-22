import { NavLink } from "react-router-dom";
import LangChanger from "./LangChanger";
import UserPlace from "./UserPlace";
import Search from "./Search";
import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useDispatch } from "react-redux";
import { clearParameters } from "../data/toursSlice";

export default function Header() {
  const [droped, setDroped] = useState(false);
  const dispatch = useDispatch();
  return (
    <header className="header">
      <Search />
      <nav className="nav nav--user">
        <NavLink
          to="/"
          className="nav__el"
          onClick={() => dispatch(clearParameters())}
        >
          Home
        </NavLink>
        <div
          className="contact--container"
          onMouseLeave={() => setDroped(false)}
        >
          <NavLink
            to="/contact"
            className="nav__el"
            onMouseEnter={() => setDroped(true)}
          >
            Contact Us
          </NavLink>
          {droped ? (
            <div className="contact-dropDown">
              <HashLink smooth to="/contact#about" className="nav__el">
                About
              </HashLink>
              <HashLink smooth to="/contact#contact" className="nav__el">
                Contact
              </HashLink>
            </div>
          ) : (
            ""
          )}
        </div>
        <a
          className="nav__el"
          href="https://www.facebook.com/search/top?q=tours"
          target="_blank"
        >
          <svg width={25} fill="white" className="facebook_icon">
            <use xlinkHref="/img/icons.svg#icon-facebook"></use>
          </svg>
        </a>
        <UserPlace />
        <LangChanger />
      </nav>
    </header>
  );
}
