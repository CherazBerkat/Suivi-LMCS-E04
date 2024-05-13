/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

const Projet = ({ Matricule }) => {
  // Déclaration d'un état initial pour les données
  const [Data, setData] = useState([
    {
      projet_id: "",
      intitule: "",
      chef_projet: "",
      domaine: "",

      date_debut: "",
      date_fin: "",
    },
  ]);
  // ingetration avec le backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/profil/chercheur_projects/",
          { Matricule: Matricule }
        );
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [Matricule]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 25;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = Data.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(Data.length / recordsPerPage);

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

  return (
    <div className="flex flex-col gap-[16px] h-screen bg-bg_yellow">
      <div className="w-full flex justify-center  ">
        <table className=" h-14 text-left text-sm">
          <thead className="bg-slate-100 sticky top-0 border-b border-gray-200 shadow">
            <tr>
              <th className="px-4 py-2 sm:fit-content md:w-[100px] lg:w-[120px] xl:w-[150px] ">
                Domaine
              </th>
              <th className="px-4 py-2 sm:fit-content md:w-[300px] lg:w-[457px] xl:w-[557px]">
                Titre
              </th>
              <th className="px-4 py-2 sm:fit-content md:w-[70px] lg:w-[80px] xl:w-[100px]">
                Année de début
              </th>
              <th className="px-4 py-2 sm:fit-content md:w-[70px] lg:w-[80px] xl:w-[100px]">
                Année de fin
              </th>
              <th className="px-4 py-2 sm:fit-content md:w-[100px] lg:w-[120px] xl:w-[150px]">
                Chef De Projet
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((entry, index) => (
              <tr
                key={entry.projet_id}
                className={
                  index % 2 === 0
                    ? "bg-white hover:bg-slate-200 hover:duration-300 "
                    : "bg-slate-100 hover:bg-slate-200 hover:duration-300"
                }
              >
                <td className="px-4 py-2 border-b border-gray-200">
                  {entry.domaine}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {entry.intitule}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {entry.date_debut}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {entry.date_fin}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {entry.chef_projet}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
};

export default Projet;
