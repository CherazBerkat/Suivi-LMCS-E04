/* eslint-disable react/prop-types */ // Désactivation des avertissements liés aux types des props

import "../Pametres.css"; // Import du fichier de styles

// Composant ToggleButton
export default function ToggleButton({
  text,
  nb,
  setPage1,
  setPage2,
  setPage3,
  pageSelected,
}) {
  // Fonction pour gérer le clic sur le bouton
  function handleClick() {
    // Logique pour définir quelle page est sélectionnée en fonction de la valeur de nb
    if (nb === 1) {
      setPage1(true);
      setPage2(false);
      setPage3(false);
    }
    if (nb === 2) {
      setPage1(false);
      setPage2(true);
      setPage3(false);
    }
    if (nb === 3) {
      setPage1(false);
      setPage2(false);
      setPage3(true);
    }
  }

  // Rendu JSX du bouton
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
