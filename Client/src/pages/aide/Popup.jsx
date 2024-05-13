// Disabling eslint rule for prop types
/* eslint-disable react/prop-types */

// Importing necessary modules and components
import icon from "../../assets/icons/cross-small.svg";
import Titre from "./Titre";
import Bouton from "./Bouton";
import { useState, useRef, useEffect } from "react";
import "./Popup.css";
import axios from "axios";

// Exporting the Popup component
export default function Popup({ clickHandler }) {
  // State to manage form data
  const [formData, setFormData] = useState({
    utilisateur_id: "4",
    nom: "",
    type: "",
    titre: "",
    description: "",
  });

  // Function to handle form submission
  const handleSend = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/aide/signaler/", formData);
    } catch (err) {
      console.log(err);
    }
  };

  // State to manage form validation
  const [clicked, setClicked] = useState(false);

  // Function to validate name field using regex
  function rgxNom(data) {
    const regex = /^[a-zA-Z\s]{1,}$/;
    return regex.test(data);
  }

  // Function to check if form fields are empty
  function champVide(data) {
    if (!data || Object.keys(data).length === 0) {
      return true;
    }

    for (const key in data) {
      if (
        (!Object.prototype.hasOwnProperty.call(data, key) ||
          !data[key].trim()) &&
        key !== "titre"
      ) {
        return true;
      }
    }

    return false;
  }

  // Function to handle form input change
  function changeHandler(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  // Function to validate form data
  function validation(data) {
    if (champVide(data) || !rgxNom(data.nom)) {
      return false;
    }
    return true;
  }

  // Function to handle form submission button click
  function clickHandlerIN() {
    setClicked(true);
    if (validation(formData)) {
      console.log(formData);
      handleSend();
      clickHandler();
    }
  }

  // State to manage the opening and closing of the popup
  let isOpen = 1;
  const menuRef = useRef(null);

  // Effect hook to handle outside click event
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isOpen === 2
      ) {
        clickHandler();
      } else isOpen++;
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [clickHandler, isOpen]);

  // Rendering the component
  return (
    <div
      id="Pop-up"
      className="flex flex-col w-[550px] min-h-[545px] h-fit rounded-[5px] p-[30px] gap-[32px] shadow-xl items-end bg-pure_white"
      ref={menuRef}
    >
      <Titre text="Signaler un problème" icon={icon} clickHandler={clickHandler} />

      <form action="POST" className="w-full flex flex-col gap-4 items-end">
        <div className="w-full flex flex-col gap-[3px]">
          <label htmlFor="nom" className="px-[5px] font-bold">
            Nom <span className="text-error">*</span>
          </label>
          <div className="w-full p-[5px] border border-main_blue rounded-[12px]">
            <input
              type="text"
              name="nom"
              value={formData.nom}
              className="w-full px-[5px] outline-transparent my-[2px] placeholder:text-gris"
              placeholder="Entrez Votre Nom"
              onChange={changeHandler}
              onBlur={() => {
                rgxNom(formData.nom);
              }}
            />
          </div>
          {!rgxNom(formData.nom) && formData.nom !== "" && (
            <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
              Nom non valide
            </p>
          )}
          {formData.nom === "" && champVide(formData) && clicked && (
            <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
              Veuillez remplir ce champ
            </p>
          )}
        </div>

        <div className="w-full flex flex-col gap-[3px]">
          <label htmlFor="text" className="px-[5px] font-bold">
            Type De Problème <span className="text-error">*</span>
          </label>
          <div className="w-full p-[5px] border border-main_blue rounded-[12px] text-pure_black">
            <select
              type="text"
              name="type"
              value={formData.type}
              className="w-full px-[5px] outline-transparent my-[2px]"
              placeholder="Choisissez le type de problème"
              onChange={changeHandler}
            >
              <option value="" className="text-gris">
                Cliquez ici pour choisir le type
              </option>
              <option value="techeninque" className="text-gris">
                Techeninque
              </option>
              <option value="labo" className="text-gris">
                Labo
              </option>
            </select>
          </div>
          {formData.type === "" && champVide(formData) && clicked && (
            <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
              Veuillez remplir ce champ
            </p>
          )}
        </div>

        <div className="w-full flex flex-col gap-[3px]">
          <label htmlFor="text" className="px-[5px] font-bold">
            Titre
          </label>
          <div className="w-full p-[5px] border border-main_blue rounded-[12px]">
            <input
              type="text"
              name="titre"
              value={formData.titre}
              className="w-full px-[5px] outline-transparent my-[2px] placeholder:text-gris"
              placeholder="Entrez un intitulé"
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-[3px]">
          <label htmlFor="text" className="px-[5px] font-bold">
            Description <span className="text-error">*</span>
          </label>
          <div className="w-full p-[5px] border border-main_blue rounded-[12px]">
            <textarea
              type="text"
              name="description"
              value={formData.description}
              className="w-full px-[5px] outline-transparent my-[2px] placeholder:text-gris"
              placeholder="Entrez une description du problème"
              onChange={changeHandler}
            />
          </div>
          {formData.description === "" && champVide(formData) && clicked && (
            <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
              Veuillez remplir ce champ
            </p>
          )}
        </div>

        <Bouton
          text="Envoyer"
          color="bg-main_yellow"
          margin="0px"
          clickHandler={clickHandlerIN}
        />
      </form>
    </div>
  );
}
