// Disabling eslint rule for prop types
/* eslint-disable react/prop-types */

// Importing necessary modules and components
import Solution from "./Solution";
import React from "react";
import "./ProblemeCard.css";

// Exporting the ProblemeCard component
export default function ProblemeCard({
  text,
  text_solution1,
  text_solution2,
  lien,
}) {
  // State to manage the visibility of the solutions
  const [isClicked1, setIsClicked1] = React.useState(false);
  const [isClicked2, setIsClicked2] = React.useState(false);

  // Function to toggle the visibility of the first solution
  function toggle1() {
    if (!isClicked1 && isClicked2) {
      setIsClicked1(!isClicked1);
      setIsClicked2(!isClicked2);
    } else {
      if (isClicked1 && !isClicked2) {
        setIsClicked1(!isClicked1);
      } else {
        setIsClicked1(!isClicked1);
      }
    }
  }

  // Function to toggle the visibility of the second solution
  function toggle2() {
    if (isClicked2 && !isClicked1) {
      setIsClicked2(!isClicked2);
    } else {
      if (isClicked1 && !isClicked2) {
        setIsClicked1(!isClicked1);
        setIsClicked2(!isClicked2);
      } else {
        setIsClicked2(!isClicked2);
      }
    }
  }

  // Rendering the component
  return (
    <div
      id="probleme-card"
      className={`rounded-[3px] ${isClicked1 || isClicked2 ? "h-fit" : "h-fit"} w-[522px] bg-pure_white pr-[16px] pl-[16px] pt-[8px] pb-[8px] ml-[8px] mr-[8px] mt-[16px] shadow-md  flex flex-col justify-center items-center`}
    >
      <div className="text-[20px] text-main_blue w-full text-center tracking-wide pr-[20px] pl-[20px]">
        {text}
      </div>

      <Solution
        solution="Problème"
        text_solution={text_solution1}
        toggle={toggle1}
        isClicked={isClicked1}
      />
      <hr id="line" />
      <Solution
        solution="Solutions Proposées"
        text_solution={text_solution2}
        toggle={toggle2}
        isClicked={isClicked2}
        lien={lien}
      />
    </div>
  );
}
