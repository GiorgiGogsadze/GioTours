import { useParams } from "react-router-dom";
import { useCurUser } from "../hooks/useCurUser";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { useAccount } from "../hooks/useAccount";
import ErrorPage from "../components/ErrorPage";

import s from "../styles/UserProfile.module.css";
import { DEFAULT_AVATAR_URL } from "../GENERALS";
import BlobButton from "../components/BlobButton";
import { useChangeAccountAccess } from "../hooks/useChangeAccountAccess";
import { HiLockClosed } from "react-icons/hi";

import TourList from "../tours/TourList";
import { useBookedTours } from "../hooks/useBookedTours";

export default function UserProfile() {
  const { isLoadingCurUser, curUser, curUserError } = useCurUser();
  const { userId } = useParams();
  const { isLoadingAccount, account, accountError } = useAccount({ userId });
  const {
    changeAccountAccess,
    isChangingAccountAccess,
    changeAccountAccessError,
  } = useChangeAccountAccess(userId);
  const { isLoadingBookedTours, bookedTours, bookedToursError } =
    useBookedTours({ userId });

  const isOwner = curUser && curUser.id === userId;

  if (isLoadingCurUser || isLoadingAccount) return <Spinner />;
  if (accountError || !account)
    return <ErrorPage message={"Account couldn't found."} />;

  const { id, user_name, real_name, avatar_link, is_public } = account;

  return (
    <div>
      <div className={s.userBar}>
        <img src={avatar_link || DEFAULT_AVATAR_URL} alt={`user avatar`} />
        <div className={s.nameSpace}>
          {real_name && <h2>{real_name}</h2>}
          {user_name && <h4>@{user_name}</h4>}
        </div>
        {isOwner && (
          <BlobButton className={s.leftButton}>
            <Link className={s.editLink} to="/editUser">
              Edit User
            </Link>
          </BlobButton>
        )}
      </div>
      {isOwner || is_public ? (
        <div className={s.bookings}>
          <div className={s.bookingsHead}>
            <h3>Booked Tours</h3>
            <span
              className={
                s.accessIdentifier +
                " " +
                s[`accessIdentifier--${is_public ? "public" : "private"}`]
              }
            >
              {is_public ? "public" : "private"}
            </span>
            {isOwner && (
              <BlobButton
                className={s.accessToggleButton}
                onClick={() => changeAccountAccess(!is_public)}
                disabled={isChangingAccountAccess}
              >
                <p>Make {is_public ? "private" : "public"}</p>
              </BlobButton>
            )}
          </div>
          {isLoadingBookedTours ? (
            <Spinner />
          ) : (
            <TourList tours={bookedTours} />
          )}
        </div>
      ) : (
        <h3 className={s.privateMessage}>
          <HiLockClosed />
          <span>The Account is Private</span>
        </h3>
      )}
    </div>
  );
}
