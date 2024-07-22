import { signInWithFacebook, signInWithGoogle } from "../DBService/apiAuth";
import s from "../styles/MediaOptions.module.css";
export default function MediaOptions() {
  return (
    <div className={s.container}>
      <div className={s.mediaOptions}>
        <div className="form__message">
          <small style={{ textAlign: "center" }}>
            For Google Login use secure browsers: Chrome, Safari, Firefox,
            Opera, Edge
          </small>
        </div>
        <button
          className={`${s.field} ${s.google}`}
          onClick={() => signInWithGoogle()}
        >
          <img src="./img/google.png" alt="google" className={s.googleImg} />
          <span>Login with Google</span>
        </button>
      </div>
      <div className={s.mediaOptions}>
        <div className="form__message">
          <small style={{ textAlign: "center" }}>
            Facebook Login is blocked as the website isn&apos;t for real
            business
          </small>
        </div>
        <button
          className={`${s.field} ${s.facebook}`}
          onClick={() => signInWithFacebook()}
        >
          <img
            src="./img/facebook.png"
            alt="facebook"
            className={s.googleImg}
          />
          <span>Login with Facebook</span>
        </button>
      </div>
    </div>
  );
}
