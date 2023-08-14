export const displayCityName = (city: string): string => {
  return city
    .split("_") // split from underscores
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1)) // capitalize first letter
    .join(" "); // join back to string
};

console.log(displayCityName("new_york_city"));
