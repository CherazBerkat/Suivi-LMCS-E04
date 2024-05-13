/* eslint-disable react/prop-types */
import { useState } from "react";
import chevronDown from "../../assets/icons/chevronDown.svg";
import user from "../../assets/icons/user.svg";
import logout from "../../assets/icons/logout.svg";
import MAJNavBar from "./MAJNavBar";
import ProfilePic from "../profile-pic/ProfilePic";
import TitleIcon from "../titles/TitleIcon";
function NavCard({ src, role, nom, visiteur }) {
  const [content, setContent] = useState(
    !visiteur ? (
      <>
        <div className={!src && "bg-bg_yellow rounded-full w-9 h-9 relative"}>
          {src ? (
            <ProfilePic src={src} width="w-9" />
          ) : (
            <img
              src={user}
              className="w-[20px] h-[21px] absolute top-0 left-0 right-0 bottom-0 m-auto"
            />
          )}
        </div>
        <div className="leading-[22px] flex flex-col justify-start uppercase">
          <h3 className="text-[15.5px] font-medium">{nom}</h3>
          <h4 className="text-[12px] font-light text-grey">{role}</h4>
        </div>
        <img src={chevronDown} className="w-[25px] h-[27.27px]" />
      </>
    ) : (
      <button className="w-[154px] h-12 text-[15px] leading-22.5px font-semibold border border-pure_black rounded-md shadow-[0_0_5px_rgba(0,0,0,0.25)] active: duration-500 active:scale-[0.97] hover:scale-[1.02] hover:duration-300">
        <a href="">Connexion</a>
      </button>
    )
  );

  function HoverHandler() {
    setContent(
      <button className="py-2.5 px-[20.435px] flex flex-row items-center gap-2.5  active: duration-500 active:scale-[0.97]">
        <img src={logout} className="w-[21px] h-[22.91px]" />
        <h3 className="text-base font-normal  text-error leading-6">
          Déconnexion
        </h3>
      </button>
    );
  }

  function LeaveHandler() {
    setContent(
      <>
        <div className={!src && "bg-bg_yellow rounded-full w-9 h-9 relative"}>
          {src ? (
            <ProfilePic src={src} width="w-9" />
          ) : (
            <img
              src={user}
              className="w-[20px] h-[21px] absolute top-0 left-0 right-0 bottom-0 m-auto"
            />
          )}
        </div>
        <div className="leading-[22px] flex flex-col justify-start uppercase">
          <h3 className="text-[15.5px] font-medium uppercase">{nom}</h3>
          <h4 className="text-[12px] font-light text-grey">{role}</h4>
        </div>
        <img src={chevronDown} className="w-[25px] h-[27.27px]" />
      </>
    );
  }

  function Clickhandler() {}

  return !visiteur ? (
    <div
      className="flex flex-row items-center gap-2.5 shadow-[0_0_5px_rgba(0,0,0,0.25)] p-[5px]"
      onMouseEnter={HoverHandler}
      onMouseLeave={LeaveHandler}
      onClick={Clickhandler}
    >
      {content}
    </div>
  ) : (
    <>{content}</>
  );
}

export default function SearchNavBar(props) {
  const tab = [
    <TitleIcon
      key="1"
      icon={props.icon}
      text={props.text}
      upper={false}
      size="text-[25px]"
      line="leading-[37.5px]"
      iconWidth="w-10"
      iconHeight="h-[43.6px]"
    />,
    <div key="2" className="flex flex-row gap-2.5 items-center">
      <NavCard nom={props.nom} role={props.role} visiteur={props.visiteur} />
    </div>,
  ];

  return <MAJNavBar content={tab} />;
}
