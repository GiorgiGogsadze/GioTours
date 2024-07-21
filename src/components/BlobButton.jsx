import s from "../styles/BlobButton.module.css";
export default function BlobButton({ children, onClick, disabled, className }) {
  return (
    <div className={`${s["buttons"]} ${className}`}>
      <button className={s["blob-btn"]} onClick={onClick} disabled={disabled}>
        {children}
        <span className={s["blob-btn__inner"]}>
          <span className={s["blob-btn__blobs"]}>
            <span className={s["blob-btn__blob"]}></span>
            <span className={s["blob-btn__blob"]}></span>
            <span className={s["blob-btn__blob"]}></span>
            <span className={s["blob-btn__blob"]}></span>
          </span>
        </span>
      </button>
      <br />

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className={s.svg}>
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
              result="goo"
            ></feColorMatrix>
            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
