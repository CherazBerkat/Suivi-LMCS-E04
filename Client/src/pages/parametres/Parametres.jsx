/* eslint-disable react/prop-types */ // Désactivation des avertissements liés aux types des props

import SearchSideBar from "../../components/Search-side-bar/SearchSideBar"; // Import du composant SearchSideBar
import SearchNavBar from "../../components/nav-bars/SearchNavBar"; // Import du composant SearchNavBar
import Content from "./Content"; // Import du composant Content

// Composant Parametres
export default function Parametres({ isAssitant }) {
  // Rendu JSX du composant
  return (
    <>
      <div className="flex flex-row bg-bg_gris bg-opacity-60  ">
        {/* Barre de recherche latérale */}
        <div className="w-[14.58%] h-screen shadow-[0_0_25px_rgba(0,0,0,0.25)] z-10 fixed top-0 min-w-[130px] ">
          <SearchSideBar page={5} visiteur={false} />
        </div>

        {/* Contenu principal */}
        <div className="flex-grow ml-[max(130px,14.58%)]  h-screen">
          {/* Barre de navigation de recherche */}
          <SearchNavBar text="Paramètres" visiteur={false} />

          {/* Contenu spécifique des paramètres */}
          <Content isAssitant={isAssitant} />
        </div>
      </div>
    </>
  );
}
