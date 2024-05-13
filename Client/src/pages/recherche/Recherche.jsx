/* eslint-disable react/prop-types */
import SearchSideBar from "../../components/Search-side-bar/SearchSideBar";
import SearchNavBar from "../../components/nav-bars/SearchNavBar";
import Content from "./Content";
import React from "react";
import axios from "axios";

// Composant de recherche avec barre latérale et barre de navigation
export default function Recherche({ visiteur }) {
  const [list_chercheur, setlist_chercheur] = React.useState([]);
  
  // Effet pour récupérer les données des chercheurs
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/recherche/Search/ "
        );
        setlist_chercheur(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Définition des listes de valeurs pour les filtres de recherche
  const list_qualite = ["Chercheur", "Doctorant", "Chercheur-enseignant"];
  const list_diplome = ["Doctorat", "Master", "Licence"];
  const list_equipe = [
    " EIAH ",
    " Codesign ",
    " managment",
    " optimisation",
    " sures",
    "TII",
  ];
  const list_statut = ["Actif", "Inactif"];
  const list_grad_e = ["Professeur", "MCA", "MCB", "MAA", "MAB"];
  const list_grad_r = ["Grade 1", "Grade 2", "Grade 3"];
  const periodicite = [
    "Annuelle",
    "Biennale",
    "Mensuelle",
    "Trimestrielle",
    "Semestrielle",
  ];

  const [obj, setObj] = React.useState({});
  const ArrayChercheurs = [];
  const objPub = [];
  const objConfJournal = [];
  const objDate = [];

  return (
    <div className="flex flex-row h-screen ">
      {/* Barre latérale de recherche */}
      <div className="w-[14.58%] h-screen shadow-[0 0 25px rgba(0,0,0,0.25)] z-10 fixed top-0 min-w-[130px]">
        <SearchSideBar page={1} visiteur={visiteur} />
      </div>
      {/* Contenu principal de la recherche */}
      <div className="flex-grow  ml-[max(130px,14.58%)] h-screen bg-bg_yellow justify-center  ">
        <SearchNavBar text="Recherche" visiteur={visiteur} />
        <div className="h-screen w-full relative">
          <Content
            list_chercheur={list_chercheur}
            list_qualite={list_qualite}
            list_diplome={list_diplome}
            list_equipe={list_equipe}
            list_statut={list_statut}
            list_grad_e={list_grad_e}
            list_grad_r={list_grad_r}
            periodicite={periodicite}
            obj={obj}
            setObj={setObj}
            ArrayChercheurs={ArrayChercheurs}
            objPub={objPub}
            objConfJournal={objConfJournal}
            objDate={objDate}
          />
        </div>
      </div>
    </div>
  );
}
