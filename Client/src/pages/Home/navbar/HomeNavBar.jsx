/* eslint-disable react/jsx-key */
import NavBar1 from "../../../components/nav-bars/NavBar1";
import LOGOBlack from "../../../assets/images/LOGOBlack.svg";
import { useState, useEffect, useRef } from "react";
import "./HomeNavBar.css";
import { FaBars } from "react-icons/fa";

const MenuIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <FaBars
        size={24}
        className="cursor-pointer clickable"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute right-0 top-8 w-48 z-10 pl-4 bg-pure_white/50 backdrop-blur rounded shadow-[0_0_5px_rgba(0,0,0,0.25)]">
          <a className="menuP" href="#home">
            Home
          </a>
          <a className="menuP" href="#about1">
            À propos de nous
          </a>
          <a className="menuP" href="#public">
            Publications
          </a>
          <a className="menuP" href="#equipes">
            Notre équipe
          </a>
          <a className="menuP" href="#even">
            Événements
          </a>
          <a className="menuP" href="#foot">
            Contacts
          </a>
        </div>
      )}
    </div>
  );
};

export default function HomeNavBar() {
  const [tab, setTab] = useState(
    <div className="w-[1010px]">
      <ul className="flex flex-row items-center justify-between">
        <li>
          <img
            src={LOGOBlack}
            alt="LMCS logo"
            className="w-[112px] h-[75px] pb-[25px]"
          />
        </li>
        <li>
          <a className="nava" href="#home">
            Home
          </a>
        </li>
        <li>
          <a className="nava" href="#about1">
            À propos de nous
          </a>
        </li>
        <li>
          <a className="nava" href="#public">
            Publications
          </a>
        </li>
        <li>
          <a className="nava" href="#equipes">
            Notre équipe
          </a>
        </li>
        <li>
          <a className="nava" href="#even">
            Événements
          </a>
        </li>
        <li>
          <a className="nava" href="#foot">
            Contacts
          </a>
        </li>
      </ul>
    </div>
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 715) {
        setTab(
          <div className="w-[100%]">
            <ul className="flex flex-row items-center justify-between">
              <li>
                <img
                  src={LOGOBlack}
                  alt="LMCS logo"
                  className="w-[112px] h-[75px] pb-[25px]"
                />
              </li>
              <li>
                <MenuIcon />
              </li>
            </ul>
          </div>
        );
      } else {
        setTab(
          <div className="w-[1010px]">
            <ul className="flex flex-row items-center justify-between text-nowrap">
              <li>
                <img
                  src={LOGOBlack}
                  alt="LMCS logo"
                  className="w-[112px] h-[75px] pb-[25px]"
                />
              </li>
              <li>
                <a className="nava" href="#home">
                  Home
                </a>
              </li>
              <li>
                <a className="nava" href="#about1">
                  À propos de nous
                </a>
              </li>
              <li>
                <a className="nava" href="#public">
                  Publications
                </a>
              </li>
              <li>
                <a className="nava" href="#equipes">
                  Notre équipe
                </a>
              </li>
              <li>
                <a className="nava" href="#even">
                  Événements
                </a>
              </li>
              <li>
                <a className="nava" href="#foot">
                  Contacts
                </a>
              </li>
            </ul>
          </div>
        );
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <NavBar1 content={tab} />;
}
