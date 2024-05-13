/* eslint-disable react/prop-types */
/* padding 100,16*/
import TitleIcon from "../titles/TitleIcon";
import arrowSmallLeft from "../../assets/icons/arrowSmallLeft.svg";
export default function LandingNavBar(props) {
  return (
    <div className="px-[100px] py-4 bg-pure_white sticky top-0 z-10 flex flex-row justify-between items-center shadow-[0_0_25px_rgba(0,0,0,0.25)]">
      <TitleIcon
        icon={arrowSmallLeft}
        text={props.text}
        upper={true}
        size="text-[35px]"
        line="leading-[52.5px]"
        iconWidth="w-[50px]"
        href={props.href}
      />
    </div>
  );
}

/*
used for: teams and about us pages nav bar
needs text prop
*/
