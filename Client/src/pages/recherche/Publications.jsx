/* eslint-disable react/prop-types */
import { useState } from "react";
import Cardpub from "../../components/card-pub/Cardpub";

// Composant pour afficher les publications avec pagination
function Publications({ publications }) {
  const [currentPage, setCurrentPage] = useState(1); // État pour stocker le numéro de la page actuelle
  const recordsPerPage = 10; // Nombre d'enregistrements à afficher par page
  const pageNeighbours = 4; // Nombre de pages à afficher de chaque côté de la page actuelle

  const totalRecords = publications.length; // Nombre total d'enregistrements
  const totalPages = Math.ceil(totalRecords / recordsPerPage); // Nombre total de pages

  // Fonction pour gérer le clic sur une page spécifique
  const handleClickPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fonction pour passer à la page précédente
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Fonction pour passer à la page suivante
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Fonction pour obtenir les numéros de page à afficher
  const getPageNumbers = () => {
    const totalPageNumbers = pageNeighbours * 2 + 1;
    const totalVisiblePages = totalPageNumbers - 2;

    let startPage = Math.max(1, currentPage - pageNeighbours);
    let endPage = Math.min(totalPages, startPage + totalVisiblePages - 1);

    const visiblePages = endPage - startPage + 1;
    if (visiblePages < totalVisiblePages) {
      startPage = Math.max(1, endPage - totalVisiblePages + 1);
    }

    const pageNumbers = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
    return pageNumbers;
  };

  // Fonction pour rendre les numéros de page
  const renderPageNumbers = () => {
    const pageNumbers = getPageNumbers();

    return (
      <>
        {currentPage > 1 && (
          <li className="mx-1">
            <button
              onClick={handlePreviousPage}
              className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300"
            >
              Précédent
            </button>
          </li>
        )}
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className="mx-1">
            <button
              onClick={() => handleClickPage(pageNumber)}
              className={`px-3 py-1 rounded ${currentPage === pageNumber ? "bg-slate-300" : "bg-slate-200 hover:bg-slate-300"}`}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li className="mx-1">
            <button
              onClick={handleNextPage}
              className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300"
            >
              Suivant
            </button>
          </li>
        )}
      </>
    );
  };

  // Index du dernier enregistrement sur la page actuelle
  const indexOfLastRecord = currentPage * recordsPerPage;
  // Index du premier enregistrement sur la page actuelle
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // Enregistrements à afficher sur la page actuelle
  const currentRecords = publications.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  return (
    <div className="grid gap-[32px] bg-bg_yellow ">
      <div className="grid gap-2 ">
        {/* Mapping pour afficher les enregistrements actuels en tant que cartes de publication */}
        {currentRecords.map((publication, index) => (
          <Cardpub key={index} publication={publication} profile={false} />
        ))}
      </div>
      {/* Affichage des numéros de page */}
      <div className="w-full flex justify-center">
        <ul className="flex flex-row gap-0.5">{renderPageNumbers()}</ul>
      </div>
    </div>
  );
}

export default Publications;
