/* eslint-disable react/prop-types */
import chevronRight from "../../../assets/icons/chevron-Right.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function CriteresForm({ visiteur }) {
  const visiteurString = visiteur ? "Visiteur" : "Utilisateur";
  const [focused, setFocused] = useState(false);
  const [focusedTwo, setFocusedTwo] = useState(false);
  const [focusedThree, setFocusedThree] = useState(false);
  const [clicked, setClicked] = useState(false);
  const handleFocus = () => {
    setFocused(true);
  };
  const handleFocusTwo = () => {
    setFocusedTwo(true);
  };
  const handleFocusThree = () => {
    setFocusedThree(true);
  };
  const [formData, setFormData] = useState({
    critere: "",
    date_debut: "",
    date_fin: "",
  });

  const validationSup = () => {
    return formData.date_fin > formData.date_debut;
  };

  const validation = () => {
    if (formData.critere === "") {
      return false;
    } else if (formData.critere === "Nombre_De_Publication_Par_Date") {
      if (
        formData.date_debut === "" ||
        formData.date_fin === "" ||
        formData.date_debut > formData.date_fin ||
        formData.date_debut < 1999 ||
        formData.date_fin > new Date().getFullYear()
      ) {
        return false;
      } else return true;
    } else return true;
  };

  function chengeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  }
  const history = useNavigate();
  function submitHandler(event) {
    event.preventDefault();
    if (validation()) {
      if (formData.critere == "Nombre_De_Publication_Par_Date") {
        const startDate = formData.date_debut;
        const endDate = formData.date_fin;
        const url = `/Statistique/Affichage/${visiteurString}/${formData.critere}/${startDate}/${endDate}`;
        history(url);
        window.location.href = `/Statistique/Affichage/${visiteurString}/Nombre_De_Publication_Par_Date/${startDate}/${endDate}`;
      } else
        window.location.href = `/Statistique/Affichage/${visiteurString}/${formData.critere}`;
    } else {
      setClicked(true);
    }
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <form
      className={`flex flex-col ${
        windowWidth > 1395
          ? "px-80"
          : windowWidth > 1292
          ? "px-60"
          : windowWidth > 1119
          ? "px-32"
          : "px-16"
      }  text-[20px] leading-[30px] gap-8`}
    >
      <div className="flex flex-col gap-8 text-pure_black">
        <div
          className={`flex ${windowWidth > 575 ? "flex-row" : "flex-col"}  ${
            windowWidth > 699
              ? "gap-[150px]"
              : windowWidth > 650
              ? "gap-[100px]"
              : windowWidth > 575
              ? "gap-[30px]"
              : "gap-4"
          }`}
        >
          <label htmlFor="critere" className="flex flex-row gap-1">
            Critère<span className="text-error"> *</span>:
          </label>
          <div className="flex flex-col gap-0">
            <select
              required
              name="critere"
              id="critere"
              className={` ${
                windowWidth > 1064
                  ? "w-fit"
                  : windowWidth > 892
                  ? "w-[400px]"
                  : "w-[250px]"
              } h-fit border-[1px] ${
                (focused || clicked) && formData.critere === ""
                  ? "border-error"
                  : "border-steel_blue"
              } rounded-[5px] py-[8px] px-[10px] bg-[#DDE7F0] `}
              onChange={chengeHandler}
              onBlur={handleFocus}
            >
              <option value="" className="text-[#525252]">
                select an option
              </option>
              <option value="Nombre_De_Publication_Par_Date">
                Nombre de Publication Par Date
              </option>
              <option value="Nombre_De_Chercheur_Par_Equipe">
                Nombre de Chercheur Par Équipe
              </option>
              <option value="Nombre_De_Chercheur_Par_Grade_De_Recherche">
                Nombre de Chercheur Par Grade de Recherche
              </option>
              <option value="Nombre_De_Chercheur_Par_Grade_Enseignant">
                Nombre de Chercheur Par Grade Enseignant
              </option>
              <option value="Nombre_De_Revue_Par_Periodicite">
                Nombre de Revue Par Périodicité
              </option>
              <option value="Nombre_de_Revue_Par_Type">
                Nombre de Revue Par Type
              </option>
            </select>
            {clicked && formData.critere === "" && (
              <p className={`text-[12px] p-[2px] text-error`}>
                Veuillez Choisir un critere
              </p>
            )}
          </div>
        </div>
        {formData.critere === "Nombre_De_Publication_Par_Date" && (
          <div
            className={`flex ${
              windowWidth > 575 ? "flex-row" : "flex-col gap-4"
            } justify-between`}
          >
            <label htmlFor="date_debut">
              Année De Début <span className="text-error"> *</span>:
            </label>
            <div className="flex flex-col gap-0">
              <input
                required
                type="number"
                placeholder="ex: 2021"
                name="date_debut"
                id="date_debut"
                onBlur={handleFocusTwo}
                className={` ${
                  windowWidth > 1064
                    ? "w-[488.8px]"
                    : windowWidth > 892
                    ? "w-[400px]"
                    : "w-[250px]"
                } h-fit border border-steel_blue rounded-[5px] py-[8px] px-[10px] bg-[#DDE7F0] placeholder:text-[#525252] ${
                  focusedTwo &&
                  (parseInt(formData.date_debut) < 1999 ||
                    parseInt(formData.date_debut) > new Date().getFullYear())
                    ? "border-error"
                    : ""
                }`}
                onChange={chengeHandler}
              />
              {(parseInt(formData.date_debut) < 1999 ||
                parseInt(formData.date_debut) > new Date().getFullYear()) && (
                <p className={`text-[12px] p-[2px] text-error`}>
                  Veuillez entrer une année depuis 1999 jusqu&apos;à
                  l&apos;année en cours.
                </p>
              )}
            </div>
          </div>
        )}
        {formData.critere === "Nombre_De_Publication_Par_Date" && (
          <div
            className={`flex ${
              windowWidth > 575 ? "flex-row" : "flex-col gap-4"
            } justify-between`}
          >
            <label htmlFor="date_fin">
              Année De Fin <span className="text-error"> *</span>:
            </label>
            <div className="flex flex-col gap-2">
              <input
                required
                type="number"
                placeholder="ex: 2024"
                name="date_fin"
                id="date_fin"
                onBlur={handleFocusThree}
                className={`${
                  windowWidth > 1064
                    ? "w-[488.8px]"
                    : windowWidth > 892
                    ? "w-[400px]"
                    : "w-[250px]"
                } h-fit border border-steel_blue rounded-[5px] py-[8px] px-[10px] bg-[#DDE7F0] placeholder:text-[#525252] ${
                  focusedThree &&
                  (parseInt(formData.date_fin) < 1999 ||
                    parseInt(formData.date_fin) > new Date().getFullYear())
                    ? "border-error"
                    : ""
                }`}
                onChange={chengeHandler}
              />
              {(parseInt(formData.date_fin) < 1999 ||
                parseInt(formData.date_fin) > new Date().getFullYear()) && (
                <p className={`text-[12px] p-[3px] text-error`}>
                  Veuillez entrer une année depuis 1999 jusqu&apos;à
                  l&apos;année en cours.
                </p>
              )}
              {clicked &&
                !validationSup() &&
                !(formData.date_fin === "" || formData.date_debut === "") && (
                  <p className={`text-[12px] p-[3px] text-error`}>
                    Veuillez entrer une année de fin supérieure à l&apos;année
                    de début
                  </p>
                )}
              {clicked &&
                formData.date_fin === "" &&
                formData.date_debut === "" && (
                  <p className={`text-[12px] p-[3px] text-error`}>
                    Veuillez entrer une année de fin et une année de début
                  </p>
                )}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end items-center">
        <button
          className=" bg-main_blue rounded-[20px] w-fit px-8 py-[5px] flex flex-row items-center gap-[20px] font-medium text-bg_yellow cursor-pointer hover:scale-[1.02] hover:duration-300  active:scale-95 active:duration-300 "
          onClick={submitHandler}
        >
          Valider
          <img src={chevronRight} className="w-[19px] h-[19px]" />
        </button>
      </div>
    </form>
  );
}
