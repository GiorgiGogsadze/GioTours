import { useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "./Calendar";

export default function TourCard({
  id,
  imgSrc,
  price,
  startDate,
  title,
  location,
}) {
  const [imgClicked, setImgClicked] = useState(false);
  const timeLeft = new Date(startDate) - new Date();
  return (
    <div className={`card ${timeLeft >= 0 ? "card-active" : "card-inactive"}`}>
      <div className="card__header">
        <div
          className={`card__picture ${imgClicked ? "image-clicked" : ""}`}
          onClick={() => setImgClicked((b) => !b)}
        >
          <div className="card__picture-overlay">&nbsp;</div>
          <img className="card__picture-img" src={imgSrc} alt={title} />
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
          <span>{location}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="/img/icons.svg#icon-calendar"></use>
          </svg>
          <span>
            {new Date(startDate).toLocaleDateString("en-uk", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </span>
        </div>
        {timeLeft > 0 && (
          <div className="card__data card__calendar">
            <svg className="card__icon">
              <use xlinkHref="/img/icons.svg#icon-clock"></use>
            </svg>
            <Calendar difference={timeLeft} />
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
