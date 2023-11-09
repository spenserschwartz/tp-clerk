import { useEffect, useState } from "react";

function useIsSmallScreen() {
  // Initialize state with undefined or a default value
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    // Ensure window is defined
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 640); // Adjust the breakpoint as needed
      };

      window.addEventListener("resize", handleResize);
      handleResize(); // Set the initial value

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return isSmallScreen;
}

export default useIsSmallScreen;
