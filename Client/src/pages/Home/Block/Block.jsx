/* eslint-disable react/prop-types */
import MainTitle from "../../../components/titles/MainTitle";
import ButHome from "../../../components/buttons/ButHome";
import arrowSmallRight from "../../../assets/icons/arrowSmallRight.svg";
import { useState, useEffect } from "react";

// Block component definition
export default function Block({
  title,
  contenu,
  isButton,
  isPadding,
  bg,
  isTop,
  src,
}) {
  // State to track window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect to update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Rendering block content
  return (
    <div
      className={`px-16 ${isTop ? "pt-[30px] pb-[100px]" : "py-[100px]"} ${bg}`}
    >
      <div className="flex flex-row justify-between items-center mb-[50px] ">
        <MainTitle
          text={title}
          textColor={bg === "bg-bg_black" ? "text-pure_white" : ""}
        />
        {/* Rendering button if isButton is true and window width is greater than 678 */}
        {isButton && windowWidth > 678 && (
          <a href={src}>
            <ButHome
              width={windowWidth <= 756 ? "w-[150px]" : "w-[235px]"}
              isIcon={true}
              text="Découvrir plus"
              icon={arrowSmallRight}
              upper={false}
            />
          </a>
        )}
      </div>
      {/* Applying padding if isPadding is true */}
      <div className={isPadding ? "px-[90px]" : ""}>{contenu}</div>
    </div>
  );
}
