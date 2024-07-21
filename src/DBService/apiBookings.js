import { isDateActive } from "../helper/isDateActive";
import { populateTimeLeft } from "./apiTours";
import supabase from "./supabase";

export async function getBookedTours({ userId }) {
  if (!userId) return null;
  await populateTimeLeft();
  const { data, error } = await supabase
    .from("bookings")
    .select("tours(*)")
    .eq("user_id", userId)
    .order("tours(start_date)", { ascending: false });
  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }

  return data
    ?.map((el) => el.tours)
    .sort((a) => (!isDateActive(a.start_date) || !a.is_active ? 1 : -1));
}

export async function getBooking({ userId, tourId }) {
  if (!userId || !tourId) return null;
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", userId)
    .eq("tour_id", tourId)
    .limit(1);
  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }
  if (!data || data.length === 0) return null;
  return data[0];
}

export async function createBooking({ userId, tourId }) {
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      user_id: userId,
      tour_id: tourId,
    })
    .select();
  if (error) {
    console.log("🔥", error.message);
    throw new Error(
      error.message.includes("duplicate key value")
        ? "You've already booked the tour"
        : error.message
    );
  }
  if (!data || data.length === 0) return null;
  return data[0];
}

export async function deleteBooking({ userId, tourId }) {
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("user_id", userId)
    .eq("tour_id", tourId);
  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }
}
