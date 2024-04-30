"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

import { unknownClerkUser } from "~/lib/constants";
import { AvatarPlaceholder } from "./icons";

interface AvatarProps {
  userId: string | null;
}

export default function Avatar({ userId }: AvatarProps) {
  const router = useRouter();
  const { data: itineraryUserData } = api.profile.getUserById.useQuery({
    userId: userId ?? "",
  });

  const { firstName, lastName, profileImageUrl } = itineraryUserData ?? {};
  const displayName = firstName ? `${firstName} ${lastName}` : "Unknown User";
  const isFakeUser = !userId || userId === unknownClerkUser.id;

  const clickHandler = () => {
    if (isFakeUser) return;
    void router.push(`/user/${userId}`);
  };

  return (
    <div
      className="group block flex-shrink-0 cursor-pointer"
      onClick={clickHandler}
    >
      <div className="flex items-center">
        {/* Show profile image or placeholder */}
        <div>
          {profileImageUrl ? (
            <Image
              className="inline-block h-9 w-9 rounded-full"
              src={profileImageUrl ?? ""}
              alt="Itinerary Creator Profile Image"
              width={36} // width of the image in pixels
              height={36} // height of the image in pixels
            />
          ) : (
            <AvatarPlaceholder />
          )}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {displayName}
          </p>
          {!isFakeUser && (
            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
              View profile
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
