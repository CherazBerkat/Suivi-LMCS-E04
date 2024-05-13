/* eslint-disable react/prop-types */ // Désactive les avertissements ESLint concernant les propTypes
import { useState } from "react";
import Chercheur from "../../components/card-profile/chercheur";

function Chercheurs({ chercheurs }) { // Composant Chercheurs prenant comme props un tableau de chercheurs
  const [currentPage, setCurrentPage] = useState(1); // État pour gérer la page actuelle
  const recordsPerPage = 5; // Nombre d'enregistrements par page

  // Calcul des index des premiers et derniers enregistrements de la page actuelle
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Sélection des chercheurs à afficher sur la page actuelle
  const currentChercheurs = chercheurs.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Calcul du nombre total de pages en fonction du nombre total de chercheurs et du nombre d'enregistrements par page
  const totalPages = Math.ceil(chercheurs.length / recordsPerPage);

  // Fonction pour passer à la page précédente
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Fonction pour changer de page
  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fonction pour passer à la page suivante
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="grid gap-[32px] bg-bg_yellow">
      <div className="grid gap-2">
        {/* Affichage des chercheurs de la page actuelle */}
        {currentChercheurs.map((chercheur, index) => (
          <Chercheur key={index} {...chercheur} />
        ))}
        {/* Pagination */}
        <div className="w-full flex justify-center">
          <ul className="flex flex-row gap-0.5">
            <li className="mx-1">
              {/* Bouton pour aller à la page précédente */}
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300"
              >
                Précédent
              </button>
            </li>
            {/* Affichage des boutons pour chaque page */}
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className="mx-1">
                {/* Bouton pour aller à la page i */}
                <button
                  onClick={() => handleChangePage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-slate-300"
                      : "bg-slate-200 hover:bg-slate-300"
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li className="mx-1">
              {/* Bouton pour aller à la page suivante */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300"
              >
                Suivant
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Chercheurs;
