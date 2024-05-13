import React, { useState } from "react"; // Import de React et de useState
import SearchSideBar from "../../components/Search-side-bar/SearchSideBar"; // Import du composant de la barre latérale de recherche
import SearchNavBar from "../../components/nav-bars/SearchNavBar"; // Import du composant de la barre de navigation de recherche
import projetBig from "../../assets/icons/projetBig.svg"; // Import de l'icône de projet
import publicationBig from "../../assets/icons/publicationBig.svg"; // Import de l'icône de publication
import encadrement from "../../assets/icons/encadrement.svg"; // Import de l'icône d'encadrement
import { useNavigate } from "react-router-dom"; // Import de la fonction useNavigate pour la navigation
import axios from "axios"; // Import de axios pour les requêtes HTTP

export default function MiseAJour() {
  const visiteur = false; // Initialisation de la variable visiteur
  const user_id = localStorage.getItem("user_id"); // Récupération de l'identifiant de l'utilisateur depuis le stockage local
  console.log(user_id); // Affichage de l'identifiant de l'utilisateur dans la console
  const [role, setRole] = useState(""); // Initialisation de l'état pour le rôle
  const [nom, setNom] = useState(""); // Initialisation de l'état pour le nom
  const navigate = useNavigate(); // Initialisation de la fonction de navigation

  React.useEffect(() => {
    const fetchdata = async () => {
      const response2 = await axios.post(
        "http://127.0.0.1:8000/Get_user_by_id/",
        {
          user_id: localStorage.getItem("user_id"),
        }
      );

      setNom(response2.data[0].nom_complet); // Mise à jour du nom de l'utilisateur
      setRole(localStorage.getItem("role")); // Mise à jour du rôle de l'utilisateur
    };
    fetchdata();
  }, []);

  return (
    <div className="flex flex-row h-full">
      <div className="w-[14.58%] h-screen shadow-[0 0 25px rgba(0,0,0,0.25)] z-10 fixed top-0 min-w-[130px]">
        <SearchSideBar page={3} visiteur={visiteur} /> {/* Affichage de la barre latérale de recherche */}
      </div>
      <div className="flex-grow ml-[max(130px,14.58%)] bg-bg_yellow">
        <SearchNavBar
          text="Mise à jour"
          role={role}
          nom={nom}
          visiteur={visiteur}
        /> {/* Affichage de la barre de navigation de recherche */}
        <div className="w-full bg-bg_yellow">
          <div className="flex flex-col h-screen">
            <div className="w-full flex justify-center items-center flex-grow xl:gap-[65px] lg:gap-[45px] md:gap-[25px]">
              <div
                onClick={() => {
                  navigate("/MiseAJour/AjouterPublication"); // Redirection vers la page d'ajout de publication
                }}
                className="flex flex-col justify-start items-center  h-[220px] w-[220px] gap-2 p-4 rounded-xl bg-white focus:bg-bg_yellow hover:bg-slate-100 hover:scale-[1.02] hover:duration-300 active:scale-95 active:duration-300"
                style={{ boxShadow: "0px 0px 25px 0 rgba(0,0,0,0.125)" }}
              >
                <div className="flex justify-start items-center relative gap-2.5">
                  <img src={publicationBig} alt="Publication" /> {/* Affichage de l'icône de publication */}
                </div>
                <p className="w-[181px] text-[20px] font-semibold text-center text-[#1d1d1d]">
                  Ajouter Une Publication
                </p>
              </div>
              <div
                onClick={() => {
                  navigate("/MiseAJour/AjouterProjet"); // Redirection vers la page d'ajout de projet
                }}
                className="flex flex-col justify-start items-center h-[219.09px] w-[213px] relative gap-2 p-4 rounded-xl bg-white focus:bg-bg_yellow focus:shadow-none hover:bg-slate-100 hover:scale-[1.02] hover:duration-300 active:scale-95 active:duration-300"
                style={{ boxShadow: "0px 0px 25px 0 rgba(0,0,0,0.125)" }}
              >
                <div className="flex justify-start items-center relative gap-2.5 ">
                  <img src={encadrement} alt="Encadrement" /> {/* Affichage de l'icône d'encadrement */}
                </div>
                <p className="w-[181px] text-[20px] font-semibold text-center text-[#1d1d1d]">
                  Ajouter Un Projet
                </p>
              </div>
              <div
                onClick={() => {
                  navigate("/ajouter/encadrement"); // Redirection vers la page d'ajout d'encadrement
                }}
                className="flex flex-col justify-start items-center h-[219.09px] w-[213px] relative gap-2 p-4 rounded-xl bg-white focus:bg-bg_yellow focus:shadow-none hover:bg-slate-100 hover:scale-[1.02] hover:duration-300 active:scale-95 active:duration-300"
                style={{ boxShadow: "0px 0px 25px 0 rgba(0,0,0,0.125)" }}
              >
                <div className="flex justify-center items-center flex-grow relative gap-2.5">
                  <img src={projetBig} alt="Projet" /> {/* Affichage de l'icône de projet */}
                </div>
                <p className="w-[181px] text-[20px] font-semibold text-center text-[#1d1d1d]">
                  Ajouter Un Encadrement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
