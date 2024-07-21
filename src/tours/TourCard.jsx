import { useState } from "react";
import { Link } from "react-router-dom";
import { getTimeString } from "../helper/getTimeString";
import { IoHourglassOutline, IoPeopleOutline } from "react-icons/io5";

export default function TourCard({ tour }) {
  const {
    id,
    title,
    image_src,
    price,
    start_place,
    duration,
    start_date,
    number_of_bookings,
    time_left,
    is_active,
  } = tour;
  const [imgClicked, setImgClicked] = useState(false);
  const timeLeft = new Date(start_date) - new Date();
  const { timeString, timeZoneString } = getTimeString({
    date: start_date,
    timeZone: "UTC",
    format: "d MMM y",
  });
  return (
    <div className="card">
      <div className="card__header">
        <div
          className={`card__picture ${imgClicked ? "image-clicked" : ""}`}
          onClick={() => setImgClicked((b) => !b)}
        >
          <div className="card__picture-overlay">&nbsp;</div>
          <img className="card__picture-img" src={image_src} alt={title} />
        </div>
        <h3 className="heading-tertirary">
          <span>{title}</span>
        </h3>
      </div>
      <div className="card__details">
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
          </svg>
          <span>
            {start_place.region_city}, {start_place.country}
          </span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="/img/icons.svg#icon-calendar"></use>
          </svg>
          <span>
            {timeString} {timeZoneString}
          </span>
        </div>
        <div className="card__data">
          <IoHourglassOutline className="card__icon" />
          <span>Lasts {duration} days</span>
        </div>
        <div className="card__data">
          <IoPeopleOutline className="card__icon" />
          <span>
            {number_of_bookings === 0
              ? "Be the first to book"
              : `booked by ${number_of_bookings}`}
          </span>
        </div>
        {is_active && timeLeft > 0 && (
          <div className="card__data card__calendar">
            <svg className="card__icon">
              <use xlinkHref="/img/icons.svg#icon-clock"></use>
            </svg>
            <span>
              {time_left.days <= 0 && time_left.hours <= 0
                ? "Starts in minutes"
                : `Starts in${
                    time_left.days > 0 ? ` ${time_left.days} days, ` : " "
                  }${time_left.hours} hours`}
            </span>
          </div>
        )}
      </div>
      <div className="card__footer">
        <p>
          <span className="card__footer-value">${price}</span>
          <span className="card__footer-text"> per person</span>
        </p>
        <Link className="btn btn--green btn--small" to={`/tours/${id}`}>
          Details
        </Link>
      </div>
    </div>
  );
}
