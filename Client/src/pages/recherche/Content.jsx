/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Popup_chercheur from "./Popup_chercheur";
import Bouton1 from "./Bouton1";
import Popup_pub from "./Popup_pub";
import Popup_conf from "./Popup_conf";
import Popup_date from "./Popup_date";
import icon from "../../assets/icons/filters-1.svg";
import AnimatedTabs from "./AnimatedTabs";
import Chercheurs from "./Chercheurs";
import Publications from "./Publications";
import ConfJournal from "./CJTable";
import axios from "axios";
import "./Popup.css";
export default function Content({
  list_chercheur,
  list_qualite,
  list_diplome,
  list_equipe,
  list_statut,
  list_grad_e,
  list_grad_r,
  periodicite,
  obj,
  setObj,
  ArrayChercheurs,
  objPub,
  objConfJournal,
  objDate,
}) {
  const [isClicked1, setIsClicked1] = useState(false); // pour afficher le pop up (chercheur) ou le masquer
  const [isClicked2, setIsClicked2] = useState(false); // pour afficher le pop up (publication) ou le masquer
  const [isClicked3, setIsClicked3] = useState(false); // pour afficher le pop up (ConfJournal) ou le masquer
  const [isClicked4, setIsClicked4] = useState(false); // pour afficher le pop up (date) ou le masquer

  const [chercheurs, setChercheurs] = React.useState([]);
  const [publications, setPublications] = React.useState([]);
  const [confJournalData, setConfJournalData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/recherche/SearchAll/ "
        );
        setChercheurs(response.data.chercheurs);
        setPublications(response.data.publication);
        setConfJournalData(response.data.venue);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  console.log("from contentb ; ");
        console.log(chercheurs);

  const handleSend = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/recherche/Search/",
        obj
      );
      setChercheurs(response.data.chercheurs);
      setPublications(response.data.publication);
      console.log(response.data.publication);
      setConfJournalData(response.data.venue);
    } catch (err) {
      console.log(err);
    }
  };

  const tabs = [
    { id: "Chercheur", label: "Chercheur" },
    { id: "Publication", label: "Publication" },
    { id: "ConfJournal", label: "CNFJournal" },
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);

  function ApplyHandler() {
    obj = { ...obj, ArrayChercheurs, objPub, objConfJournal, objDate };

    // DATA PRETE AU BACKEND
    handleSend();
  }
  const supprFilters = async () => {
    // clean research all
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/recherche/SearchAll/ "
      );

      setChercheurs(response.data.chercheurs);
      setPublications(response.data.publication);
      setConfJournalData(response.data.venue);
      setObj({});
    } catch (err) {
      console.error(err);
    }
  };

  function clickHandler1() {
    setIsClicked1(!isClicked1);
  }
  function clickHandler2() {
    setIsClicked2(!isClicked2);
  }
  function clickHandler3() {
    setIsClicked3(!isClicked3);
  }
  function clickHandler4() {
    setIsClicked4(!isClicked4);
  }
  return (
    <div className="relative h-full">
      {isClicked1 && (
        <div className="h-screen w-full flex  justify-center items-center bg-bg_gris bg-opacity-60 absolute z-20">
          <Popup_chercheur
            clickHandler={clickHandler1}
            list_chercheur={list_chercheur}
            list_qualite={list_qualite}
            list_diplome={list_diplome}
            list_equipe={list_equipe}
            list_statut={list_statut}
            list_grad_e={list_grad_e}
            list_grad_r={list_grad_r}
            setIsClicked1={setIsClicked1}
            ArrayChercheurs={ArrayChercheurs}
          />
        </div>
      )}

      {isClicked2 && (
        <div className="h-full w-full flex  justify-center items-center bg-bg_gris bg-opacity-60 absolute z-20">
          <Popup_pub clickHandler={clickHandler2} objPub={objPub} />
        </div>
      )}
      {isClicked3 && (
        <div className="h-full w-full flex  justify-center items-center bg-bg_gris bg-opacity-60 absolute z-20">
          <Popup_conf
            clickHandler={clickHandler3}
            objConfJournal={objConfJournal}
            periodicite={periodicite}
          />
        </div>
      )}
      {isClicked4 && (
        <div className="h-full w-full flex  justify-center items-center bg-bg_gris bg-opacity-60 absolute z-20">
          <Popup_date clickHandler={clickHandler4} objDate={objDate} />
        </div>
      )}
      <div
        className=" flex flex-row justify-between items-center px-8  "
        id="Content-Boutons"
      >
        <div className="flex flex-row gap-5" id="Content-boutons-filtres">
          <Bouton1
            text="Chercheur"
            color="bg-bg_yellow"
            strockcolor="border-pure_black"
            margin="ml-[32px] my-[32px]"
            clickHandler={clickHandler1}
          />
          <Bouton1
            text="Publication"
            color="bg-bg_yellow"
            strockcolor="border-pure_black"
            margin="ml-[0px] my-[32px]"
            clickHandler={clickHandler2}
          />
          <Bouton1
            text="ConfJournal"
            color="bg-bg_yellow"
            strockcolor="border-pure_black"
            margin="ml-[0px] my-[32px]"
            clickHandler={clickHandler3}
          />
          <Bouton1
            text="Date"
            color="bg-bg_yellow"
            strockcolor="border-pure_black"
            margin="ml-[0px] my-[32px]"
            clickHandler={clickHandler4}
          />
        </div>
        <div
          className="flex flex-row gap-2 "
          id="Content-Boutons-traitement-filters"
        >
          <Bouton1
            text="Appliquer les filtres "
            color="bg-main_yellow"
            icon={icon}
            strockcolor="border-none"
            clickHandler={ApplyHandler}
          />
          <Bouton1
            text="Supprimer les filtres "
            icon={icon}
            strockcolor="border-steel_blue"
            clickHandler={supprFilters}
          />
        </div>
      </div>

      <div className="  flex-grow bg-bg_yellow justify-center grid gap-[16px]">
        <div className="flex flex-col gap-4  ">
          <nav className="window">
            <ul className="tabs">
              <AnimatedTabs
                tabs={tabs}
                activeTab={selectedTab}
                setActiveTab={setSelectedTab}
              />
            </ul>
          </nav>
          <div className="flex flex-col ">
            <div className="flex justify-center">
              <div className="flex-grow justify-center">
                {selectedTab === "Chercheur" && (
                  <Chercheurs chercheurs={chercheurs} />
                )}
                {selectedTab === "Publication" && (
                  <Publications publications={publications} />
                )}
                {selectedTab === "ConfJournal" && (
                  <ConfJournal confJournalData={confJournalData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
