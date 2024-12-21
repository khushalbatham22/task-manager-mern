import dayjs from "dayjs";

// Function to convert dd/mm/yyyy to a localized date format
export const convertToLocalizedDate = (ddmmyyyy) => {
  const [day, month, year] = ddmmyyyy.split("/").map(Number); // Split and parse the components
  const localizedDate = dayjs(new Date(year, month - 1, day)); // Create a dayjs or JS Date object
  return localizedDate.toISOString(); // Convert to ISO 8601 string or use `localizedDate.format()` for custom formats
};

export const formatDate = (date) => dayjs(date).format("DD/MM/YYYY"); // Format the date
