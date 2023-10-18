import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="TravelPerfect">
      <Image
        src="/images/penguin_purp_cropped.png"
        width={32}
        height={32}
        alt="HeaderIcon"
      />
    </Link>
  );
}
