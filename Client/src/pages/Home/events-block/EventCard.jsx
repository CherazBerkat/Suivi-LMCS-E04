/* eslint-disable react/prop-types */
import clock from "../../../assets/icons/clock.svg";
import mapMarker from "../../../assets/icons/mapMarker.svg";
import mapMarkerGrey from "../../../assets/icons/mapMarkerGrey.svg";
import clockGrey from "../../../assets/icons/clockGrey.svg";
import "./EventCard.css";
import { useEffect, useState } from "react";

export default function EventCard({
  name,
  place,
  start,
  end,
  day,
  month,
  year,
  weekday,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverHandler = () => {
    setIsHovered(!isHovered);
  };
  const p3 = `${month} ${year}`;
  const [bareHeight, setBareHeight] = useState(159 * 0.7182);
  const truncatedName =
    name.length > 151 ? name.substring(0, 151) + "..." : name;
  const [isNameClicked, setIsNameClicked] = useState(false);

  const isNameClickedHandler = () => {
    setIsNameClicked(!isNameClicked);
  };

  const truncatedPlace =
    place.length > 69 ? place.substring(0, 69) + "..." : place;
  const [isPlaceClicked, setIsPlaceClicked] = useState(false);

  const isPlaceClickedHandler = () => {
    setIsPlaceClicked(!isPlaceClicked);
  };

  const [cardHeight, setCardHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setCardHeight(document.getElementById("card").offsetHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setBareHeight(document.getElementById("card").offsetHeight * 0.7182);
  }, [isNameClicked, isPlaceClicked, cardHeight]);

  return (
    <div
      className={`flex flex-row items-center gap-[58px] justify-start px-[30px] py-5 rounded-[2px] border-[3.5px] border-main_blue w-[72.33vw] ${
        isNameClicked || isPlaceClicked ? "h-fit" : "h-[159px]"
      } group/{card} hover:border-main_yellow`}
      id="card"
      onMouseEnter={hoverHandler}
      onMouseLeave={hoverHandler}
    >
      <div className="flex flex-col items-center justify-center">
        <p className="font-light text-[21px] leading-[31.5px]">{weekday}</p>
        <p className="font-bold text-[30px] leading-[45px]">{day}</p>
        <p className="font-light text-[21px] leading-[31.5px] whitespace-nowrap">
          {p3}
        </p>
      </div>
      <div
        className="border-l border-main_blue border-[3.5px] group-hover/{card}:border-main_yellow"
        style={{ height: `${bareHeight}px` }}
      />
      <div className="flex flex-col items-start justify-start gap-[3px]">
        <p
          className="font-bold text-[18px] leading-[27px] cursor-pointer hover:scale-[1.02] hover:duration-300"
          onClick={isNameClickedHandler}
        >
          {isNameClicked ? name : truncatedName}
        </p>
        <div className="flex flex-row items-center gap-[25px] text-main_blue group-hover/{card}:text-[#30353C]">
          <div
            className="flex flex-row gap-[2px] items-baseline hover:scale-[1.02] hover:duration-300 cursor-pointer"
            onClick={isPlaceClickedHandler}
          >
            <img
              src={isHovered ? mapMarkerGrey : mapMarker}
              className="w-[11px] h-[14.67px]"
            />
            <p className="text-[18px] leading-[27px] font-medium">
              {isPlaceClicked ? place : truncatedPlace}
            </p>
          </div>
          <div className="flex flex-row gap-[8px] items-center">
            <img
              src={isHovered ? clockGrey : clock}
              className="w-[14px] h-[14px]"
            />
            <p className="font-semibold text-[13px] leading-[19.5px]">
              {start} - {end}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
