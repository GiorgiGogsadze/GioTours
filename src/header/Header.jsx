import { NavLink, useLocation } from "react-router-dom";
import UserInNav from "./UserInNav";
import Search from "../components/Search";
import DropDown from "./DropDown";
import { useEffect, useRef, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

export default function Header() {
  const headerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    headerRef.current.style.position = "absolute";
    if (screen.width <= 840 && screen.height <= 840) return;

    let previousScrollPosition = 0;
    const isScrollingUp = () => {
      let goingUp = false;
      let scrollPosition = window.scrollY;
      if (scrollPosition < previousScrollPosition) {
        goingUp = true;
      }
      previousScrollPosition = scrollPosition;
      return goingUp;
    };
    window.addEventListener("scroll", () => {
      if (!headerRef.current) return;
      const isUp = isScrollingUp();
      if (!isUp || window.scrollY === 0) {
        headerRef.current.style.position = "absolute";
      }
      if (isUp && window.scrollY > headerRef.current.offsetHeight * 2) {
        headerRef.current.style.position = "fixed";
      }
    });
  }, []);

  return (
    <>
      <button
        className="header_opener"
        onClick={() => {
          setIsOpen((b) => !b);
        }}
      >
        {isOpen ? <IoClose /> : <HiOutlineMenu />}
      </button>
      <HeaderEl style={{ visibility: "hidden" }} />
      <NavLink to="/" className="header_logo-sticky">
        <img src={`/img/GioTours_logo-green.png`} alt="GioTours logo" />
      </NavLink>
      <HeaderEl
        headerRef={headerRef}
        className={isOpen ? "sticky-header show_header" : "sticky-header"}
      />
    </>
  );
}

function HeaderEl({ headerRef, className, style }) {
  const { pathname } = useLocation();
  return (
    <header
      className={className ? `header ${className}` : "header"}
      ref={headerRef}
      style={style}
    >
      <Search />
      <NavLink to="/" className="header__logo">
        <img
          src={`/img/GioTours_logo-${pathname === "/" ? "green" : "white"}.png`}
          alt="GioTours logo"
        />
      </NavLink>
      <nav className="nav nav--user">
        {/* <NavLink to="/" className="nav__el">
          Home
        </NavLink> */}
        <DropDown
          main={{ label: "About us", to: "/about" }}
          drops={[
            { label: "Info", to: "/about#info" },
            { label: "Reviews", to: "/about#reviews" },
          ]}
        />
        <UserInNav />
      </nav>
    </header>
  );
}
