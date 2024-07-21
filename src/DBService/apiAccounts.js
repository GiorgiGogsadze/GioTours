import supabase from "./supabase";

export async function getAccountWithId(id) {
  if (!id) return null;
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("id", id)
    .limit(1);

  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }

  if (!data || data.length === 0) return null;
  return data[0];
}

export async function getAccountWithUserName(userName) {
  if (!userName) return null;
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_name", userName)
    .limit(1);

  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }
  if (!data || data.length === 0) return null;
  return data[0];
}

export async function changeAccountAccess(userId, isPublic) {
  const { data, error } = await supabase
    .from("accounts")
    .update({ is_public: isPublic })
    .eq("id", userId)
    .select();
  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }
  if (!data || data.length === 0) return null;
  return data[0];
}
