/* eslint-disable react/prop-types */ // Désactive les avertissements ESLint concernant les propTypes
import React from "react";
const ConfJournal = ({ confJournalData }) => { // Composant ConfJournal prenant comme props un tableau de données de conférences/journaux
  const [currentPage, setCurrentPage] = React.useState(1); // État pour gérer la page actuelle
  const recordsPerPage = 25; // Nombre d'enregistrements par page

  // Calcul des index des premiers et derniers enregistrements de la page actuelle
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = confJournalData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Calcul du nombre total de pages en fonction du nombre total d'enregistrements et du nombre d'enregistrements par page
  const totalPages = Math.ceil(confJournalData.length / recordsPerPage);

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
    <div className="flex flex-col gap-[16px] h-screen bg-bg_yellow">
      <div className="w-full flex justify-center  ">
        {/* Tableau des données */}
        <table className=" h-14 text-left text-sm">
          <thead className="bg-slate-100 sticky top-0 border-b border-gray-200 shadow">
            <tr>
              <th className="px-4 py-2 sm:fit-content md:w-[100px] lg:w-[120px] xl:w-[150px]">
                Acronyme
              </th>
              <th className="px-4 py-2 sm:fit-content md:w-[70px] lg:w-[80px] xl:w-[100px]">
                Type
              </th>
              <th className="px-4 py-2 sm:fit-content md:w-[300px] lg:w-[457px] xl:w-[557px]">
                Intitulé
              </th>
              <th className="px-4 py-2 sm:fit-content md:w-[70px] lg:w-[80px] xl:w-[100px]">
                Périodicité
              </th>
              <th className="px-4 py-2 sm:fit-content md:w-[100px] lg:w-[120px] xl:w-[150px]">
                Lien
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Affichage des enregistrements de la page actuelle */}
            {currentRecords.map((entry, index) => (
              <tr
                key={entry.ConfJournal_id}
                className={
                  index % 2 === 0
                    ? "bg-white hover:bg-slate-200 hover:duration-300 "
                    : "bg-slate-100 hover:bg-slate-200 hover:duration-300"
                }
              >
                <td className="px-4 py-2 border-b border-gray-200">
                  {entry.ConfJournal_id}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {entry.type}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {entry.nom}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {entry.periodicite}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {/* Lien vers la conférence/journal */}
                  <a
                    href={entry.lien}
                    target="_blank"
                    rel="noreferrer"
                    className=" hover:text-main_blue hover:font-semibold hover:underline"
                  >
                    Clique ici
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="w-full flex justify-center ">
        <ul className="flex flex-row gap-0.5">
          <li className="mx-1">
            {/* Bouton pour aller à la page précédente */}
            <button
              onClick={handlePreviousPage}
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
              className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300"
            >
              Suivant
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ConfJournal;
