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
  const router = useRouter();

  // Split the URL path into segments and filter out empty strings
  const pathSegments = router.asPath.split("/").filter(Boolean);

  // Create breadcrumb pages from URL segments
  const pages = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const isCurrentPage = index === pathSegments.length - 1;
    return { name: getDisplayName(segment), href, current: isCurrentPage };
  });

  // Don't render a breadcrumb trail on the home page
  if (router.asPath === "/" || router.asPath.startsWith("/#")) return null;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <Link href="/" className="text-gray-400 hover:text-gray-500">
            {/* <a href="./" className="text-gray-400 hover:text-gray-500"> */}
            <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="sr-only">Home</span>
            {/* </a> */}
          </Link>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <a
                href={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
