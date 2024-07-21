export function isDateActive(date) {
  return new Date() - new Date(date) < 0;
}
