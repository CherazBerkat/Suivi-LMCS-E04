import SearchSideBar from "../../components/Search-side-bar/SearchSideBar"; // Import du composant de la barre latérale de recherche
import SearchNavBar from "../../components/nav-bars/SearchNavBar"; // Import du composant de la barre de navigation de recherche
import projetBig from "../../assets/icons/projetBig.svg"; // Import de l'icône de projet
import encadrement from "../../assets/icons/encadrement.svg"; // Import de l'icône d'encadrement
import { useNavigate } from "react-router-dom"; // Import de la fonction useNavigate pour la navigation

export default function MiseAjour_assisstant() {
  const visiteur = false; // Initialisation de la variable visiteur
  const navigate = useNavigate(); // Initialisation de la fonction de navigation
  return (
    <div className="flex flex-row h-full">
      <div className="w-[14.58%] h-screen shadow-[0 0 25px rgba(0,0,0,0.25)] z-10 fixed top-0 min-w-[130px]">
        <SearchSideBar page={3} visiteur={visiteur} /> {/* Affichage de la barre latérale de recherche */}
      </div>
      <div className="flex-grow ml-[max(130px,14.58%)] bg-bg_yellow">
        <SearchNavBar text="Mise à jour" visiteur={visiteur} /> {/* Affichage de la barre de navigation de recherche */}
        <div className="w-full bg-bg_yellow">
          <div className="flex flex-col h-screen">
            <div className="w-full flex justify-center items-center flex-grow xl:gap-[65px] lg:gap-[45px] md:gap-[25px]">
              <div
                onClick={() => {
                  navigate("/ajouter/chercheur"); // Redirection vers la page d'ajout de chercheur
                }}
                className="flex flex-col justify-start items-center h-[219.09px] w-[213px] relative gap-2 p-4 rounded-xl bg-white focus:bg-bg_yellow focus:shadow-none hover:bg-slate-100 hover:scale-[1.02] hover:duration-300 active:scale-95 active:duration-300"
                style={{ boxShadow: "0px 0px 25px 0 rgba(0,0,0,0.125)" }}
              >
                <div className="flex justify-start items-center relative gap-2.5">
                  <img src={encadrement} alt="Encadrement" /> {/* Affichage de l'icône d'encadrement */}
                </div>
                <p className="w-[181px] text-[20px] font-semibold text-center text-[#1d1d1d]">
                  Ajouter Un chercheur
                </p>
              </div>
              <div
                onClick={() => {
                  navigate("/ajouter/conf_jour"); // Redirection vers la page d'ajout de conférence/journal
                }}
                className="flex flex-col justify-start items-center h-[219.09px] w-[213px] relative gap-2 p-4 rounded-xl bg-white focus:bg-bg_yellow focus:shadow-none hover:bg-slate-100 hover:scale-[1.02] hover:duration-300 active:scale-95 active:duration-300"
                style={{ boxShadow: "0px 0px 25px 0 rgba(0,0,0,0.125)" }}
              >
                <div className="flex justify-center items-center flex-grow relative gap-2.5">
                  <img src={projetBig} alt="Projet" /> {/* Affichage de l'icône de projet */}
                </div>
                <p className="w-[181px] text-[20px] font-semibold text-center text-[#1d1d1d]">
                  Ajouter Un confJournal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
