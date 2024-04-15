import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" aria-label="TravelPerfect">
      <div className="w-8">
        {/* Tailwind class for width */}
        <Image
          src="/images/penguin_purp_cropped.png"
          width={328} // Original image width
          height={516} // Original image height
          alt="HeaderIcon"
        />
      </div>
    </Link>
  );
}
