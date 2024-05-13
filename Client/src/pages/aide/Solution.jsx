// Disabling eslint rule for prop types
/* eslint-disable react/prop-types */
import chevron1 from "../../assets/icons/chevronDown.svg";
import chevron2 from "../../assets/icons/chevron-up.svg";
import Cercle from "./Cercle";
// Exporting the Solution component
export default function Solution({
  solution,
  text_solution,
  toggle,
  isClicked,
  lien,
}) {
  // Rendering the component
  return (
    <>
      <div
        className="w-full px-[10px] p-[3px] flex flex-row items-center  cursor-pointer justify-between"
        onClick={() => toggle()}
      >
        <div className=" flex flex-row  justify-center w-full">
          <Cercle color={isClicked ? "bg-main_yellow" : "bg-gris"} />
          <div className="pr-[10px] pl-[10px] text-[17px] font-light w-full">
            {solution}
          </div>
          <img
            alt="pop"
            src={isClicked ? chevron1 : chevron2}
            className="w-[25px] h-[27.73px] "
          />
        </div>
      </div>

      <div className={`${!isClicked && "hidden"} font-light text-[16px] p-2`}>
        {text_solution}
        {lien && (
          <a href={lien} className="hover:text-main_blue hover:underline">
            ici
          </a>
        )}
      </div>
    </>
  );
}
