import React, { useEffect, useState } from "react";
import SearchSideBar from "../../components/Search-side-bar/SearchSideBar"; // Import du composant de la barre latérale de recherche
import SearchNavBar from "../../components/MAJ_status/Searchnavbar"; // Import du composant de la barre de navigation de recherche
import "./style.css"; // Import des styles CSS spécifiques
import { convertNomComplet } from "./Nom_Prenom"; // Import de la fonction de conversion du nom complet
import axios from "axios"; // Import de la bibliothèque Axios pour les requêtes HTTP
import { useNavigate } from "react-router-dom"; // Import de la fonction useNavigate pour la navigation

const Status = () => {
  const navigate = useNavigate(); // Initialisation de la fonction de navigation
  const [profile, setprofile] = useState([]); // Initialisation de l'état pour stocker les profils
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/maj/getchercheurs/"
      ); // Requête GET pour récupérer les chercheurs depuis l'API
      setprofile(response.data); // Mise à jour de l'état avec les données récupérées
    };
    fetchdata(); // Appel de la fonction pour récupérer les données lors du montage du composant
  }, []);
  const [role, setRole] = useState(""); // Initialisation de l'état pour stocker le rôle
  const [nom, setNom] = useState(""); // Initialisation de l'état pour stocker le nom

  React.useEffect(() => {
    const fetchdata = async () => {
      const response2 = await axios.post(
        "http://127.0.0.1:8000/Get_user_by_id/",
        {
          user_id: localStorage.getItem("user_id"),
        }
      ); // Requête POST pour récupérer les données de l'utilisateur actuel depuis l'API
      setNom(response2.data[0].nom_complet); // Mise à jour de l'état avec le nom complet de l'utilisateur
      setRole(localStorage.getItem("role")); // Mise à jour de l'état avec le rôle stocké localement
    };
    fetchdata(); // Appel de la fonction pour récupérer les données lors du montage du composant
  }, []);

  const handelchange = async (e, index) => {
    const { value } = e.target; // Récupération de la valeur sélectionnée dans le menu déroulant
    const newprofile = [...profile]; // Création d'une copie de la liste des profils
    newprofile[index].statut = value; // Mise à jour du statut du profil sélectionné
    setprofile(newprofile); // Mise à jour de la liste des profils avec le nouveau statut
  };
  return (
    <div className="flex flex-row h-full bg-white">
      <div className="w-[14.58%] h-screen shadow-[0_0_25px_rgba(0,0,0,0.25)] z-10 fixed top-0 min-w-[130px] bg-white">
        <SearchSideBar page={3} /> {/* Affichage de la barre latérale de recherche */}
      </div>
      <div className="flex-grow ml-[max(130px,14.58%)] ">
        <SearchNavBar text="Mise à jour" role={role} nom={nom} /> {/* Affichage de la barre de navigation de recherche */}
        <div className=" flex  justify-end items-center gap-4 bg-white my-8  md:mx-8 text-[#3D80B3] text-md font-medium">
          <button
            className="btn hover:bg-hover_blue hover:text-bg_yellow"
            onClick={() => {
              navigate("/ajouter/chercheur"); // Redirection vers la page d'ajout de chercheur
            }}
          >
            Ajouter chercheur
          </button>
          <button
            className=" btn hover:bg-hover_blue hover:text-bg_yellow"
            onClick={() => {
              navigate("/ajouter/conf_jour"); // Redirection vers la page d'ajout de conférence/journal
            }}
          >
            Ajouter confJournal
          </button>
          <button
            className=" btn  hover:bg-hover_blue hover:text-bg_yellow"
            onClick={() => {
              navigate("/MiseAJour/AjouterPublication"); // Redirection vers la page d'ajout de publication
            }}
          >
            Ajouter publication
          </button>
          <button
            className=" btn hover:bg-hover_blue hover:text-bg_yellow"
            onClick={() => {
              navigate("/MiseAJour/AjouterProjet"); // Redirection vers la page d'ajout de projet
            }}
          >
            Ajouter projet
          </button>
          <button
            className=" btn hover:bg-hover_blue hover:text-bg_yellow"
            onClick={() => {
              navigate("/ajouter/encadrement"); // Redirection vers la page d'ajout d'encadrement
            }}
          >
            Ajouter Encadrement
          </button>
        </div>
        <div className=" flex flex-col box mx-8">
          <div className="border border-gray-200 ">
            <div className="grid grid-cols-4 md:gap-4 gap-1  py-6 px-8 md:ml-20 ml-2 text-sm font-medium">
              <div>Nom</div>
              <div>Prénom</div>
              <div>Email</div>
              <div className=" ml-4">Status</div>
            </div>
          </div>
          {profile.map((prof, index) => {
            const { prenom, nom } = convertNomComplet(prof.nom_complet); // Conversion du nom complet en prénom et nom
            return (
              <div key={index}>
                <div className={index % 2 == 0 ? " bg-white" : " bg-[#F3F7FC]"}>
                  <div className="grid grid-cols-4 md:gap-4 gap-1   md:ml-20 ml-2 py-6 px-8 md:text-sm text-xs">
                    <div className=" ">{nom}</div>
                    <div className="">{prenom}</div>
                    <div className="">{prof.email}</div>
                    <div>
                      <select
                        name=""
                        id=""
                        value={prof.statut}
                        onChange={(e) => handelchange(e, index)}
                        className={
                          prof.statut == "Actif"
                            ? " rounded-lg bg-[#158212] py-2 md:px-6 px-1 md:ml-4 ml-0 text-white"
                            : " rounded-lg py-2 md:px-6 px-1 md:ml-4 ml-0 bg-gray-200"
                        }
                      >
                        <option value="actif">Actif</option>
                        <option value="Inactif">Inactif</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Status;
