/* eslint-disable react/prop-types */
//the click handler yet to be done ==> takes the user to connexion page or disconnect the user

import { useState, useEffect } from "react";
import NavBar1 from "./NavBar1";
import TitleIcon from "../titles/TitleIcon";
import chevronDown from "../../assets/icons/chevronDown.svg";
import user from "../../assets/icons/user.svg";
import logout from "../../assets/icons/logout.svg";
import ProfilePic from "../profile-pic/ProfilePic";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NavCard({ nom, role, src, visiteur }) {
  const navigate = useNavigate();
  const handeldeconnect = () => {
    localStorage.clear();
    localStorage.setItem("role", "visiteur");
    navigate("/");
  };

  const [content, setContent] = useState(
    !visiteur ? (
      <>
        <div
          className={!src ? "bg-bg_yellow rounded-full w-9 h-9 relative" : ""}
        >
          {src ? (
            <ProfilePic src={src} width="w-9" height="h-9" />
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
        <a href="/login">Connexion</a>
      </button>
    )
  );

  function HoverHandler() {
    setContent(
      <button className="py-2.5 px-[20.435px] flex flex-row items-center gap-2.5  active: duration-500 active:scale-[0.97]">
        <img src={logout} className="w-[21px] h-[22.91px]" />
        <a
          href="/"
          onClick={handeldeconnect}
          className="text-base font-normal  text-error leading-6"
        >
          Déconnexion
        </a>
      </button>
    );
  }

  function LeaveHandler() {
    setContent(
      <>
        <div
          className={!src ? "bg-bg_yellow rounded-full w-9 h-9 relative" : ""}
        >
          {src ? (
            <ProfilePic src={src} width="w-9" height="h-9" />
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

  return !visiteur ? (
    <div
      onClick={handeldeconnect}
      className="flex flex-row items-center gap-2.5 shadow-[0_0_5px_rgba(0,0,0,0.25)] p-[5px]"
      onMouseEnter={HoverHandler}
      onMouseLeave={LeaveHandler}
    >
      {content}
    </div>
  ) : (
    <>{content}</>
  );
}

export default function SearchNavBar(props) {
  const role = localStorage.getItem("role");
  const user_id = localStorage.getItem("user_id");
  const [nom, setNom] = useState("");
  const [src, setSrc] = useState("");
  useEffect(() => {
    if (!props.visiteur) {
      const fetchdata = async () => {
        const response2 = await axios.post(
          "http://127.0.0.1:8000/Get_user_by_id/",
          {
            user_id: user_id,
          }
        );
        setNom(response2.data[0].nom_complet);
        setSrc(response2.data[0].photo_url);
      };
      fetchdata();
    }
  }, [user_id, nom, src, props.visiteur]);
  const tab = [
    <TitleIcon
      key="1"
      icon={props.icon}
      text={props.text}
      href={props.href}
      upper={false}
      size="text-[25px]"
      line="leading-[37.5px]"
      iconWidth="w-10"
      iconHeight="h-[43.6px]"
    />,
    <div key="2" className="flex flex-row gap-2.5 items-center">
      <NavCard nom={nom} role={role} src={src} visiteur={props.visiteur} />
    </div>,
  ];

  return <NavBar1 content={tab} />;
}
