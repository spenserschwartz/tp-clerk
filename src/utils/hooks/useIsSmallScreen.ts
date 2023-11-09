import { useEffect, useState } from "react";

function useIsSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640); // Example: 640px is Tailwind's 'sm' breakpoint

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isSmallScreen;
}

export default useIsSmallScreen;
