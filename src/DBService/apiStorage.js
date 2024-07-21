import supabase from "./supabase";
import Resizer from "react-image-file-resizer";

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export function resizeImage(file, newWidth, newHeight) {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      newWidth,
      newHeight,
      "JPEG",
      100,
      0,
      (url) => resolve(dataURLtoFile(url)),
      "base64"
    );
  });
}

export function getFileNameFromOld(oldFileName) {
  const oldArr = oldFileName.split("-");
  const num = +oldArr.pop();
  return `${oldArr.join("-")}-${num + 1}`;
}

export async function uploadFile(bucketName, fileName, file) {
  const { error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file);
  if (error) {
    console.log(error);
    console.log("🔥", error.message);
    throw new Error(error.message);
  }
}

export async function deleteFile(bucketName, fileName) {
  const { error } = await supabase.storage.from(bucketName).remove([fileName]);
  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }
}

export async function copyFile(bucketName, fileName1, fileName2) {
  const { error } = await supabase.storage
    .from(bucketName)
    .copy(fileName1, fileName2);
  if (error) {
    console.log("🔥", error.message);
    throw new Error(error.message);
  }
}
