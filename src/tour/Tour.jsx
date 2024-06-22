import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ErrorPage from "../errorPage/ErrorPage";
import tours from "../data/tours.data";

export default function Tour() {
  const { id } = useParams();
  const { currentLang } = useSelector((state) => state.lang);
  const { currentUser } = useSelector((state) => state.users);
  const [tour] = useState(() => tours.find((el) => el.id === +id));
  const daysLeft = Math.floor(
    (new Date(tour?.startDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  if (!tour || daysLeft < 0) return <ErrorPage />;
  return (
    <div style={{ margin: "-8rem -6rem" }}>
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <img
            className="header__hero-img"
            src={tour.imgSrc}
            alt={tour["en"].title}
          />
        </div>
        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{tour[currentLang].title}</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-clock"></use>
              </svg>
              <span className="heading-box__text">{daysLeft} days Left</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
              </svg>
              <span className="heading-box__text">
                {tour[currentLang].location}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use xlinkHref="/img/icons.svg#icon-calendar"></use>
                </svg>
                <span className="overview-box__label">Date</span>
                <span className="overview-box__text">
                  {new Date(tour.startDate).toLocaleDateString("en-uk", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </span>
              </div>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use xlinkHref="/img/icons.svg#icon-globe"></use>
                </svg>
                <span className="overview-box__label">Continent</span>
                <span className="overview-box__text">
                  {tour[currentLang].continent}
                </span>
              </div>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use xlinkHref="/img/icons.svg#icon-truck"></use>
                </svg>
                <span className="overview-box__label">Transport</span>
                <span className="overview-box__text">
                  {tour[currentLang].transport}
                </span>
              </div>
              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use xlinkHref="/img/icons.svg#icon-sun"></use>
                </svg>
                <span className="overview-box__label">season</span>
                <span className="overview-box__text">
                  {tour[currentLang].season}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">
            {tour[currentLang].title}
          </h2>
          <p className="description__text">{tour[currentLang].description}</p>
        </div>
      </section>

      <section className="section-cta">
        <div className="cta">
          <img
            className="cta__img cta__img--1"
            src={tour.imgSrc}
            alt="Tour Picture"
          />
          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">
              {tour.duration} days. 1 adventure. Infinite memories. Make it
              yours today!
            </p>
            {currentUser.userName ? (
              <Link className="btn btn--green span-all-rows">book tour!</Link>
            ) : (
              <Link className="btn btn--green span-all-rows" to="/login">
                Log in to book tour!
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
