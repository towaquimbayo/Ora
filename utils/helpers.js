export function formatDate(date) {
  const dateFormatted = new Date(date + "T00:00:00");
  return dateFormatted.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "America/Vancouver",
  });
}
