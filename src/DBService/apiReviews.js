import supabase from "./supabase";

export async function getReviews() {
  const { data, error } = await supabase
    .from("accounts")
    .select("id, avatar_link, real_name, rate, review")
    .not("rate", "is", null)
    .not("review", "is", null)
    .order("rate", { ascending: false });

  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }
  return data;
}

export async function setReview({ accountId, review, rate }) {
  const { error } = await supabase
    .from("accounts")
    .update({ review, rate })
    .eq("id", accountId);
  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }
}

export async function deleteReview({ accountId }) {
  const { error } = await supabase
    .from("accounts")
    .update({ review: null, rate: null })
    .eq("id", accountId);
  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }
}
