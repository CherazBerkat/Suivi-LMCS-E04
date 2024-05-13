/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchSideBar from "../../components/Search-side-bar/SearchSideBar"; // Import du composant SearchSideBar
import SearchNavBar from "../../components/nav-bars/SearchNavBar"; // Import du composant SearchNavBar
import contact from "../../assets/icons/contact.svg"; // Import de l'icône contact
import mail from "../../assets/icons/mail.svg"; // Import de l'icône mail
import website from "../../assets/icons/website.svg"; // Import de l'icône website
import Publication from "./publication"; // Import du composant Publication
import Projet from "./projet"; // Import du composant Projet
import Encadrement from "./encadrement"; // Import du composant Encadrement
import About from "./about"; // Import du composant About
import axios from "axios"; // Import d'axios



const tabs = [
  { id: "À Propos", label: "À Propos" },
  { id: "Publication", label: "Publication" },
  { id: "Projet", label: "Projet" },
  { id: "Encadrement", label: "Encadrement" },
];

function AnimatedTabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative w-64 h-12 px-10 py-2.5 sm:w-28 md:w-36 lg:w-56 xl:w-64 justify-center items-center gap-2.5 inline-flex hover:bg-slate-300 hover:duration-300 text-base font-normal text-bg_black transition focus-visible:outline-2 ${
            activeTab === tab.id ? "bg-bg_yellow font-semibold" : ""
          }`}
          style={{
            borderBottom:
              activeTab === tab.id ? "3px solid #3D80B3" : "1px solid #DCDCDC",
            color: activeTab === tab.id ? "#3D80B3" : "",
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              className={`absolute inset-0 z-10 `}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default function MonProfileChercheur() {
  const [selectedTab, setSelectedTab] = useState("À Propos");
  const User_id = localStorage.getItem("user_id");
  const Matricule = localStorage.getItem("matricule");
  const [infouser, setinfouser] = useState({
    role: "",
    photo_url: "",
  });
  useEffect(() => {
    const fetchinfouser = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/profil/user_personal_info/",
          { User_id: User_id }
        );
        setinfouser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchinfouser();
  }, [User_id]);

  const [infochercheur, setinfochercheur] = useState({
    nom_complet: "",
    email: "",
    tel: "",
    dblp: "",
    ggl_scholar: "",
    site_personel: "",
    search_gate: "",
  });

  useEffect(() => {
    const fetchinfochercheur = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/profil/chercheur_personal_info/",
          { Matricule: Matricule }
        );
        setinfochercheur(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchinfochercheur();
  }, [Matricule]);

  const ResearchLinks = () => {
    let value;
    if (infochercheur.dblp) {
      value = (
        <a
          href={infochercheur.dblp}
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-main_blue hover:underline"
        >
          DBLP
        </a>
      );
    } else if (infochercheur.ggl_scholar) {
      value = (
        <a
          href={infochercheur.ggl_scholar}
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-main_blue hover:underline"
        >
          Google Scholar
        </a>
      );
    } else {
      value = (
        <a
          href={infochercheur.search_gate}
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-main_blue hover:underline"
        >
          Research Gate
        </a>
      );
    }

    return (
      <Info icon={website} label="Plateforme De Recherche: " value={value} />
    );
  };

  return (
    <div className="flex flex-row h-screen ">
      <div className="w-[14.58%] h-screen shadow-[0 0 25px rgba(0,0,0,0.25)] z-10 fixed top-0 min-w-[130px]">
        <SearchSideBar page={4} visiteur={false} />
      </div>
      <div className="flex-grow  ml-[max(130px,14.58%)] h-screen bg-bg_yellow justify-center   ">
        <SearchNavBar
          text="Profile"
          role="Chercheur"
          nom="Balla Amar"
          visiteur={false}
        />
        <div style={{ marginTop: "16px" }}>
          <div className="flex justify-center items-center">
            <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-[1057px] gap-16 md:px-8 md:py-2.5 rounded-lg bg-white shadow-md">
              <div className="flex items-center relative gap-1.5">
                
              <img
                    className="rounded-full"
                    src={infouser.photo_url}
                    alt="Chercheur"
                    style={{
                      width: "14vw",
                      height: "14vw",
                      maxWidth: "120px",
                      maxHeight: "120px",
                    }}
                  />

                <div className="flex flex-col justify-center items-start relative space-y-[-8px]">
                  <p className="text-[30px] font-semibold uppercase text-bg_black">
                    {infochercheur.nom_complet}
                  </p>
                  <p className="text-[18px] font-light text-center text-bg_black">
                    {infouser.role}
                  </p>
                </div>
              </div>

              <div className="hidden md:block w-0.5 h-[200px] bg-[#dcdcdc]" />

              <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 space-y-[-3px]">
                <Info
                  icon={contact}
                  label="Tél / Fax :"
                  value={infochercheur.tel}
                />
                <Info
                  icon={mail}
                  label="E-mail :"
                  value={infochercheur.email}
                />
                <Info
                  icon={website}
                  value={
                    <span className="flex items-center">
                      <span className="mr-1 text-[20px] text-left text-main_blue">
                        Site web :{" "}
                      </span>
                      <a
                        href={infochercheur.site_personel}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-main_blue hover:underline truncate max-w-[200px] overflow-hidden whitespace-nowrap"
                        title={infochercheur.site_personel}
                      >
                        {infochercheur.site_personel}
                      </a>
                    </span>
                  }
                />
                <ResearchLinks />
              </div>
            </div>
          </div>
        </div>

        <div className="  flex-grow bg-bg_yellow justify-center grid gap-[16px]">
          <div className="  h-35 bg-bg_yellow "></div>
          <div className="flex flex-col gap-4  ">
            <nav className=" window ">
              <ul className=" tabs  ">
                <AnimatedTabs
                  tabs={tabs}
                  activeTab={selectedTab}
                  setActiveTab={setSelectedTab}
                />
              </ul>
            </nav>
            <div className="flex flex-col w-full">
              <div className="flex  justify-items-center">
                <div className=" flex-grow justify-items-center">
                  {selectedTab === "À Propos" && (
                    <>
                      <About Matricule={Matricule} />
                    </>
                  )}
                  {selectedTab === "Publication" && (
                    <>
                      <Publication Matricule={Matricule} profile={true} />
                    </>
                  )}
                  {selectedTab === "Projet" && (
                    <>
                      <Projet Matricule={Matricule} />
                    </>
                  )}
                  {selectedTab === "Encadrement" && (
                    <>
                      <Encadrement Matricule={Matricule} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Info = ({ icon, label, value }) => (
  <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-2.5 py-[5px]">
    <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative">
      <img src={icon} alt={label} />
    </div>
    <p className="flex-grow-0 flex-shrink-0 text-[20px] text-left">
      <span className="flex-grow-0 flex-shrink-0 text-[20px] text-left text-main_blue">
        {label}
      </span>
      <span className="flex-grow-0 flex-shrink-0 text-[20px] text-left text-bg_black">
        {value}
      </span>
    </p>
  </div>
);
