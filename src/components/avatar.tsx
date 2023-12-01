import Image from "next/image";
import { useRouter } from "next/router";
import AvatarPlaceholder from "public/icons/avatarPlaceholder";
import { api } from "~/utils/api";

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

  const clickHandler = () => {
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
              layout="fixed"
            />
          ) : (
            <AvatarPlaceholder />
          )}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {displayName}
          </p>
          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
            View profile
          </p>
        </div>
      </div>
    </div>
  );
}
