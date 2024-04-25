"use client";
import { ImageGallery } from "@/components";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import type {
  PlaceResult,
  PlaceResultWithLatLng,
  PlacesService,
} from "~/types/google";

interface ThingsToDoDetailsProps {
  googlePlaceId: string;
  //   placeResult: PlaceResultWithLatLng;
}

const ThingsToDoDetails = ({ googlePlaceId }: ThingsToDoDetailsProps) => {
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
    if (!placesService || !googlePlaceId) return;
    const request = {
      placeId: googlePlaceId ?? "",
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
  }, [placesService, googlePlaceId]);

  console.log("googlePlaceId", googlePlaceId);
  console.log("placeResult", placeResult);
  console.log("images", images);
  return (
    <div className="mt-4 w-full">
      <ImageGallery images={images} />
    </div>
  );
};

export default ThingsToDoDetails;
