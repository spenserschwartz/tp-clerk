"use client";
import { useUser } from "@clerk/nextjs";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { convertSlugToDatabaseName } from "~/lib/utils";
import { api } from "~/trpc/react";

export default function Breadcrumbs() {
  const { user, isLoaded: clerkUserIsLoaded } = useUser();
  const pathname = usePathname();

  // Split the URL path into segments and filter out empty strings
  const pathSegments = pathname.split("/").filter(Boolean);

  const pathsToNotShow: Record<string, boolean> = { city: true };

  const { data: itineraryData } = api.itinerary.getByID.useQuery(
    { id: pathSegments[pathSegments.length - 1] ?? "" },
    { enabled: pathSegments[pathSegments.length - 2] === "itinerary" },
  );

  // Create breadcrumb pages from URL segments
  const pages = pathSegments
    .filter((path) => !pathsToNotShow[path]) // Filter out paths that we don't want to show
    .map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const isCurrentPage = index === pathSegments.length - 1;

      // Conditional logic to handle user
      if (pathSegments[index - 1] === "user") {
        return {
          // name: user?.fullName ?? "userName",
          name: clerkUserIsLoaded
            ? user?.fullName ?? "userName not found"
            : "loading user...",
          href,
          current: isCurrentPage,
        };
      }

      // Conditional logic to handle things-to-do
      if (
        pathSegments[0] === "things-to-do" &&
        index > 0 &&
        index < pathSegments.length - 1
      ) {
        return {
          name: convertSlugToDatabaseName(segment),
          href: "/",
          current: isCurrentPage,
        };
      }

      // Conditoinal logic to handle itinerary
      if (pathSegments[index - 1] === "itinerary") {
        return {
          name: itineraryData?.title ?? convertSlugToDatabaseName(segment),
          href,
          current: isCurrentPage,
        };
      }

      // Default logic
      return {
        name: convertSlugToDatabaseName(segment),
        href,
        current: isCurrentPage,
      };
    });

  // Don't show on homepage
  if (pathname === "/") return null;
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="mb-2 flex items-center space-x-4">
        {/* Home Icon */}
        <li key="home-icon">
          <Link href="/" className="text-gray-400 hover:text-gray-500">
            <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {/* Rest of breadcrumbs */}
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />

              <Link
                href={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
