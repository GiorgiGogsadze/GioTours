import { signInWithFacebook, signInWithGoogle } from "../DBService/apiAuth";
import s from "../styles/MediaOptions.module.css";
export default function MediaOptions() {
  return (
    <div className={s.container}>
      <div className={s.mediaOptions}>
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
      <div className={s.mediaOptions}>
        <button
          className={`${s.field} ${s.google}`}
          onClick={() => signInWithGoogle()}
        >
          <img src="./img/google.png" alt="google" className={s.googleImg} />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
}
