/* eslint-disable react/prop-types */ // Désactivation des avertissements liés aux types des props

import React from "react"; // Importation de React
import Pages1 from "./Pages1"; // Importation du composant Pages1
import Pages2 from "./Pages2"; // Importation du composant Pages2
import ToggleButton from "./ToggleButton"; // Importation du composant ToggleButton
import "../Pametres.css"; // Importation des styles CSS pour le composant

// Composant TogglePages2, la page paramètre de l'assistante
export default function TogglePages2({ infoUser1, utilisateur_id }) {
  // Déclaration des états pour gérer l'affichage des pages
  const [page1, setPage1] = React.useState(true); // Etat pour la page 1, initialisé à true (affichée)
  const [page2, setPage2] = React.useState(false); // Etat pour la page 2, initialisé à false (masquée)

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <div
        id="page-toggle-buttons"
        className="w-[1060px] h-full bg-bg_yellow mt-[64px] flex flex-row"
      >
        {/* Bouton pour afficher la page d'Informations */}
        <ToggleButton
          text="Informations"
          nb={1}
          setPage1={setPage1}
          setPage2={setPage2}
          pageSelected={page1}
        />
        {/* Bouton pour afficher la page de Mot de Passe */}
        <ToggleButton
          text="Mot De Passe"
          nb={2}
          setPage1={setPage1}
          setPage2={setPage2}
          pageSelected={page2}
        />
      </div>

      <div>
        {/* Affichage conditionnel de la page 1 */}
        {page1 && <Pages1 infoUser1={infoUser1} utilisateur_id={utilisateur_id} />}
        {/* Affichage conditionnel de la page 2 */}
        {page2 && <Pages2 utilisateur_id={utilisateur_id} />}
      </div>
    </div>
  );
}
