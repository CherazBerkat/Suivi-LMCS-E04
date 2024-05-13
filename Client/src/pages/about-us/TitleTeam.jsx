// Disabling eslint rule for prop types
/* eslint-disable react/prop-types */

// Importing necessary hooks
import { useEffect, useState } from "react";

// Exporting the TitleTeam component
export default function TitleTeam({ text, textColor }) {
  // State variable for window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect hook to update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Rendering the component
  return (
    <h2 className={`flex flex-row ${windowWidth < 1192 ? "gap-0" : "gap-3"} ${textColor} font-bold text-[50px] items-baseline uppercase`}>
      {/* Conditional rendering for yellow bar */}
      <p className={`${windowWidth < 1192 && "hidden"} bg-main_yellow w-[9px] ${windowWidth > 1228 ? "h-[35px]" : "h-[25px]"}`}></p>
      {/* Title text */}
      <p className={windowWidth < 1228 ? "text-[30px]" : ""}>{text}</p>
    </h2>
  );
}
