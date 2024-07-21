import { useAdminTours } from "./useAdminTours";
import Spinner from "../components/Spinner";
import SpinnerMini from "../components/SpinnerMini";
import ErrorPage from "../components/ErrorPage";
import { useAdminDeleteTour } from "./useAdminDeleteTour";
import AdminTourForm from "./AdminTourForm";
import React, { useState } from "react";
import s from "./Admin.module.css";
import { getTimeString } from "../helper/getTimeString";
import { useAlertConfirm } from "../Alert/AlertConfirmContext";
import Search from "../components/Search";
import { NavLink } from "react-router-dom";
import { IoTrashOutline, IoClose } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { isDateActive } from "../helper/isDateActive";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export default function AdminMain() {
  const [formOpen, setFormOpen] = useState(0); // 0 - all closed, -1 - add tour Open, x - edit form form tour id x
  const [isDark, setIsDark] = useLocalStorageState(false, "isDark");

  return (
    <div className={`${s.adminPage} ${isDark ? s.dark : ""}`}>
      <header className={s.pageHeader}>
        <Search isAdmin={true} />
        <NavLink to="/" className={s.headerLogo}>
          <img src={`/img/GioTours_logo-green.png`} alt="GioTours logo" />
        </NavLink>
        <button className={s.darkToggle} onClick={() => setIsDark((b) => !b)}>
          {isDark ? <BsFillMoonStarsFill /> : <MdWbSunny />}
        </button>
      </header>
      <TourTable formOpen={formOpen} setFormOpen={setFormOpen} />
      <button
        style={{ marginBottom: "2rem" }}
        className="btn btn--green btn-small"
        onClick={() => setFormOpen((b) => (b === -1 ? 0 : -1))}
      >
        {formOpen === -1 ? "Cancel" : "Add Tour"}
      </button>
      {formOpen === -1 && <AdminTourForm setFormOpen={setFormOpen} />}
    </div>
  );
}

function TourTable({ formOpen, setFormOpen }) {
  const { adminTours, isLoadingAdminTours, adminToursError } = useAdminTours();
  const { alertConfirm } = useAlertConfirm();
  if (isLoadingAdminTours) return <Spinner />;
  if (adminToursError)
    return (
      <ErrorPage message="There was Error Loading Tours. Try again later" />
    );
  return (
    <div className={`${s.toursTable}`}>
      <header className={`${s.tableRow}`}>
        <span></span>
        <span></span>
        <span>id</span>
        <span>title</span>
        <span>description</span>
        <span>price</span>
        <span>days</span>
        <span>start date</span>
        <span style={{ gridColumn: "9/13" }}>start place</span>
        <span style={{ gridRowStart: "2", gridColumnStart: "9" }}>Place</span>
        <span style={{ gridRowStart: "2", gridColumnStart: "10" }}>City</span>
        <span style={{ gridRowStart: "2", gridColumnStart: "11" }}>
          Country
        </span>
        <span style={{ gridRowStart: "2", gridColumnStart: "12" }}>
          Continent
        </span>
        <span style={{ gridColumn: "13/15" }}>Start Location</span>
        <span style={{ gridRowStart: "2", gridColumnStart: "13" }}>Lat</span>
        <span style={{ gridRowStart: "2", gridColumnStart: "14" }}>Lng</span>
        <span style={{ gridColumn: "15/18" }}>visit Places</span>
        <span style={{ gridRowStart: "2", gridColumnStart: "15" }}>Place</span>
        <span style={{ gridRowStart: "2", gridColumnStart: "16" }}>City</span>
        <span style={{ gridRowStart: "2", gridColumnStart: "17" }}>
          Country
        </span>
        <span>NoB</span>
      </header>
      <section>
        {adminTours.map((el) => (
          <div key={el.id}>
            <TourTableLine
              tour={el}
              formOpen={formOpen}
              setFormOpen={setFormOpen}
              alertConfirm={alertConfirm}
            />
            {formOpen === el.id && (
              <AdminTourForm
                tour={el}
                setFormOpen={setFormOpen}
                // className={`${s.spanAllColumns} ${s.adminTourForm}`}
              />
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
function TourTableLine({ tour, formOpen, setFormOpen, alertConfirm }) {
  const { deleteTour, isDeletingTour } = useAdminDeleteTour();
  return (
    <div className={`${s.tableRow} ${s.toursTableBody}`}>
      <span className={s.tourButttons}>
        <button
          disabled={isDeletingTour}
          onClick={() =>
            alertConfirm(
              () => deleteTour(tour.id),
              `Do you want to remove ${tour.title} from tours?`,
              "delete"
            )
          }
        >
          {isDeletingTour ? <SpinnerMini /> : <IoTrashOutline />}
        </button>
        <button
          onClick={() => setFormOpen((b) => (b === tour.id ? 0 : tour.id))}
        >
          {formOpen === tour.id ? <IoClose /> : <FaEdit />}
        </button>
      </span>
      <span>
        <img src={tour.image_src} alt={tour.title} width="100%" />
        {!isDateActive(tour.start_date) && (
          <>
            <br />
            <b style={{ color: "#e22a2a" }}>Inactive</b>
          </>
        )}
      </span>
      <span className={s.spanAllRows}>{tour.id}</span>
      <span>{tour.title}</span>
      <span title={tour.description}>{tour.description.slice(0, 50)}...</span>
      <span>${tour.price}</span>
      <span>{tour.duration}</span>
      <span>
        {
          getTimeString({
            date: tour.start_date,
            timeZone: "UTC",
            format: "d/MM/y HH:mm",
          }).timeString
        }{" "}
        UTC
      </span>
      <span>{tour.start_place.place}</span>
      <span>{tour.start_place.region_city}</span>
      <span>{tour.start_place.country}</span>
      <span>{tour.start_place.continent}</span>
      <span title={tour.start_location.lat}>
        {`${tour.start_location.lat}`.slice(0, 7)}...
      </span>
      <span title={tour.start_location.lng}>
        {`${tour.start_location.lng}`.slice(0, 7)}...
      </span>
      {tour.visit_places.map((vp, i) => (
        <React.Fragment key={i}>
          <span
            key={vp.place + i}
            style={{
              gridRow: `${i + 1}/${i + 2}`,
              gridColumnStart: "15",
              borderBottom: "1px solid #ccc",
            }}
          >
            {vp.place}
          </span>
          <span
            key={vp.region_city + i}
            style={{
              gridRow: `${i + 1}/${i + 2}`,
              gridColumnStart: "16",
            }}
          >
            {vp.region_city}
          </span>
          <span
            key={vp.country + i}
            style={{
              gridRow: `${i + 1}/${i + 2}`,
              gridColumnStart: "17",
            }}
          >
            {vp.country}
          </span>
        </React.Fragment>
      ))}
      <span>{tour.number_of_bookings}</span>
    </div>
  );
}
