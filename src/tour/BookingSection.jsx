import { Link } from "react-router-dom";
import { useCurUser } from "../hooks/useCurUser";
import Spinner from "../components/Spinner";
import { useBooking } from "../hooks/useBooking";
import QRCode from "react-qr-code";
import { useBookTour } from "../hooks/useBookTour";
import { useAlertConfirm } from "../Alert/AlertConfirmContext";
import SpinnerMini from "../components/SpinnerMini";
import { useCanctelTour } from "../hooks/useCancelTour";

export default function BookingSection({ tour }) {
  const { isLoadingCurUser, curUser, curUserError } = useCurUser();
  const { isLoadingBooking, booking, bookingError } = useBooking({
    userId: curUser?.id,
    tourId: tour?.id,
  });
  const { bookTour, isBookingTour, bookTourError } = useBookTour();
  const { cancelTour, isCancelingTour, cancelTourError } = useCanctelTour();
  const { alertConfirm } = useAlertConfirm();

  if (isLoadingBooking || isLoadingCurUser) return <Spinner />;

  const timeLeft = new Date(tour.start_date) - new Date();

  return (
    <section className="section-cta">
      <div className="cta">
        <img
          className="cta__img cta__img--1"
          src={tour.image_src}
          alt="Tour Picture"
        />
        <div className="cta__content">
          <h2 className="heading-secondary">
            {booking ? "You've booked the tour" : "What are you waiting for?"}
          </h2>
          <p className="cta__text">
            {tour.duration} days. 1 adventure. Infinite memories.
            {tour.is_active && timeLeft >= 0
              ? booking
                ? " We look forward to seeing you on this wonderful tour. SAVE THIS QR CODE"
                : " Make it yours today!"
              : ""}
          </p>
          {tour.is_active && timeLeft >= 0 ? (
            curUser ? (
              booking ? (
                <>
                  <div id="booking-qr">
                    <QRCode
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                      value={JSON.stringify(booking)}
                    />
                  </div>
                  <button
                    className="btn btn--red span-all-rows"
                    onClick={() => {
                      alertConfirm(
                        () =>
                          cancelTour({ userId: curUser.id, tourId: tour.id }),
                        "You would've spent great time, are you shure you want to cancel the booking?",
                        "Confirm"
                      );
                    }}
                    disabled={isCancelingTour}
                  >
                    {isCancelingTour ? <SpinnerMini /> : "Cancel"}
                  </button>
                </>
              ) : (
                <button
                  className="btn btn--green span-all-rows"
                  onClick={() =>
                    bookTour({ userId: curUser.id, tourId: tour.id })
                  }
                  disabled={isBookingTour}
                >
                  {isBookingTour ? <SpinnerMini /> : "book tour!"}
                </button>
              )
            ) : (
              <Link
                className="btn btn--green span-all-rows"
                to={`/login?transferto=/tours/${tour.id}`}
              >
                Log in to book tour!
              </Link>
            )
          ) : (
            <h2
              style={{ fontSize: "2rem" }}
              className="heading-secondary heading-secondary--error span-all-rows"
            >
              No Longer Active
            </h2>
          )}
        </div>
      </div>
    </section>
  );
}
