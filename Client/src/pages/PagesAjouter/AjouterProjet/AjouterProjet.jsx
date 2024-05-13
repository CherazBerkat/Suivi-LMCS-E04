import SearchSideBar from "../../../components/Search-side-bar/SearchSideBar"; // Importation du composant SearchSideBar
import SearchNavBar from "../../../components/nav-bars/SearchNavBar"; // Importation du composant SearchNavBar
import Content from "./Content"; // Importation du composant Content
import arrowSmallLeft from "../../../assets/icons/arrowSmallLeft.svg"; // Importation de l'icône flèche gauche

// Composant AjouterProjet utilisé pour afficher la page d'ajout d'un projet
export default function AjouterProjet() {
  const role = localStorage.getItem("role"); // Récupération du rôle de l'utilisateur

  return (
    <>
      <div className="flex flex-row bg-bg_yellow bg-opacity-60  ">
        {/* Barre latérale de recherche */}
        <div className="w-[14.58%] h-screen shadow-[0_0_25px_rgba(0,0,0,0.25)] z-10 fixed top-0 min-w-[130px] ">
          <SearchSideBar page={3} visiteur={false} /> {/* Affichage de la barre latérale de recherche */}
        </div>

        <div className="flex-grow ml-[max(130px,14.58%)]  h-screen">
          {/* Barre de navigation supérieure */}
          <SearchNavBar
            text="Ajouter Un Projet" // Texte affiché dans la barre de navigation
            icon={arrowSmallLeft} // Icône affichée dans la barre de navigation
            href={role == "directeur" ? "/maj/status" : "/maj/Chercheur"} // URL de redirection en fonction du rôle de l'utilisateur
            visiteur={false} // Paramètre indiquant si l'utilisateur est un visiteur ou non
          />

          <Content /> {/* Affichage du contenu de la page */}
        </div>
      </div>
    </>
  );
}
