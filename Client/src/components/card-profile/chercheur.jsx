/* eslint-disable react/prop-types */
import publication from "../../assets/icons/publication.svg";
import grade from "../../assets/icons/grade.svg";
import dip from "../../assets/icons/diplome.svg";
import { useNavigate } from "react-router-dom";

import "./cardchercheur.css";

export function Chercheur(props) {
  const {
    nom_complet,
    role,
    grade_enseignement,
    diplome,
    pic,
    nb_pub,
    chercheur_id,
    utilisateur_id,
  } = props;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Profile", {
      state: { User_id: utilisateur_id, Matricule: chercheur_id },
    });
  };

  return (
    <div
      id="card"
      className="flex justify-between items-center self-stretch flex-grow-0  flex-shrink-0 px-8 py-2 rounded bg-white shadow-[0_2px_4px_rgba(0,0,0,0.25)] focus:bg-bg_yellow focus:shadow-none hover:bg-slate-100 hover:scale-[1.02] hover:duration-300 active:scale-95 active:duration-300"
      onClick={handleClick}
    >
      <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1.5">
        <img
          className="flex-grow-0 flex-shrink-0 rounded-full"
          src={pic}
          alt="Chercheur"
          style={{ width: "60px", height: "60px" }}
        />
        <div className="flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 relative space-y-[-8px]">
          <p className="flex-grow-0 flex-shrink-0 text-[18px] font-semibold  uppercase text-bg_black">
            {nom_complet}
          </p>
          <p className="flex-grow-0 flex-shrink-0 text-[14px] font-light text-center  text-bg_black">
            {role}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 space-y-[-5px]">
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative px-2.5">
          <img src={dip} alt="Diplôme" />
          <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-2.5 py-[5px]">
            <p className="flex-grow-0 flex-shrink-0 text-[15px] text-left">
              <span className="flex-grow-0 flex-shrink-0 text-[15px] text-left text-main_blue">
                {" "}
                Diplôme :{" "}
              </span>
              <span className="flex-grow-0 flex-shrink-0 text-[15px] text-left text-bg_black">
                {" "}
                {diplome}
              </span>
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-2.5 py-[5px]">
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative">
            <img src={grade} alt="Grade" />
          </div>
          <p className="flex-grow-0 flex-shrink-0 text-[15px] text-left">
            <span className="flex-grow-0 flex-shrink-0 text-[15px] text-left text-main_blue">
              Grade :{" "}
            </span>
            <span className="flex-grow-0 flex-shrink-0 text-[15px] text-left text-bg_black">
              {grade_enseignement}
            </span>
          </p>
        </div>

        <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-2.5 py-[5px]">
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative">
            <img
              src={publication}
              alt="Nombre De Publications"
              width="15px"
              height="17px"
            />
          </div>
          <p className="flex-grow-0 flex-shrink-0 text-[15px] text-left">
            <span className="flex-grow-0 flex-shrink-0 text-[15px] text-left text-main_blue">
              Nombre De Publications :
            </span>
            <span className="flex-grow-0 flex-shrink-0 text-[15px] text-left text-bg_black">
              {" "}
              {nb_pub}{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Chercheur;
