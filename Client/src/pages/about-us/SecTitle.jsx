// Disabling eslint rule for prop types
/* eslint-disable react/prop-types */

// Importing necessary hooks
import { useEffect, useState } from "react";

// Exporting the SecTitle component
export default function SecTitle({ text, textColor }) {
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
    <h2 className={`flex flex-row gap-3 ${textColor} font-bold text-[40px] items-baseline uppercase`}>
      {/* Vertical bar */}
      <p className={`${windowWidth < 622 && "hidden"} bg-main_blue w-[9px] ${windowWidth < 792 ? "h-[20px]" : "h-[30px]"}`}></p>
      {/* Title text */}
      <p className={windowWidth < 648 ? "text-[27px]" : windowWidth < 792 ? "text-[30px]" : ""}>{text}</p>
    </h2>
  );
}

/*
used for: landing pages titles
*/
