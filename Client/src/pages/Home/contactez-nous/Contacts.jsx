import location from "../../../assets/images/location.svg";
import phone from "../../../assets/icons/phone.svg";
import mail from "../../../assets/icons/mail.svg";
import instagramBlack from "../../../assets/icons/instagramBlack.svg";
import linkedinBlack from "../../../assets/icons/linkedinBlack.svg";
import linkedin from "../../../assets/icons/linkedin.svg";
import x from "../../../assets/icons/x.svg";
import instagram from "../../../assets/icons/instagram.svg";
import xBlack from "../../../assets/icons/xBlack.svg";
import windows from "../../../assets/icons/windows.svg";
import LOGOBlack from "../../../assets/images/LOGOBlack.svg";
import { useState, useEffect } from "react";

export default function Contacts() {
  const [instaIconHovered, setinstaIconHovered] = useState(false);
  function handleinstaIconHovered() {
    setinstaIconHovered(!instaIconHovered);
  }
  const [linkedinIconHovered, setlinkedinIconHovered] = useState(false);
  function handlelinkedinIconHovered() {
    setlinkedinIconHovered(!linkedinIconHovered);
  }
  const [xIconHovered, setxIconHovered] = useState(false);
  function handlexIconHovered() {
    setxIconHovered(!xIconHovered);
  }
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const width = () => {
    if (windowWidth > 1387) return "w-[346px]";
    else {
      if (windowWidth > 1303) return "w-[300px]";
      else return "w-[250px] ";
    }
  };
  const widthTwo = () => {
    if (windowWidth > 1355) return "w-[479px]";
    else {
      if (windowWidth > 996) return "w-[400px]";
      else {
        if (windowWidth > 996) return "w-[350px] ";
        else return "w-[300px]";
      }
    }
  };

  const widthThree = () => {
    if (windowWidth > 694) return "text-[20px]";
    else return "text-[18px]";
  };

  return (
    <>
      <div
        className={`bg-bg_yellow flex flex-row  ${
          windowWidth > 846 ? "justify-between" : " justify-center"
        } items-center ${
          windowWidth > 548 ? "px-16" : "px-10"
        } pt-4 pb-10`}
      >
        <div className="flex flex-row items-center gap-[19px] p-8">
          <div
            className={`text-black text-[20px] leading-[30px]  ${
              windowWidth < 1267 ? "hidden" : ""
            } ${width()} flex flex-col gap-4`}
          >
            <img
              src={LOGOBlack}
              alt="LOGO LMCS"
              className="w-[193px] h-[118px]"
            />
            <h6 className="font-semibold ">
              LABORATOIRE DE METHODES DE CONCEPTION DES SYSTEME
            </h6>
            <p className=" font-[275] ">
              Labo LMCS ESI, Oued Smar Alger , 16309
            </p>
          </div>
          <div>
            <div className="h-[50px] flex-grow flex flex-row p-[10px] gap-[10px] border-[0.3px] rounded-[5px] border-bg_yellow hover:border-main_blue">
              <img
                src={mail}
                alt="mail icon"
                className="w-[25px] h-[27.27px]"
              />
              <p className="text-[20px] leading-[30px] font-normal ">
                <span className="text-main_blue">E-mail : </span>lmcs@esi.dz
              </p>
            </div>
            <div className="h-[50px] flex-grow flex flex-row p-[10px] gap-[10px] border-[0.3px] rounded-[5px] border-bg_yellow  hover:border-main_blue">
              <img
                src={phone}
                alt=" phone icon"
                className="w-[25px] h-[27.27px] "
              />
              <p className="text-[20px] leading-[30px] font-normal ">
                <span className="text-main_blue">Tél / Fax : </span> 023 55 66
                66
              </p>
            </div>
            <div className="h-[50px] flex-grow flex flex-row p-[10px] gap-[10px] border-[0.3px] rounded-[5px] border-bg_yellow  hover:border-main_blue ">
              <img
                src={windows}
                alt="windows icon"
                className="w-[25px] h-[27.27px] "
              />
              <p className="text-[20px] leading-[30px] font-normal ">
                <span className="text-main_blue">site web : </span>
                {"//https:lmcs.esi.dz"}
              </p>
            </div>

            <div className="h-[45px] flex-grow flex flex-row items-center justify-center gap-2">
              {instaIconHovered ? (
                <img
                  src={instagram}
                  alt="instagram logo"
                  className="w-[30px] h-[30px]"
                  onMouseEnter={handleinstaIconHovered}
                  onMouseLeave={handleinstaIconHovered}
                />
              ) : (
                <img
                  src={instagramBlack}
                  alt="instagram logo"
                  className="w-[25px] h-[25px]"
                  onMouseEnter={handleinstaIconHovered}
                  onMouseLeave={handleinstaIconHovered}
                />
              )}
              {linkedinIconHovered ? (
                <img
                  src={linkedin}
                  alt="linkedin logo"
                  className="w-[30px] h-[30px] "
                  onMouseEnter={handlelinkedinIconHovered}
                  onMouseLeave={handlelinkedinIconHovered}
                />
              ) : (
                <img
                  src={linkedinBlack}
                  alt="linkedin logo"
                  className="w-[25px] h-[25px] "
                  onMouseEnter={handlelinkedinIconHovered}
                  onMouseLeave={handlelinkedinIconHovered}
                />
              )}
              {xIconHovered ? (
                <img
                  src={x}
                  alt="x logo"
                  className="w-[30px] h-[30px]"
                  onMouseEnter={handlexIconHovered}
                  onMouseLeave={handlexIconHovered}
                />
              ) : (
                <img
                  src={xBlack}
                  alt="x logo"
                  className="w-[25px] h-[25px]"
                  onMouseEnter={handlexIconHovered}
                  onMouseLeave={handlexIconHovered}
                />
              )}
            </div>
          </div>
        </div>
        <div className={`${windowWidth < 846 ? "hidden" : ""} `}>
          <img
            src={location}
            alt="Map LMCS"
            className={`${widthTwo()} h-[270px] rounded-[5px] shadow-[0_4px_12px_0_rgba(0, 0, 0, 0.25)] hover:scale-[1.01] hover:duration-0`}
          />
        </div>
      </div>
      <div
        className={` flex w-full h-[46px] text-nowrap leading-[30px] ${widthThree()} font-[275] text-bg_yellow bg-dark_blue items-center justify-center`}
      >
        <p>
          laboratoire de méthodes de conception des systeme
          <span className="text-main_blue"> copyright2024</span>
        </p>
      </div>
    </>
  );
}
