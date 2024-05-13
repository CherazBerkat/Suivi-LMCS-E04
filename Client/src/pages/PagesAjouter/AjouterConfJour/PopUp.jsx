/* eslint-disable react/prop-types */  // Désactivation des avertissements liés aux types des props

import Titre from "../../recherche/Titre";
import icon from "../../../assets/icons/cross-small.svg";
import BoutonAjouter from "./BoutonAjouter";
import React from "react";
import "../AjouterPublication/Ajouter.css";

export default function PopUp({ ToggleHandler, setFormData }) {
  const [formDataList, setFormDataList] = React.useState({ nom: "", rang: "" });

  function changeHandler(event) {
    setFormDataList((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }
  let isOpen = 1;
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isOpen == 2
      ) {
        ToggleHandler();
      } else isOpen++;
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ToggleHandler, isOpen]);

  function rgxNom(data) {
    const regex = /^[a-zA-Z\s]{1,}$/;
    return regex.test(data);
  }
  function rgxrang(data) {
    const regex = /^[a-zA-Z0-9+]{1,3}$/
    return regex.test(data);
  }
  function dataFilled(data) {
    return data.nom != "" && data.rang != "";
  }
  function validation(data) {
    return (
      dataFilled(data) && rgxNom(data.NomDeChercheur) && rgxrang(data.rang)
    );
  }
  const [clicked, setClicked] = React.useState(false);
  function clickHandler() {
    if (validation(formDataList)) {
      setFormData((prev) => {
        prev.listClassement.push(formDataList);
        return prev;
      });
      ToggleHandler();
    } else {
      setClicked(true);
    }
  }
  return (
    <div className="  w-full absolute items-center flex justify-center top-0 bg-bg_gris bg-opacity-60 w_full h-full">
      <div
        className=" flex flex-col w-[400px] h-fit   rounded-[5px] py-[16px] px-[32px] gap-[8px] shadow-xl items-end bg-pure_white"
        ref={menuRef}
      >
        <Titre text="Classement" icon={icon} clickHandler={ToggleHandler} />

        <form action="" className="w-full flex flex-col gap-1 items-end ">
          <div className="w-full flex flex-col gap-[3px]  ">
            <div className="w-full p-[5px]  border-b-gris_claire border-b-[3px] ">
              <input
                type="text"
                name="nom"
                className="h-[30px] w-full px-[5px] outline-offset-[8px] rounded-[0.1px] my-[2px] text-gris text-[18px] font-light"
                placeholder="Nom"
                onChange={changeHandler}
              />
            </div>
            {!rgxNom(formDataList.nom) && formDataList.nom != "" && clicked && (
              <p
                className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}
              >
                Nom non valide
              </p>
            )}
            {formDataList.nom == "" && clicked && (
              <p
                className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}
              >
                Veuillez remplire ce champ.
              </p>
            )}
          </div>

          <div className="w-full flex flex-col gap-[3px]  ">
            <div className="w-full p-[5px]  border-b-gris_claire border-b-[3px] ">
              <input
                type="text"
                name="rang"
                className="h-[30px] w-full px-[5px] outline-offset-[8px] rounded-[0.1px] my-[2px] text-gris text-[18px] font-light"
                placeholder="rang"
                onChange={changeHandler}
              />
            </div>
            {!rgxrang(formDataList.rang) &&
              formDataList.rang != "" &&
              clicked && (
                <p
                  className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}
                >
                  Rang non valide
                </p>
              )}
            {formDataList.rang == "" && clicked && (
              <p
                className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}
              >
                Veuillez remplire ce champ.
              </p>
            )}
          </div>

          <BoutonAjouter
            clickHandler={clickHandler}
            text="Ajouter Classement"
          />
        </form>
      </div>
    </div>
  );
}
