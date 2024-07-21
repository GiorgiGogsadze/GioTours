import { formatInTimeZone } from "date-fns-tz";
export function getTimeString({
  date,
  place,
  timeZone,
  format = "MMMM dd y, HH:mm",
}) {
  let timeString;
  let timeZoneString;
  if (timeZone) {
    timeString = formatInTimeZone(date, timeZone, format);
    timeZoneString = timeZone;
  } else {
    try {
      if (!place) throw new Error();
      timeString = formatInTimeZone(
        date,
        `${place.continent}/${place.region_city.split(" ").join("_")}`,
        format
      );
      timeZoneString = place.region_city + " Locale Time";
    } catch (err) {
      timeString = formatInTimeZone(date, "UTC", format);
      timeZoneString = "UTC";
    }
  }
  return { timeString, timeZoneString };
}
