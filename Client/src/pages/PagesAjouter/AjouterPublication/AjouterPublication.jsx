// Composant AjouterPublication utilisé pour ajouter une nouvelle publication

import SearchSideBar from "../../../components/Search-side-bar/SearchSideBar"; // Import du composant SearchSideBar
import SearchNavBar from "../../../components/nav-bars/SearchNavBar"; // Import du composant SearchNavBar
import Content from "./Content"; // Import du composant Content
import arrowSmallLeft from "../../../assets/icons/arrowSmallLeft.svg"; // Import de l'icône

export default function AjouterPublication() {
  const role = localStorage.getItem("role"); // Récupération du rôle depuis le stockage local
  return (
    <>
      <div className="flex flex-row bg-bg_yellow bg-opacity-60">
        <div className="w-[14.58%] h-screen shadow-[0_0_25px_rgba(0,0,0,0.25)] z-10 fixed top-0 min-w-[130px]">
          <SearchSideBar page={3} visiteur={false} /> {/* Affichage de la barre de recherche latérale */}
        </div>

        <div className="flex-grow ml-[max(130px,14.58%)] h-screen">
          <SearchNavBar
            text="Ajouter Une Publication" // Texte du composant SearchNavBar
            visiteur={false} // Le visiteur n'est pas un visiteur
            icon={arrowSmallLeft} // Icône de retour
            href={role == "directeur" ? "/maj/status" : "/maj/Chercheur"} // Lien de retour selon le rôle
          />

          <Content /> {/* Affichage du contenu */}
        </div>
      </div>
    </>
  );
}
