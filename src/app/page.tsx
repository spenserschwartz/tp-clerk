import { Features, FeaturesQuickLaunch, Hero } from "@/components";

export default async function Home() {
  return (
    <div>
      <Hero />

      <Features />

      <FeaturesQuickLaunch />
    </div>
  );
}
