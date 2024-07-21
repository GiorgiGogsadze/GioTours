import s from "../styles/Reviews.module.css";
export default function ReviewStats({ reviews }) {
  if (!reviews || reviews.length === 0) return null;

  const statObject = reviews.reduce(
    (acc, el) => {
      acc[el.rate]++;
      acc.avg += el.rate;
      return acc;
    },
    { avg: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  );
  statObject.avg = Math.round((statObject.avg / reviews.length) * 10) / 10;

  return (
    <div className={`${s.statContainer} reviews__card`}>
      <div className={s.statResult}>
        <b>
          {statObject.avg.toLocaleString(undefined, {
            minimumFractionDigits: 1,
          })}
        </b>
        <p>out of 5</p>
      </div>
      <div className={s.ratings}>
        <p>{reviews.length} Ratings</p>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className={s.rateContainer}>
            <span>{"★".repeat(i + 1)}</span>
            <div className={s.rateLine}>
              <div
                style={{
                  width: `${(9 * statObject[i + 1]) / reviews.length}rem`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ flexBasis: "100%", height: 0 }}></div>
      <p className={s.message}>See Reviews &rarr;</p>
    </div>
  );
}
