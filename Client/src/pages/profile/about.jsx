/* eslint-disable react/prop-types */ // Désactivation des avertissements liés aux types des props
import { useState, useEffect } from "react"; // Importation de useState et useEffect depuis React
import gradeBig from "../../assets/icons/gradeBig.svg"; // Importation de l'icône gradeBig
import orcid from "../../assets/icons/orcid.svg"; // Importation de l'icône orcid
import hindex from "../../assets/icons/hindex.svg"; // Importation de l'icône hindex
import publications from "../../assets/icons/publications.svg"; // Importation de l'icône publications
import diplomeBig from "../../assets/icons/diplomeBig.svg"; // Importation de l'icône diplomeBig
import chercheur from "../../assets/icons/chercheur.svg"; // Importation de l'icône chercheur
import equipe from "../../assets/icons/equipe.svg"; // Importation de l'icône equipe
import matricule from "../../assets/icons/matricule.svg"; // Importation de l'icône matricule
import axios from "axios"; // Importation de axios


const About = ({ Matricule }) => {
  const [infochercheur, setinfochercheur] = useState({
    diplome: "",
    qualite: "",
    grade_recherche: "",
    hindex: "",
    equipe: "",
    ORCID: "",
  });

  useEffect(() => {
    if (Matricule) {
      const fetchinfochercheur = async () => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/profil/chercheur_personal_info/",
            { Matricule: Matricule }
          );
          setinfochercheur(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchinfochercheur();
    }
  }, [Matricule]);

  const [nbrpub, setnbrpub] = useState();

  useEffect(() => {
    if (Matricule) {
      const fetchnbrpub = async () => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/recherche/Pubs/",
            { Matricule: Matricule }
          );
          setnbrpub(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchnbrpub();
    }
  }, [Matricule]);

  return (
    <div className=" sm:w-[300px] md:w-[500px] lg:w-[700px] xl:w-[800px] flex flex-col justify-start items-start flex-grow">
      <div className="flex justify-start items-center relative">
        <img src={matricule} alt="ID" />
        <div className="flex justify-center items-center relative px-2.5 py-1">
          <p className=" text-lg text-left">
            <span className=" text-left text-[#3d80b3]">Matricule : </span>
            <span className=" text-left text-[#30353c]">{Matricule}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-start items-center relative">
        <img src={hindex} alt="HIndex" />
        <div className="flex justify-center items-center relative px-2.5 py-1">
          <p className=" text-lg text-left">
            <span className=" text-left text-[#3d80b3]">HIndex : </span>
            <span className=" text-left text-[#30353c]">
              {infochercheur.hindex}
            </span>
          </p>
        </div>
      </div>

      <div className="flex justify-start items-center relative">
        <img src={orcid} alt="orcid" />
        <div className="flex justify-center items-center relative px-2.5 py-1">
          <p className=" text-lg text-left">
            <span className=" text-left text-[#3d80b3]">ORCID : </span>
            <span className=" text-left text-[#30353c]">
              {infochercheur.ORCID}
            </span>
          </p>
        </div>
      </div>

      <div className="flex justify-start items-center relative">
        <img src={publications} alt="Publication" />
        <div className="flex justify-center items-center relative px-2.5 py-1">
          <p className=" text-lg text-left">
            <span className="  text-left text-[#3d80b3]">
              Nombre De Publications :{" "}
            </span>
            <span className="  text-left text-[#30353c]">{nbrpub}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-start items-center relative">
        <img src={diplomeBig} alt="Diplome" />
        <div className="flex justify-center items-centerrelative px-2.5 py-1">
          <p className=" text-lg text-left">
            <span className=" text-left text-[#3d80b3]">Diplôme : </span>
            <span className=" text-left text-[#30353c]">
              {infochercheur.diplome}
            </span>
          </p>
        </div>
      </div>

      <div className="flex justify-start items-center relative">
        <img src={gradeBig} alt="Grade" />
        <div className="flex justify-center items-center relative px-2.5 py-1">
          <p className=" text-lg text-left">
            <span className=" text-left text-[#3d80b3]">
              Grade De Recherche:{" "}
            </span>
            <span className=" text-left text-[#30353c]">
              {infochercheur.grade_recherche}
            </span>
          </p>
        </div>
      </div>

      <div className="flex justify-start items-center relative">
        <img src={chercheur} alt="type" />
        <div className="flex justify-center items-center relative px-2.5 py-1">
          <p className=" text-lg text-left">
            <span className=" text-left text-[#3d80b3]">
              Qualité De Chercheur :{" "}
            </span>
            <span className=" text-left text-[#30353c]">
              {infochercheur.qualite}
            </span>
          </p>
        </div>
      </div>

      <div className="flex justify-start items-center relative">
        <img src={equipe} alt="equipe" />
        <div className="flex justify-center items-center relative px-2.5 py-1">
          <p className=" text-lg text-left">
            <span className=" text-left text-[#3d80b3]">Equipe : </span>
            <span className=" text-left text-[#30353c]">
              {infochercheur.equipe}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
