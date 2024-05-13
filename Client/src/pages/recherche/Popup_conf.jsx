/* eslint-disable react/prop-types */
import icon from "../../assets/icons/cross-small.svg";
import Titre from "./Titre";
import Bouton2 from "./Bouton2";
import { useState, useRef, useEffect } from "react";
import "./Popup.css";

export default function Popup_conf({
  clickHandler,
  objConfJournal,
  periodicite,
}) {
  const [DataConf, setDataConf] = useState({
    nom: "",
    Acronyme: "",
    type: "",
    periodicite: "",
  });
  const [isClickSauv, setIsClickSauv] = useState(false);
  const conferenceNameRegex = /^[a-zA-Z0-9\s()\-.,:'’]+$/;
  const acronymRegex = /^[A-Z0-9]+$/;

  function dataVoid(data) {
    // Check if data is null, undefined, or an empty object
    if (!data || Object.keys(data).length === 0) {
      return true;
    }

    // Check if any value in the data object is non-empty and non-whitespace
    for (const key in data) {
      if (
        Object.prototype.hasOwnProperty.call(data, key) &&
        data[key].trim() != ""
      ) {
        return false;
      }
    }

    // If all values are empty or whitespace, return false
    return true;
  }

  function changeHandler(event) {
    setDataConf((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function pushConf() {
    if (objConfJournal.length === 0) {
      objConfJournal.push(DataConf);
    }
  }

  function validateConferenceName(name) {
    return name == "" || conferenceNameRegex.test(name);
  }

  function validateAcronym(acronym) {
    return acronym == "" || acronymRegex.test(acronym);
  }

  function validation(data) {
    if (
      validateAcronym(data.Acronyme) &&
      validateConferenceName(data.nom) &&
      !dataVoid(data)
    ) {
      return true;
    }
    return false;
  }

  function clickHandlerIN() {
    if (validation(DataConf)) {
      pushConf();
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
      className=" flex flex-col w-[400px] h-fit  rounded-[5px] py-[16px] px-[32px] gap-[8px] shadow-xl items-end bg-pure_white"
      ref={menuRef}
    >
      <Titre text="ConfJournal" icon={icon} clickHandler={clickHandler} />

      <form action="POST" className="w-full flex flex-col gap-1 items-center">
        <div className="w-full flex flex-col gap-[3px]  ">
          <div
            className={`w-full p-[5px]  ${isClickSauv && dataVoid(DataConf) ? "border-b-error border-b-[1px]" : "border-b-[3px] border-b-gris_claire"} `}
          >
            <input
              type="text"
              name="nom"
              value={DataConf.nom}
              className="h-[30px] w-full px-[5px] outline-offset-[8px] rounded-[0.1px] my-[2px]  text-[18px] font-normal placeholder:text-gris"
              placeholder="Nom de ConfJournal"
              onChange={changeHandler}
              onBlur={() => {
                validateConferenceName(DataConf.nom);
              }}
              onFocus={() => {
                setIsClickSauv(false);
              }}
            />
          </div>
          {!validateConferenceName(DataConf.Acronyme) &&
            DataConf.Acronyme != "" && (
              <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
                Nom non valide
              </p>
            )}
        </div>

        <div className="w-full flex flex-col gap-[3px]  ">
          <div
            className={`w-full p-[5px]  ${isClickSauv && dataVoid(DataConf) ? "border-b-error border-b-[1px]" : "border-b-[3px] border-b-gris_claire"} `}
          >
            <input
              type="text"
              name="Acronyme"
              value={DataConf.Acronyme}
              className="h-[30px] w-full px-[5px]  outline-offset-[8px] rounded-[0.1px] my-[2px]  text-[18px] font-normal placeholder:text-gris"
              placeholder="Acronyme"
              onChange={changeHandler}
              onFocus={() => {
                setIsClickSauv(false);
              }}
            />
          </div>
          {!validateAcronym(DataConf.Acronyme) && DataConf.Acronyme != "" && (
            <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
              Acronyme non valide, L&apos;Acronyme doit être en majuscule et ne
              contient pas d&apos;espace
            </p>
          )}
        </div>

        <div className="w-full flex flex-col gap-[3px]  ">
          <div
            className={`w-full p-[5px]  ${isClickSauv && dataVoid(DataConf) ? "border-b-error border-b-[1px]" : "border-b-[3px] border-b-gris_claire"} `}
          >
            <select
              type="text"
              name="type"
              value={DataConf.type}
              className="h-[30px] w-full px-[5px]  outline-offset-[8px] rounded-[0.1px] my-[2px]  text-[20px] font-normal"
              onChange={changeHandler}
              onFocus={() => {
                setIsClickSauv(false);
              }}
            >
              <option value="">Choisissez le type</option>
              <option value="Conference">Conference</option>
              <option value="Journal">Journal</option>
            </select>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[1px]  ">
          <div
            className={`w-full p-[5px]  ${isClickSauv && dataVoid(DataConf) ? "border-b-error border-b-[1px]" : "border-b-[3px] border-b-gris_claire"} `}
          >
            <select
              type="text"
              name="periodicite"
              value={DataConf.periodicite}
              className="h-[30px] w-full px-[5px]  outline-offset-[8px] rounded-[0.1px] my-[2px]   text-[20px] font-normal"
              onChange={changeHandler}
              onFocus={() => {
                setIsClickSauv(false);
              }}
            >
              <option className="font-normal text-gris ">Periodicité</option>
              {periodicite.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {isClickSauv && dataVoid(DataConf) && (
            <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
              Veuillez remplir au moins un champ
            </p>
          )}
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
