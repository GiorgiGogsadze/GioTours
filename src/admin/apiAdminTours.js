import { populateTimeLeft } from "../DBService/apiTours";
import supabase, { supabaseUrl } from "../DBService/supabase";
import {
  getFileNameFromOld,
  copyFile,
  uploadFile,
} from "../DBService/apiStorage";

export async function adminGetTours(query) {
  await populateTimeLeft();

  let request = supabase.from("tours").select("*").eq("is_active", true);

  if (query) {
    request.textSearch("string_for_query", query.split(" ").join(" & "));
  }

  request.order("start_date", { ascending: true });

  const { data, error } = await request;

  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }

  return data;
}

async function insertTour(tour) {
  const { data, error } = await supabase.from("tours").insert(tour).select();
  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }
  return data?.[0];
}

async function updateTour(tourId, updateObj) {
  const { error } = await supabase
    .from("tours")
    .update(updateObj)
    .eq("id", tourId);
  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }
}

export async function adminAddTour({ tour, image, imageSrcToCopy }) {
  //tour has no image_src
  if (!tour || (!image && !imageSrcToCopy))
    throw new Error("tour info is not enough");

  const data = await insertTour(tour);

  const startURL = `${supabaseUrl}/storage/v1/object/public/tours/`;
  const newImageName = `tour-${data.id}-1`;

  try {
    if (image) {
      await uploadFile("tours", newImageName, image);
    } else {
      await copyFile("tours", imageSrcToCopy, newImageName);
    }
  } catch (err) {
    await supabase.from("tours").delete().eq("id", data.id);
    throw new Error("image couldn't be uploaded");
  }

  await updateTour(data.id, { image_src: startURL + newImageName });
}

export async function adminEditTour({ oldTour, updatedTour, newImg, renew }) {
  //updatedTour has no image_src

  const startURL = `${supabaseUrl}/storage/v1/object/public/tours/`;
  const oldImageName = oldTour.image_src.split("/").at(-1);
  const newImageName = getFileNameFromOld(oldImageName);

  if (renew) {
    await adminAddTour({
      tour: updatedTour,
      image: newImg,
      imageSrcToCopy: oldImageName,
    });
    await adminDeleteTour(oldTour.id);
  } else {
    const updateObj = updatedTour;
    if (newImg) {
      await uploadFile("tours", newImageName, newImg);
      updateObj.image_src = startURL + newImageName;
    }
    await updateTour(oldTour.id, updateObj);
  }
}

export async function adminDeleteTour(tourId) {
  const { error } = await supabase
    .from("tours")
    .update({ is_active: false })
    .eq("id", tourId);
  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }
}
