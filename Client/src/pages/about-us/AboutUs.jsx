// Importing necessary components and hooks
import SecOne from "./SecOne";
import SecTwo from "./SecTwo";
import LandingNavBar from "../../components/nav-bars/LandingNavBar";
import { useState, useEffect } from "react";

// Exporting the AboutUs component
export default function AboutUs() {
  // State variable to track window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect hook to update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // Adding event listener for resize
    window.addEventListener("resize", handleResize);
    // Removing event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Rendering the component
  return (
    <>
      {/* Landing navigation bar */}
      <LandingNavBar text="About Us" href="/" />
      {/* Div container with dynamic padding based on window width */}
      <div
        className={`bg-bg_black ${windowWidth > 1344 ? "px-24" : windowWidth > 1266 ? "px-8" : "px-4"} py-16`}
      >
        {/* Section One component */}
        <SecOne />
        {/* Section Two component */}
        <SecTwo />
      </div>
    </>
  );
}
