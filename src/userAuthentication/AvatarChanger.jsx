import { useState } from "react";
import SpinnerMini from "../components/SpinnerMini";

export default function AvatarChanger({ isLoading, curAvatar, onSubmit }) {
  const [avatarFile, setAvatarFile] = useState(null);
  return (
    <form
      className="form__group form__photo-upload"
      onSubmit={(e) => {
        e.preventDefault();
        if (!avatarFile) return;
        setAvatarFile(null);
        e.target.reset();
        onSubmit({ avatarFile });
      }}
    >
      <div className="photo__upload-container">
        <img
          className="form__user-photo"
          src={curAvatar}
          alt="User current avatar"
        />
        <input
          className="form__upload"
          type="file"
          accept="image/*"
          id="photo"
          name="photo"
          onChange={(e) => setAvatarFile(e.target.files[0])}
          required
          disabled={isLoading}
        />
      </div>
      <button
        className="btn btn--green"
        id={avatarFile ? "btn-set-avatar" : "btn-set-avatar_disabled"}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <SpinnerMini /> : "Set New Avatar"}
      </button>
      {/* <label htmlFor="photo">Choose new photo</label> */}
    </form>
  );
}
