import { MAIL_URL, DEFAULT_AVATAR_URL } from "../GENERALS";
import { getAccountWithUserName } from "./apiAccounts";
import {
  deleteFile,
  getFileNameFromOld,
  resizeImage,
  uploadFile,
} from "./apiStorage";
import supabase, { supabaseUrl } from "./supabase";

export function getUserInfo(user) {
  if (!user) return {};
  const isRegisteredHere = user.email.endsWith(MAIL_URL);
  const id = user.id;
  const role = user.role;
  const real_name =
    user.user_metadata.real_name || user.user_metadata.full_name;
  const email =
    user.user_metadata.real_email || (isRegisteredHere ? "" : user.email);
  const phone = user.user_metadata.real_phone || user.phone;
  const user_name = user.user_metadata.user_name;
  const avatar_link =
    user.user_metadata.avatar_link ||
    user.user_metadata.avatar_url ||
    DEFAULT_AVATAR_URL;
  const is_super_admin = user.app_metadata.role === "super-admin";
  return {
    isRegisteredHere,
    id,
    role,
    real_name,
    email,
    phone,
    user_name,
    avatar_link,
    is_super_admin,
  };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }
  return getUserInfo(data?.user);
}

export async function signup({ fullName, userName, password, email, phone }) {
  const { data, error } = await supabase.auth.signUp({
    email: `${userName}@${MAIL_URL}`,
    password,
    options: {
      data: {
        full_name: fullName,
        real_name: fullName,
        user_name: userName,
        avatar_link: "",
        real_email: email,
        real_phone: phone,
      },
    },
  });

  if (error) {
    console.log("🔥", error.message);
    throw new Error(
      error.message.includes("User already registered")
        ? "The user name is already used"
        : error.message
    );
  }

  return data;
}

export async function login({ userName, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: `${userName}@${MAIL_URL}`,
    password: password,
  });
  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }
  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }
}

export async function signInWithFacebook() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
  });
  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function updateCurrentUser({
  type,
  fullName,
  email,
  phone,
  userName,
  avatarFile,
  avatarId,
  oldAvatarUrl,
  newPassword,
}) {
  const updateData = { data: {} };
  if (type === "general") {
    if (fullName !== undefined) updateData.data.real_name = fullName;
    if (email !== undefined) updateData.data.real_email = email;
    if (phone !== undefined) updateData.data.real_phone = phone;
    if (userName !== undefined) {
      updateData.data.user_name = userName;
      const data = await getAccountWithUserName(userName);
      if (data) throw new Error("This user name is already used");
    }
  } else if (type === "avatar") {
    if (!avatarFile) return;
    const startURL = `${supabaseUrl}/storage/v1/object/public/avatars/`;
    const isOldUploaded = oldAvatarUrl?.startsWith(
      `${startURL}avatar-${avatarId}`
    );
    const oldAvatarFileName = oldAvatarUrl?.split("/").at(-1);
    const fileName = isOldUploaded
      ? getFileNameFromOld(oldAvatarFileName)
      : `avatar-${avatarId}-1`;
    const newImg = await resizeImage(avatarFile, 200, 200);
    await uploadFile("avatars", fileName, newImg);
    updateData.data.avatar_link = `${startURL}${fileName}`;

    if (isOldUploaded) await deleteFile("avatars", oldAvatarFileName);
  } else if (type === "password") {
    if (newPassword) updateData.password = newPassword;
  } else {
    return console.log("💣", "type in updateCurrentUser function is wrong");
  }
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    console.log("🔥", error.message);
    throw new Error(
      error.message.includes(
        "A user with this email address has already been registered"
      )
        ? "This user name is already used"
        : error.message,
      error.message
    );
  }
  return data;
}
