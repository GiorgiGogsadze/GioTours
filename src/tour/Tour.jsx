import ErrorPage from "../components/ErrorPage";
import Timer from "../components/Timer";
import { useTour } from "../hooks/useTour";
import Spinner from "../components/Spinner";
import { getTimeString } from "../helper/getTimeString";
import { PiCursorClickThin } from "react-icons/pi";
import { GiPriceTag } from "react-icons/gi";
import { IoHourglassOutline, IoPeopleOutline } from "react-icons/io5";
import BookingSection from "./BookingSection";

export default function Tour() {
  const { isLoadingTour, tour, tourError } = useTour();

  if (isLoadingTour) return <Spinner />;
  if (!tour || tourError) return <ErrorPage message="No tour was found!" />;

  const { timeString, timeZoneString } = getTimeString({
    date: tour.start_date,
    place: tour.start_place,
  });

  return (
    <div className="tour-container">
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <img
            className="header__hero-img"
            src={tour.image_src}
            alt={tour.title}
          />
        </div>
        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{tour.title}</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-flag"></use>
              </svg>
              <span className="heading-box__text">
                {tour.visit_places.length} stops
              </span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
              </svg>
              <span className="heading-box__text">
                {[tour.start_place, ...tour.visit_places]
                  .reduce(
                    (acc, el) =>
                      acc.find((c) => c === el.country)
                        ? acc
                        : [...acc, el.country],
                    []
                  )
                  .join(", ")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-description">
        <div className="overview-box">
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
            <div className="overview-box__detail">
              <GiPriceTag className="overview-box__icon" />
              <span className="overview-box__label">Price</span>
              <span className="overview-box__text">${tour.price}</span>
            </div>
            <div className="overview-box__detail">
              <IoHourglassOutline className="overview-box__icon" />
              <span className="overview-box__label">Duration</span>
              <span className="overview-box__text">{tour.duration} days</span>
            </div>
            <div className="overview-box__detail">
              <IoPeopleOutline className="overview-box__icon" />
              <span className="overview-box__label">PARTICIPANTS</span>
              <span className="overview-box__text">
                {tour.number_of_bookings === 0
                  ? "Be First"
                  : `${tour.number_of_bookings} people`}
              </span>
            </div>
          </div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">
              Start Location and Time
            </h2>
            <div className="overview-box__detail">
              <svg className="overview-box__icon">
                <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
              </svg>
              <p className="overview-box__text">
                <span>{tour.start_place.place}</span>
                <br />
                <span>
                  {`${tour.start_place.region_city}, ${tour.start_place.country}`}
                  <a
                    href={`https://www.google.com/maps/@${tour.start_location.lat},${tour.start_location.lng},21z?entry=ttu`}
                    className="overview-box__link"
                    target="_blank"
                  >
                    Check on Google Maps
                    <PiCursorClickThin />
                  </a>
                </span>
              </p>
            </div>
            <div className="overview-box__detail">
              <svg className="overview-box__icon">
                <use xlinkHref="/img/icons.svg#icon-calendar"></use>
              </svg>
              <span className="overview-box__text">
                {timeString} {timeZoneString}
              </span>
            </div>
            {tour.is_active && <Timer toDate={tour.start_date} />}
          </div>
        </div>
        <div className="overview-box">
          <div className="description-box">
            <h2 className="heading-secondary ma-bt-lg">
              about the {tour.title} tour
            </h2>
            <p className="description__text">{tour.description}</p>
          </div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Visit Places</h2>
            {tour.visit_places.map((el, i) => (
              <div className="overview-box__detail" key={i}>
                <svg className="overview-box__icon">
                  <use xlinkHref="/img/icons.svg#icon-check-circle"></use>
                </svg>
                <span className="overview-box__important-text">{el.place}</span>
                <span className="overview-box__text">{`${el.region_city}, ${el.country}`}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingSection tour={tour} />
    </div>
  );
}
