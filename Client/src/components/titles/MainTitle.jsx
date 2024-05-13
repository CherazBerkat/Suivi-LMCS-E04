/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
export default function MainTitle({ text, textColor }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <h2
      className={`flex flex-row gap-3 ${textColor} font-bold text-[50px] items-baseline uppercase`}
    >
      <p
        className={`${windowWidth < 622 && "hidden"} bg-main_blue w-[9px] h-[35px]`}
      >
        {" "}
      </p>
      <p className={windowWidth < 535.2 ? "text-[40px]" : ""}>{text}</p>
    </h2>
  );
}

/*
used for: landing pages titles

*/
