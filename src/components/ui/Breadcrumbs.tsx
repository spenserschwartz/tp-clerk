import { useUser } from "@clerk/nextjs";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";

const getDisplayName = (segment: string) => {
  return segment
    .replace(/#/g, "") // Remove hashtags
    .split("-") // Split the string by hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words with spaces
};

export default function Breadcrumbs() {
  const { user } = useUser();
  const router = useRouter();

  // Split the URL path into segments and filter out empty strings
  const pathSegments = router.asPath.split("/").filter(Boolean);

  const pathsToNotShow: Record<string, boolean> = { city: true };

  // Create breadcrumb pages from URL segments
  const pages = pathSegments
    .filter((path) => !pathsToNotShow[path]) // Filter out paths that we don't want to show
    .map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const isCurrentPage = index === pathSegments.length - 1;

      // Conditional logic to handle user
      if (pathSegments[index - 1] === "user") {
        return {
          name: user?.fullName ?? "userName",
          href,
          current: isCurrentPage,
        };
      }

      return { name: getDisplayName(segment), href, current: isCurrentPage };
    });

  console.log("pages", pages);

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
