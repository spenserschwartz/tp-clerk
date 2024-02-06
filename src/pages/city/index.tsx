import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CityPage: NextPage = () => {
  const router = useRouter();

  // Redirect to the homepage
  useEffect(() => {
    void router.push("/");
  }, [router]);

  return null;
};

export default CityPage;
