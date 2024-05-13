/* eslint-disable react/prop-types */
import { useState } from "react";
export default function TitleIcon(props) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 500);
    window.location.href = props.href;
  };

  return (
    <h2 className=" flex flex-row gap-3 items-center">
      {props.icon && (
        <a onClick={handleClick}>
          <img
            src={props.icon}
            className={`${props.iconWidth} ${props.iconHeight} ${
              isActive ? " scale-95" : ""
            }`}
          />
        </a>
      )}
      <p
        className={`font-bold ${props.size} ${props.line} ${props.upper && "uppercase"} text-bg_black`}
      >
        {props.text}
      </p>
    </h2>
  );
}
