import supabase from "./supabase";

export async function populateTimeLeft() {
  const { data: isUpdated, error: populateError } = await supabase.rpc(
    "populate_time_left"
  );
  if (populateError) {
    console.log("🔥", populateError.message);
    throw new Error(populateError.message);
  }
}

export async function getTours({ season, sort, query }) {
  await populateTimeLeft();

  let request = supabase
    .from("tours")
    .select(
      "id,title,image_src,price,duration,start_date,start_place,number_of_bookings,time_left,is_active"
    )
    .eq("is_active", true)
    .gte("start_date", new Date().toISOString());

  if (season) {
    let seasons = season.split(",");
    let inArr = [];

    if (seasons.includes("spring")) {
      inArr.push(3, 4, 5);
    }
    if (seasons.includes("summer")) {
      inArr.push(6, 7, 8);
    }
    if (seasons.includes("fall")) {
      inArr.push(9, 10, 11);
    }
    if (seasons.includes("winter")) {
      inArr.push(12, 1, 2);
    }
    request.in("tour_month", inArr);
  }

  if (query) {
    request.textSearch("string_for_query", query.split(" ").join(" & "));
  }

  if (sort) {
    const [sortBy, direction] = sort.split("-");
    request = request.order(sortBy, { ascending: direction === "asc" });
  } else {
    request = request.order("id", { ascending: false });
  }

  request.order("start_date", { ascending: true });

  const { data, error } = await request;

  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }
  return data;
}

export async function getTourById(tourId) {
  const { data, error } = await supabase
    .from("tours")
    .select("*")
    .eq("id", tourId)
    .limit(1);
  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }
  if (!data || data.length === 0) return null;
  return data[0];
}
