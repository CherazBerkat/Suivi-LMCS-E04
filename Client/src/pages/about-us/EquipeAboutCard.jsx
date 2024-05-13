/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
export default function EquipeAboutCard({ contenu }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      className={`bg-[#646464] bg-opacity-[15%] ${windowWidth > 1106 ? "w-[603px]" : windowWidth > 999 ? "w-[500px]" : windowWidth > 904 ? "w-[400px]" : "w-[378px]"} px-8 py-16 text-pure_white  rounded-[5px] shadow-[0_0_5px_0_rgba(255,255,255,0.25)] text-[19px] leading-[28.5px]`}
    >
      {contenu}
    </div>
  );
}
