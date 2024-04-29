//* CONSTANTS */

const databaseCities: string[] = ["Berlin", "London"];
export const databaseCitiesSet = new Set<string>(databaseCities);

export const newYorkCityData = {
  cityId: "ChIJOwg_06VPwokRYv534QaPC8g",
  cityName: "New York City",
  imageURL:
    "https://images.unsplash.com/photo-1546436836-07a91091f160?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  itineraryDetails: [
    {
      date: "April 29, 2024",
      evening:
        "Watch a Broadway show in the Theater District, indulge in a pre-theater dinner at a trendy restaurant, and take a walk through Times Square to experience the vibrant nightlife.",
      morning:
        "Visit the Statue of Liberty and take a ferry tour around the island, explore the museum and enjoy the stunning views of New York Harbor.",
      afternoon:
        "Head to Central Park for a picnic lunch, rent a rowboat or take a leisurely stroll through the park's beautiful landscapes and iconic landmarks.",
      dayOfWeek: "Saturday",
    },
    {
      date: "April 30, 2024",
      evening:
        "Dine at a rooftop restaurant with panoramic views of the city, then take a leisurely stroll along the Brooklyn Bridge promenade for stunning views of the skyline.",
      morning:
        "Visit the Metropolitan Museum of Art to explore the extensive art collections, ancient artifacts, and special exhibitions.",
      afternoon:
        "Take a guided walking tour of the High Line, an elevated park built on a historic freight rail line, and enjoy the scenic views of Manhattan's west side.",
      dayOfWeek: "Sunday",
    },
    {
      date: "May 1, 2024",
      evening:
        "Experience the vibrant nightlife in the trendy neighborhood of Greenwich Village, known for its live music venues, comedy clubs, and eclectic dining options.",
      morning:
        "Explore the 9/11 Memorial & Museum to pay tribute to the victims and learn about the events of September 11, 2001.",
      afternoon:
        "Visit the Empire State Building and take in breathtaking views of the city from the observation deck on the 86th floor.",
      dayOfWeek: "Monday",
    },
  ],
  itineraryTitle: "3 days in New York City",
};

export const quickLaunchCities = [
  "London",
  "Berlin",
  "New York City",
  "Paris",
  "Munich",
  "Amsterdam",
  "Rome",
  "Barcelona",
  "Madrid",
  "Prague",
  "Vienna",
  "Budapest",
  "Dublin",
  "Lisbon",
  "Brussels",
  "Copenhagen",
  "Stockholm",
  "Athens",
  "Helsinki",
  "Oslo",
  "Warsaw",
  "Zurich",
  "Moscow",
  "Istanbul",
  "Saint Petersburg",
  "Bucharest",
  "Edinburgh",
  "Venice",
  "Florence",
  "Milan",
  "Naples",
  "Luxembourg City",
  "Reykjavik",
  "Monaco",
  "Vatican City",
];

export const travelQuotes = [
  {
    author: "Susan Sontag",
    quote: `I haven't been everywhere, but it's on my list.`,
  },
  {
    author: "Mark Twain",
    quote: `Twenty years from now you will be more disappointed by the things you didn’t do than by the ones you did do.`,
  },
  {
    author: "Anonymous",
    quote: "We travel not to escape life, but for life not to escape us.",
  },
  {
    author: "André Gide",
    quote:
      "Man cannot discover new oceans unless he has the courage to lose sight of the shore.",
  },
  {
    author: "Oliver Wendell Holmes Jr.",
    quote:
      "A mind that is stretched by a new experience can never go back to its old dimensions.",
  },
  {
    author: "Helen Keller",
    quote: "Life is either a daring adventure or nothing at all.",
  },
  {
    author: `Roy M. Goodman`,
    quote: `Remember that happiness is a way of travel – not a destination.`,
  },
  {
    author: `Neale Donald Walsch`,
    quote: `Life begins at the end of your comfort zone.`,
  },
  {
    author: `Saint Augustine`,
    quote: `The world is a book and those who do not travel read only one page.`,
  },
];

export const unknownClerkCity = {
  id: "custom",
  name: "Custom City",
};

export const unknownClerkUser = {
  id: "user_2YxVp66u0zvMgoN7zOSm6sJiiHb",
};

export const unknownItinerary = {
  id: "fake",
};
