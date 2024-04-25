"use client";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

import {
  GoogleReviewBadge,
  ImageGallery,
  TripAdvisorReviewBadge,
} from "@/components";
import type { PlaceResult, PlacesService } from "~/types/google";
import type {
  AttractionByNameType,
  GetTripAdvisorDetailsType,
} from "~/types/router";

interface PlaceDetailsProps {
  databaseData: AttractionByNameType;
  googleData?: PlaceResult;
  tripAdvisorData?: GetTripAdvisorDetailsType;
}

const PlacesProfileDetails = ({
  databaseData,
  googleData,
  tripAdvisorData,
}: PlaceDetailsProps) => {
  const placesLib = useMapsLibrary("places");
  const [placeResult, setPlaceResult] = useState<PlaceResult | undefined>(
    undefined,
  );
  const [placesService, setPlacesService] = useState<PlacesService | null>(
    null,
  );
  const [images, setImages] = useState<string[]>([]);

  // Correctly initializing PlacesService with a div element
  useEffect(() => {
    if (!placesLib) return;
    const map = new google.maps.Map(document.createElement("div"));
    setPlacesService(new placesLib.PlacesService(map));
  }, [placesLib]);

  // Fetch details from Google Places API
  useEffect(() => {
    if (!placesService || !databaseData) return;
    const request = {
      placeId: databaseData.googlePlaceId ?? "",
      fields: [
        "name",
        "rating",
        "formatted_address",
        "formatted_phone_number",
        "geometry",
        "user_ratings_total",
        "url",
        "website",
        "photos",
        "vicinity",
      ],
    };

    placesService.getDetails(request, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && result) {
        setPlaceResult(result);
        const photos = result?.photos?.map((photo) => {
          return photo.getUrl();
        });
        setImages(photos?.slice(0, 5) ?? []);
      } else {
        console.log("Failed to fetch place details:", status);
      }
    });
  }, [placesService, databaseData]);

  if (!databaseData || !tripAdvisorData) return null;
  if (typeof tripAdvisorData !== "object" || "error" in tripAdvisorData)
    // Only show details if tripAdvisorData is populated
    return null;

  //   TODO: Add conditionals for when tripAdvisorData is not populated

  const {
    description: tripAdvisorDescription,
    address_obj,
    category,
    subcategory,
  } = tripAdvisorData ?? {};
  const { city, country } = address_obj ?? {};
  const categoryLocalizedName = category?.localized_name;
  const displayedCategories = [
    categoryLocalizedName,
    ...(subcategory
      ?.filter((subCat) => {
        const subCatName = subCat.localized_name;
        // Check if subCatName matches the categoryLocalizedName (singular or plural)
        return (
          subCatName !== categoryLocalizedName &&
          subCatName !== categoryLocalizedName + "s" &&
          subCatName !== categoryLocalizedName?.slice(0, -1)
        );
      })
      .map((subCat) => subCat.localized_name) ?? []),
  ].filter(Boolean);

  return (
    <div className="mt-4 w-full">
      <ImageGallery images={images} />

      {/* Details Title */}
      <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        {city}, {country}
      </h2>
      <h3>{displayedCategories.join(" • ")}</h3>

      <div className="flex max-h-[252px] pt-2">
        {/* Description */}
        <div className="flex flex-1 overflow-y-auto border-y border-gray-300 pt-2 text-gray-600">
          {tripAdvisorDescription}
        </div>

        {/* Reviews */}
        <div className="flex flex-1 justify-end gap-2">
          <GoogleReviewBadge googleData={placeResult} />
          <TripAdvisorReviewBadge tripAdvisorData={tripAdvisorData} />
        </div>
      </div>
    </div>
  );
};

export default PlacesProfileDetails;
