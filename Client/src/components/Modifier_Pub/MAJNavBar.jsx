/* eslint-disable react/prop-types */
/* padding 32,10*/
import { IoNotificationsOutline } from "react-icons/io5";
export default function MAJNavBar(props) {
  return (
    <div>
    <div className="px-8 py-2.5 bg-pure_white sticky top-0 z-10 flex flex-row justify-between items-center shadow-[0_0_25px_rgba(0,0,0,0.25)]">
      <IoNotificationsOutline className="z-10  absolute  mx-8  right-52 text-2xl  text-[#3D80B3] "/>
      {props.content}
    </div>
    </div>
  );
}
