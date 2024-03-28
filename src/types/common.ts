import { type ParsedAIMessageInterface } from "./openai";
import type { ItineraryWithCityInfoType } from "./router";

// QuickLaunchItineraryType represents the data structure that is passed from the QuickLaunchTool component
// It is NOT ItineraryWithCityInfoType because it is not retrieved from the database, so we only have the
// "details" key and set everything else to an optional property (Partial) that will never be there
// type JustDetailsItineraryType = Pick<ItineraryWithCityInfoType, "details">;
type JustDetailsItineraryType = { details: ParsedAIMessageInterface[] };
export type QuickLaunchItineraryType = JustDetailsItineraryType &
  Partial<Omit<ItineraryWithCityInfoType, "details">>;
