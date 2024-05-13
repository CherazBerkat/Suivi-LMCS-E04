/* eslint-disable react/prop-types */

import SearchSideBar from "../../components/Search-side-bar/SearchSideBar";
import SearchNavBar from "../../components/nav-bars/SearchNavBar";
import { useLocation } from "react-router-dom";
import Content from "./Content";
import React from "react";
import axios from "axios";

export default function Publication() {
  const [nbpage, setNbpage] = React.useState("");
  const [annee_creation, setAnnee_creation] = React.useState("");
  const [nbvol, setnbvol] = React.useState("");
  const [chercheurs, setChercheurs] = React.useState([]);
  const [url, setUrl] = React.useState("");

  // Récupération des données de l'emplacement actuel
  const location = useLocation();
  const { titre_publication, date_publication, ConfJournal_id, profile } =
    location.state;

  React.useEffect(() => {
    // Fonction pour récupérer les données de la publication depuis le serveur
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/profil/view_publication/",
          {
            titre_publication: titre_publication,
            ConfJournal_id: ConfJournal_id,
            date_publication: date_publication,
          }
        );
        // Mise à jour des états avec les données reçues
        setNbpage(response.data.nombre_pages);
        setAnnee_creation(response.data.date_de_publication);
        setnbvol(response.data.nombre_volume);
        setChercheurs(response.data.chercheurs);
        setUrl(response.data.url);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [ConfJournal_id, date_publication, titre_publication]);

  // Récupération du rôle de l'utilisateur depuis le stockage local
  const role = localStorage.getItem("role");

  return (
    <>
      <div className="flex flex-row bg-bg_gris bg-opacity-60">
        <div className="w-[14.58%] h-screen shadow-[0_0_25px_rgba(0,0,0,0.25)] z-10 fixed top-0 min-w-[130px]">
          {/* Affichage de la barre latérale de recherche */}
          <SearchSideBar
            page={profile == true ? 4 : 1}
            visiteur={role == "visiteur" ? true : false}
          />
        </div>

        <div className="flex-grow ml-[max(130px,14.58%)] bg-bg_yellow h-screen">
          {/* Affichage de la barre de navigation de recherche */}
          <SearchNavBar
            text="Publication"
            visiteur={role == "visiteur" ? true : false}
          />

          {/* Affichage du contenu de la publication */}
          <Content
            titre={titre_publication}
            redacteurs={chercheurs}
            annee_creaction={annee_creation}
            nbvol={nbvol}
            nbpage={nbpage}
            url={url}
            profile={profile}
          />
        </div>
      </div>
    </>
  );
}
