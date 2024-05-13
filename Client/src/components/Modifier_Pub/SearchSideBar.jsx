/* eslint-disable react/prop-types */
import "./SearchSideBar.css";
import LOGOWhite from "../../assets/images/LOGOWhite.svg";
import aideblack from "../../assets/icons/aideblack.svg";
import searchwhite from "../../assets/icons/searchwhite.svg";
import parametreswhite from "../../assets/icons/parametreswhite.svg";
import dashboardwhite from "../../assets/icons/dashboardwhite.svg";
import profilewhite from "../../assets/icons/profilewhite.svg";
import aidewhite from "../../assets/icons/aidewhite.svg";
import searchblack from "../../assets/icons/searchblack.svg";
import parametresblack from "../../assets/icons/parametresblack.svg";
import dashboardblack from "../../assets/icons/dashboardblack.svg";
import profileblack from "../../assets/icons/profileblack.svg";
import { useNavigate } from "react-router-dom";

export default function SearchSideBar({ page, visiteur }) {
  const navigate = useNavigate();
  const handelnavigate = () => {
    navigate("/");
  };
  return (
    <div className="bg-dark_blue w-full h-full text-bg_yellow text-[15px] font-normal leading-[22.5px]">
      <div className="h-[20%] relative" onClick={handelnavigate}>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <img
            src={LOGOWhite}
            alt="LMCS logo"
            className="absolute top-0 left-0 right-0 bottom-0 m-auto hover:scale-[1.02] hover:duration-300 active: duration-500  active:scale-[0.97]"
          />
        </a>
      </div>
      <div className="flex flex-col justify-between p-[15px] items-start w-full h-[80%] ">
        <div className="w-full flex flex-col gap-4">
          <hr />
          <ul>
            <li
              className={
                page == 1
                  ? "bg-main_yellow text-bg_black font-semibold pointer-events-none"
                  : "hover:scale-[1.02] hover:duration-300 active: duration-500  active:scale-[0.97]"
              }
            >
              <a href="" className={page == 1 ? "gap-0 px-[10px]" : " "}>
                <img src={page != 1 ? searchwhite : searchblack} />
                <h4>Recherche</h4>
              </a>
            </li>
            {!visiteur && (
              <li
                className={
                  page == 4
                    ? "bg-main_yellow text-bg_black font-semibold pointer-events-none"
                    : "hover:scale-[1.02] hover:duration-300 active: duration-500  active:scale-[0.97] "
                }
              >
                <a href="" className={page == 4 ? "gap-0 px-[10px]" : ""}>
                  <img src={page != 4 ? profilewhite : profileblack} />
                  <h4>Profile</h4>
                </a>
              </li>
            )}
            {!visiteur && (
              <li
                className={
                  page == 4
                    ? "bg-main_yellow text-bg_black font-semibold pointer-events-none"
                    : "hover:scale-[1.02] hover:duration-300 active: duration-500  active:scale-[0.97] "
                }
              >
                <a href="" className={page == 4 ? "gap-0 px-[10px]" : ""}>
                  <img src={page != 4 ? dashboardwhite : dashboardblack} />
                  <h4>Dashboard</h4>
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="w-full flex flex-col gap-4">
          <hr />
          <ul>
            {!visiteur && (
              <li
                className={
                  page == 5
                    ? "bg-main_yellow text-bg_black font-semibold pointer-events-none"
                    : "hover:scale-[1.02] hover:duration-300 active: duration-500  active:scale-[0.97]"
                }
              >
                <a href="" className={page == 5 ? "gap-0 px-[10px]" : ""}>
                  <img src={page != 5 ? parametreswhite : parametresblack} />
                  <h4>Parametres</h4>
                </a>
              </li>
            )}
            <li
              className={
                page == 6
                  ? "bg-main_yellow text-bg_black font-semibold pointer-events-none"
                  : "hover:scale-[1.02] hover:duration-300 active: duration-500  active:scale-[0.97]"
              }
            >
              <a href="" className={page == 6 ? "gap-0 px-[10px]" : ""}>
                <img src={page != 6 ? aidewhite : aideblack} />
                <h4>Aide</h4>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* 
search pages ... side bar
it needs a number to know which page is active 
it needs a boolean to know if the user is a visitor or not 
*/
