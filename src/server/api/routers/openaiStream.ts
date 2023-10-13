import openai from "~/utils/openai";

interface QueryInputInterface {
  cityName: string;
  startDate: string;
  endDate: string;
}

const generateQueryStreaming = (input: QueryInputInterface) => {
  return `Give a day-to-day itinerary to ${input.cityName} from ${input.startDate} to ${input.endDate}.`;
};
