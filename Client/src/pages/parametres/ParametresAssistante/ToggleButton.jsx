/* eslint-disable react/prop-types */ // Désactivation des avertissements liés aux types des props

import "../Pametres.css"; // Importation des styles CSS pour le composant

// Composant ToggleButton
export default function ToggleButton({
  text,
  nb,
  setPage1,
  setPage2,
  pageSelected,
}) {
  // Fonction pour gérer le clic sur le bouton
  function handleClick() {
    if (nb === 1) {
      setPage1(true); // Afficher la première page
      setPage2(false); // Masquer la deuxième page
    }
    if (nb === 2) {
      setPage1(false); // Masquer la première page
      setPage2(true); // Afficher la deuxième page
    }
  }

  return (
    <button
      type="button"
      id="Toggle-button"
      className={` ${pageSelected ? "border-b-main_blue border-b-[3px]" : "border-none"} bg-bg_yellow mt-5 border-[1px] h-[3rem] w-full px-[8px] py-1 text-[20px] font-medium shadow-[0 4px 4px rgba(0, 0, 0, 0.25)] hover:bg-hover_blue hover:scale-102 hover:duration-300  focus:shadow-none active:scale-95 active:duration-300`}
      onClick={handleClick} // Appel de la fonction handleClick lors du clic sur le bouton
    >
      {text} {/* Affichage du texte du bouton */}
    </button>
  );
}
