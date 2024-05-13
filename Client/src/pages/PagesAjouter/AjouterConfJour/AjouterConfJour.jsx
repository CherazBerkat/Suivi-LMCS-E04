import SearchSideBar from "../../../components/Search-side-bar/SearchSideBar"; // Import du composant SearchSideBar
import SearchNavBar from "../../../components/nav-bars/SearchNavBar"; // Import du composant SearchNavBar
import Content from "./Content"; // Import du composant Content
import arrowSmallLeft from "../../../assets/icons/arrowSmallLeft.svg"; // Import de l'icône arrowSmallLeft

export default function AjouterEncadrement() {
  const role = localStorage.getItem("role"); // Récupération du rôle depuis le stockage local
  return (
    <>
      {/* Conteneur principal */}
      <div className="flex flex-row bg-bg_yellow bg-opacity-60  ">
        {/* Barre latérale de recherche */}
        <div className="w-[14.58%] h-screen shadow-[0_0_25px_rgba(0,0,0,0.25)] z-10 fixed top-0 min-w-[130px] ">
          <SearchSideBar page={3} visiteur={false} /> {/* Utilisation du composant SearchSideBar */}
        </div>
        {/* Contenu principal */}
        <div className="flex-grow ml-[max(130px,14.58%)]  h-screen">
          {/* Barre de navigation de recherche */}
          <SearchNavBar
            text="Ajouter Un Conférence/Journal"
            visiteur={false}
            icon={arrowSmallLeft}
            href={
              role == "assistant"
                ? "/MiseAJour/Assisstant"
                : role == "directeur"
                  ? "/maj/status"
                  : "/maj/Chercheur"
            }
          /> {/* Utilisation du composant SearchNavBar */}
          {/* Contenu spécifique */}
          <Content />
        </div>
      </div>
    </>
  );
}
