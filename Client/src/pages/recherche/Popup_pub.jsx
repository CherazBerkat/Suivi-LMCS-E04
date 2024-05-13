/* eslint-disable react/prop-types */
import icon from "../../assets/icons/cross-small.svg";
import Titre from "./Titre";
import Bouton2 from "./Bouton2";
import { useState, useRef, useEffect } from "react";
import "./Popup.css";

// Composant Popup pour afficher les données de la publication
export default function Popup_pub({ clickHandler, objPub }) {
  const [isClickSauv, setIsClickSauv] = useState(false); // État pour gérer le clic sur le bouton de sauvegarde
  const regex = /^[a-zA-Z0-9\s()\-.,:'’?!_()]+$/; // Expression régulière pour valider le titre de la publication
  const [DataPub, setDataPub] = useState({ // État pour stocker les données de la publication
    name: "",
    nbpages: "",
    nbvols: "",
    mot_cle: "",
  });

  // Fonction pour mettre à jour les données de la publication lors de la saisie de l'utilisateur
  function changeHandler(event) {
    setDataPub((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  // Fonction pour ajouter la publication à l'objet de publication
  function pushPub() {
    objPub.push(DataPub);
  }

  // Fonction pour valider le titre de la publication avec l'expression régulière
  function rgxTitle(data) {
    return data == "" || regex.test(data);
  }

  // Fonction pour vérifier si les données de la publication sont vides
  function dataVoid(data) {
    if (!data || Object.keys(data).length === 0) {
      return true;
    }
    for (const key in data) {
      if (
        Object.prototype.hasOwnProperty.call(data, key) &&
        data[key].trim() !== ""
      ) {
        return false;
      }
    }
    return true;
  }

  // Fonction pour valider les données de la publication
  function validation(data) {
    if (rgxTitle(data.name) && !dataVoid(data)) {
      return true;
    }
    return false;
  }

  // Fonction pour gérer le clic sur le bouton de sauvegarde
  function clickHandlerIN() {
    if (validation(DataPub)) {
      pushPub();
      setIsClickSauv(false);
      clickHandler();
    } else {
      setIsClickSauv(true);
    }
  }

  // Référence pour le menu du popup
  const menuRef = useRef(null);

  // Effet pour gérer le clic en dehors du popup
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
      <Titre text="Publication" icon={icon} clickHandler={clickHandler} />

      <form action="POST" className="w-full flex flex-col gap-1 items-center">
        <div className="w-full flex flex-col gap-[3px]  ">
          <div
            className={`w-full p-[5px] ${isClickSauv && dataVoid(DataPub) ? "border-b-error border-b-[1px]" : "border-b-[3px] border-b-gris_claire"} `}
          >
            <input
              type="text"
              name="name"
              value={DataPub.name}
              className="h-[30px] w-full px-[5px] outline-offset-[8px] rounded-[0.1px] my-[2px] text-[18px] font-normal placeholder:text-gris"
              placeholder="Nom de Publication"
              onChange={changeHandler}
              onBlur={() => {
                rgxTitle(DataPub.name);
              }}
              onFocus={() => {
                setIsClickSauv(false);
              }}
            />
          </div>
          {!rgxTitle(DataPub.name) && DataPub.name != "" && (
            <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
              Titre non valide
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-[3px]  ">
          <div
            className={`w-full p-[5px] ${isClickSauv && dataVoid(DataPub) ? "border-b-error border-b-[1px]" : "border-b-[3px] border-b-gris_claire"} `}
          >
            <input
              type="text"
              name="mot_cle"
              value={DataPub.mot_cle}
              className="h-[30px] w-full px-[5px] outline-offset-[8px] rounded-[0.1px] my-[2px] text-[18px] font-normal placeholder:text-gris"
              placeholder="Mot clé"
              onChange={changeHandler}
              onFocus={() => {
                setIsClickSauv(false);
              }}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-[3px]  ">
          {isClickSauv && dataVoid(DataPub) && (
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
