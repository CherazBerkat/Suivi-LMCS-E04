/* eslint-disable react/prop-types */
// Formulaire de statistiques avec barre latérale de recherche et barre de navigation
import SearchSideBar from "../../../components/Search-side-bar/SearchSideBar";
import SearchNavBar from "../../../components/nav-bars/SearchNavBar";
import CriteresForm from "./CriteresForm";
import { useState, useEffect } from "react";

export default function StatistiqueForm({ visiteur }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex flex-row h-full">
      {/* Barre latérale de recherche */}
      <div className="w-[14.58%] h-screen shadow-[0_0_25px_rgba(0,0,0,0.25)] z-10 fixed top-0 min-w-[130px]">
        <SearchSideBar page={2} visiteur={visiteur} />
      </div>
      {/* Contenu principal */}
      <div className="flex-grow ml-[max(130px,14.58%)] bg-bg_yellow min-h-screen overflow-hidden">
        {/* Barre de navigation */}
        <SearchNavBar text="Statistiques" visiteur={visiteur} />
        <div className="flex items-center h-full pb-[70px]">
          {/* Formulaire de critères */}
          <div className="text-[25px] leading-[37.5px] flex flex-col gap-8 ">
            <p
              className={`text-[25px] leading-[37.5px] ${windowWidth > 862 ? "pl-56" : windowWidth > 706 ? "pl-40" : windowWidth > 568 ? "pl-24" : windowWidth > 518 ? "pl-12" : "pl-6"}`}
            >
              Veuillez Choisir un critère:
            </p>
            <CriteresForm visiteur={visiteur} />
          </div>
        </div>
      </div>
    </div>
  );
}
