/* eslint-disable react/prop-types */ // Désactivation des avertissements liés aux types des props

import ToggleButton from "./ToggleButton"; // Import du composant ToggleButton
import React from "react"; // Import de React
import Pages1 from "./Pages1"; // Import du composant Pages1
import Pages2 from "./Pages2"; // Import du composant Pages2
import Pages3 from "./Pages3"; // Import du composant Pages3
import "../Pametres.css"; // Import du fichier de styles

// Composant TogglePages1
export default function TogglePages1({ infoUser1, infoUser3 ,username ,utilisateur_id , Matricule}) {

  // État pour gérer quelle page est sélectionnée
  const [page1, setPage1] = React.useState(true);
  const [page2, setPage2] = React.useState(false);
  const [page3, setPage3] = React.useState(false);

  // Rendu JSX
  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <div
        id="page-toggle-buttons"
        className="w-[1060px] h-full bg-bg_yellow mt-[64px] flex flex-row"
      >
        {/* Boutons de bascule entre les pages */}
        <ToggleButton
          text="Informations"
          nb={1}
          setPage1={setPage1}
          setPage2={setPage2}
          setPage3={setPage3}
          pageSelected={page1}
        />
        <ToggleButton
          text="Mot De Passe"
          nb={2}
          setPage1={setPage1}
          setPage2={setPage2}
          setPage3={setPage3}
          pageSelected={page2}
        />
        <ToggleButton
          text="URL"
          nb={3}
          setPage1={setPage1}
          setPage2={setPage2}
          setPage3={setPage3}
          pageSelected={page3}
        />
      </div>
      <div>
        {/* Affichage des différentes pages en fonction de celle sélectionnée */}
        {page1 && <Pages1 infoUser1={infoUser1}  username={username} utilisateur_id={utilisateur_id} Matricule={Matricule}/>}
        {page2 && <Pages2 utilisateur_id={utilisateur_id} />}
        {page3 && <Pages3 infoUser3={infoUser3} utilisateur_id={utilisateur_id} Matricule={Matricule}/>}
      </div>
    </div>
  );
}
