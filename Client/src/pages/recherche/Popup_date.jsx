/* eslint-disable react/prop-types */
import icon from "../../assets/icons/cross-small.svg";
import Titre from "./Titre";
import Bouton2 from "./Bouton2";
import { useState, useRef, useEffect } from "react";
import "./Popup.css";
//----------------------------------------------------------------------------

export default function Popup_date({ clickHandler, objDate }) {
  const [isClickSauv, setIsClickSauv] = useState(false);
  const [DataDate, setDataDate] = useState({
    Annee: "",
    date_fin: "",
    date_debut: "",
    Affichage: "",
  });

  function changeHandler(event) {
    setDataDate((prevFormData) => {
      const { name, value, type, checked } = event.target;
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  function pushDate() {
    if (objDate.length === 0) {
      objDate.push(DataDate);
    }
  }

  function dataVoid(data) {
    // Check if data is null, undefined, or an empty object
    if (!data || Object.keys(data).length === 0) {
      return true;
    }

    // Check if any value in the data object is non-empty and non-whitespace
    for (const key in data) {
      if (
        Object.prototype.hasOwnProperty.call(data, key) &&
        data[key].trim() !== "" &&
        key != "Affichage"
      ) {
        return false;
      }
    }

    // If all values are empty or whitespace, return false
    return true;
  }

  function validateDates(data) {
    if (
      (data.date_debut != "" &&
        (data.date_debut < 1950 ||
          data.date_debut > new Date().getFullYear())) ||
      (data.date_fin != "" &&
        (data.date_fin < 1950 || data.date_fin > new Date().getFullYear())) ||
      (data.date_debut != "" &&
        data.date_fin != "" &&
        data.date_debut > 1950 &&
        data.date_debut < new Date().getFullYear() &&
        data.date_fin > 1950 &&
        data.date_fin < new Date().getFullYear() &&
        data.date_fin < data.date_debut) ||
      (data.Annee != "" &&
        (data.Annee < 1950 || data.Annee > new Date().getFullYear()))
    ) {
      return false;
    } else return true;
  }

  function validation(data) {
    if (dataVoid(data) || !validateDates(data)) {
      return false;
    }
    return true;
  }

  function clickHandlerIN() {
    if (validation(DataDate)) {
      pushDate();
      setIsClickSauv(false);
      clickHandler();
    } else {
      setIsClickSauv(true);
    }
  }

  let isOpen = 1;
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isOpen >= 2
      ) {
        clickHandler();
      } else isOpen++;
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [clickHandler, isOpen]);

  return (
    <div
      className=" flex flex-col w-[400px] h-fit  rounded-[5px] py-[16px] px-[32px] gap-[8px] shadow-xl items-start bg-pure_white"
      ref={menuRef}
    >
      <Titre text="Date" icon={icon} clickHandler={clickHandler} />

      <form action="POST" className="w-full flex flex-col gap-1 items-start">
        <div className="w-full flex flex-col gap-[3px]  ">
          <div
            className={`w-full p-[5px] ${isClickSauv && dataVoid(DataDate) ? "border-b-error border-b-[1px]" : "border-b-[3px] border-b-gris_claire"} `}
          >
            <input
              type="number"
              name="Annee"
              min={1950}
              max={new Date().getFullYear()}
              placeholder="Année spécifique ex: 2021"
              value={DataDate.Annee}
              className="h-[30px] w-full px-[5px] outline-offset-[8px] rounded-[0.1px] my-[2px] text-[18px] font-normal"
              onChange={changeHandler}
              onFocus={() => {
                setIsClickSauv(false);
              }}
            />
          </div>
          {(parseInt(DataDate.Annee) < 1950 ||
            parseInt(DataDate.Annee) > new Date().getFullYear()) && (
            <p className={`text-[12px] p-[2px] text-error`}>
              Veuillez entrer une année depuis 1950 jusqu&apos;à l&apos;année en
              cours.
            </p>
          )}
        </div>

        <div className="w-full flex flex-col gap-[3px]  ">
          <div
            className={`w-full p-[5px] ${isClickSauv && dataVoid(DataDate) ? "border-b-error border-b-[1px]" : "border-b-[3px] border-b-gris_claire"} `}
          >
            <input
              type="number"
              name="date_debut"
              value={DataDate.date_debut}
              className="h-[30px] w-full px-[5px] outline-offset-[8px] rounded-[0.1px] my-[2px] text-[18px] font-normal"
              placeholder="Année Début"
              onChange={changeHandler}
              onFocus={() => {
                setIsClickSauv(false);
              }}
            />
          </div>
          {(parseInt(DataDate.date_debut) < 1950 ||
            parseInt(DataDate.date_debut) > new Date().getFullYear()) && (
            <p className={`text-[12px] p-[2px] text-error`}>
              Veuillez entrer une date depuis 1950 jusqu&apos;à l&apos;année en
              cours.
            </p>
          )}
        </div>

        <div className="w-full flex flex-col gap-[3px]  ">
          <div
            className={`w-full p-[5px] ${isClickSauv && dataVoid(DataDate) ? "border-b-error border-b-[1px]" : "border-b-[3px] border-b-gris_claire"} `}
          >
            <input
              type="number"
              name="date_fin"
              value={DataDate.date_fin}
              className="h-[30px] w-full px-[5px] outline-offset-[8px] rounded-[0.1px] my-[2px] text-[18px] font-normal"
              placeholder="Année Fin"
              onChange={changeHandler}
              onFocus={() => {
                setIsClickSauv(false);
              }}
            />
          </div>
          {parseInt(DataDate.date_fin) < parseInt(DataDate.date_debut) &&
            parseInt(DataDate.date_fin) > 1950 &&
            parseInt(DataDate.date_fin) < new Date().getFullYear() &&
            parseInt(DataDate.date_debut) > 1950 &&
            parseInt(DataDate.date_debut) < new Date().getFullYear() && (
              <p className={`text-[12px] p-[2px] text-error`}>
                Veuillez entrer une année de fin supérieure à l&apos;année de
                début
              </p>
            )}
          {(parseInt(DataDate.date_fin) < 1950 ||
            parseInt(DataDate.date_fin) > new Date().getFullYear()) && (
            <p className={`text-[12px] p-[2px] text-error`}>
              Veuillez entrer une date depuis 1950 jusqu&apos;à l&apos;année en
              cours.
            </p>
          )}
          {isClickSauv && dataVoid(DataDate) && (
            <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
              Veuillez remplir au moins un champ
            </p>
          )}
        </div>

        <div className="my-2 ">
          <Titre text="Afficher Selon:" />
        </div>

        <div className="w-full flex flex-col gap-[1px]  ">
          <div className="w-full p-[5px] border-b-[3px] border-b-gris_claire ">
            <select
              type="text"
              name="Affichage"
              value={DataDate.Affichage}
              className="h-[30px] w-full px-[5px] outline-offset-[8px] rounded-[0.1px] my-[2px]  text-[20px] font-normal"
              onChange={changeHandler}
              onFocus={() => {
                setIsClickSauv(false);
              }}
            >
              <option value="">Choisissez type d&apos;affichage</option>
              <option value="Alphabetique">Alphabetique</option>
              <option value="Ancien">Ancien</option>
              <option value="Recent">Recent</option>
            </select>
          </div>
        </div>
        <Bouton2
          text="Sauvgarder Filtre"
          color="bg-main_blue"
          margin="mt-[16px]"
          strockcolor="border-none"
          clickHandler={clickHandlerIN}
        />
      </form>
    </div>
  );
}
