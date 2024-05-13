/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import Cardpub from "../../components/card-pub/Cardpub";

function Publication({ Matricule, profile }) {
  // Déclaration de l'état pour les publications
  const [publications, setpublications] = useState([]);

  // Effet pour charger les publications
  useEffect(() => {
    const fetchpublications = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/profil/chercheur_publications/",
          { Matricule: Matricule }
        );
        setpublications(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchpublications();
  }, [Matricule]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = publications.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(publications.length / recordsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Affichage des publications et de la pagination
  return (
    <div className="grid gap-[32px] bg-bg_yellow ">
      <div className="grid gap-2 ">
        {currentRecords.map((publication, index) => (
          <Cardpub key={index} publication={publication} profile={profile} />
        ))}
      </div>
      <div className="w-full flex justify-center ">
        <ul className="flex flex-row gap-0.5">
          <li className="mx-1">
            <button
              onClick={handlePreviousPage}
              className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300"
            >
              Précédent
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i} className="mx-1">
              <button
                onClick={() => handleChangePage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-slate-300" : "bg-slate-200 hover:bg-slate-300"}`}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li className="mx-1">
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
}

export default Publication;
