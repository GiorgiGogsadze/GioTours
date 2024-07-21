import { useCurUser } from "../hooks/useCurUser";
import { useReviews } from "../hooks/useReviews";
import Spinner from "../components/Spinner";
import { DEFAULT_AVATAR_URL } from "../GENERALS";
import s from "../styles/Reviews.module.css";
import { useEffect, useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useAccount } from "../hooks/useAccount";
import StarRating from "../components/StarRating";
import { useWriteReview } from "../hooks/useWriteReview";
import { useDeleteReview } from "../hooks/useDeleteReview";
import ReviewStats from "./ReviewStats";

export default function Reviews() {
  const { curUser, isLoadingCurUser, curUserError } = useCurUser();
  const { account, isLoadingAccount, accountError } = useAccount({
    userId: curUser?.id,
  });
  const { isLoadingReviews, reviews: rawReviews, reviewsError } = useReviews();

  if (isLoadingCurUser || isLoadingReviews || isLoadingAccount)
    return <Spinner />;

  let curUserReview;
  const reviews = account
    ? rawReviews.filter((el) => {
        if (el.id === account.id) {
          curUserReview = el;
          return false;
        }
        return true;
      })
    : rawReviews;

  return (
    <section className="section-reviews" id="reviews">
      <div className="reviews__container">
        <div className="reviews">
          {!curUserReview && <CreateReviewBox curAccount={account} />}
          {rawReviews && rawReviews.length !== 0 && (
            <ReviewStats reviews={rawReviews} />
          )}
          {curUserReview && (
            <CreateReviewBox
              curAccount={account}
              curUserReview={curUserReview}
            />
          )}
          {!rawReviews || rawReviews.length === 0 ? (
            <h1 className="heading-primary">No Reviews to show</h1>
          ) : (
            reviews.map((el, i) => <ReviewCard key={i} review={el} />)
          )}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img
          className="reviews__avatar-img"
          src={review.avatar_link || DEFAULT_AVATAR_URL}
          alt="image of reviewer"
        />
        <h6 className="reviews__user">{review.real_name}</h6>
      </div>
      <p className="reviews__text">{review.review}</p>
      <div className="reviews__rating">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            className={`reviews__star reviews__star--${
              review.rate >= i + 1 ? "active" : "inactive"
            }`}
          >
            <use xlinkHref="/img/icons.svg#icon-star"></use>
          </svg>
        ))}
      </div>
    </div>
  );
}

function CreateReviewBox({ curAccount, curUserReview }) {
  const [writeMode, setWriteMode] = useState(false);
  const { deleteReview, isDeletingReview } = useDeleteReview();
  if (writeMode)
    return (
      <WriteReviewBox
        curAccount={curAccount}
        curUserReview={curUserReview}
        setWriteMode={setWriteMode}
      />
    );
  if (!curAccount)
    return (
      <Link
        className={`btn btn--white btn--small ${s.prerequisiteBtn}`}
        to="/login?transferto=/about"
      >
        Log in to write review
      </Link>
    );
  if (!curUserReview)
    return curAccount.number_of_booked > 0 ? (
      <button
        className={`btn btn--white btn--small ${s.prerequisiteBtn}`}
        onClick={() => setWriteMode(true)}
      >
        Write Review
      </button>
    ) : (
      <Link to="/" className={`btn btn--white btn--small ${s.prerequisiteBtn}`}>
        Book Tour to Write Review
      </Link>
    );
  return (
    <div className={s.userReviewContainer}>
      <button
        className={s.userReviewDeleteButton}
        disabled={isDeletingReview}
        onClick={() => deleteReview({ accountId: curAccount.id })}
      >
        <span>Delete</span> <CiTrash />
      </button>
      <button
        className={s.userReviewEditButton}
        onClick={() => setWriteMode(true)}
      >
        <span>Edit</span> <CiEdit />
      </button>
      <ReviewCard review={curUserReview} />
    </div>
  );
}

function WriteReviewBox({ curAccount, curUserReview, setWriteMode }) {
  const { writeReview, isWritingReview } = useWriteReview();
  const [review, setReview] = useState(curUserReview?.review || "");
  const [rate, setRate] = useState(curUserReview?.rate || 0);
  const [starClassName, setStarClassName] = useState("");

  useEffect(() => {
    if (!curUserReview) {
      document.querySelector(".reviews").scrollTo({ left: 0 });
    }
  }, [curUserReview]);

  if (!curAccount) return null;

  function handleSubmit(e) {
    e.preventDefault();
    setStarClassName("");
    if (!review) return;
    if (!rate) {
      setStarClassName(s.starsAnimation);
      setTimeout(() => {
        setStarClassName("");
      }, 100);
      return;
    }
    writeReview(
      { accountId: curAccount.id, review: review.trim(), rate },
      { onSuccess: () => setWriteMode(false) }
    );
  }
  return (
    <form onSubmit={handleSubmit} className={`${s.writeReview} reviews__card`}>
      {isWritingReview ? (
        <Spinner />
      ) : (
        <>
          <div className={s.textAreaContainer}>
            <label htmlFor="textArea">Your Review:</label>
            <textarea
              id="textArea"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <StarRating
            size={2}
            className={starClassName}
            maxRating={5}
            color="#55c57a"
            defaultRating={rate}
            setRating={setRate}
          />
          <div className={s.writeBoxButtons}>
            <button
              type="reset"
              onClick={() => setWriteMode(false)}
              className={s.cancelBtn}
            >
              Cancel
            </button>
            <button type="submit" className={s.submitBtn}>
              Submit
            </button>
          </div>
        </>
      )}
    </form>
  );
}
