/* eslint-disable react/prop-types */ // Désactivation des avertissements liés aux types des props

import Titre from "../../recherche/Titre"; // Import du composant Titre
import icon from "../../../assets/icons/cross-small.svg"; // Import de l'icône
import BoutonAjouter from "./BoutonAjouter"; // Import du composant BoutonAjouter
import React from "react"; // Import de React
import "../AjouterPublication/Ajouter.css"; // Import des styles CSS

// Composant PopUp
export default function PopUp({ ToggleHandler, setFormData }) {
  // Déclaration des états avec useState
  const [formDataList, setFormDataList] = React.useState({
    NomDeChercheur: "",
    Matricule: "",
    rang: "",
  });

  // Fonction pour gérer les changements dans le formulaire
  function changeHandler(event) {
    setFormDataList((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  let isOpen = 1; // Initialisation de la variable isOpen
  const menuRef = React.useRef(null); // Création d'une référence pour le menu

  // Effet pour gérer les clics en dehors du menu
  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isOpen == 2
      ) {
        ToggleHandler(); // Appel de la fonction ToggleHandler si isOpen est égal à 2
      } else isOpen++;
    };

    document.addEventListener("click", handleOutsideClick); // Ajout de l'écouteur d'événement

    return () => {
      document.removeEventListener("click", handleOutsideClick); // Suppression de l'écouteur d'événement
    };
  }, [ToggleHandler, isOpen]); // Dépendances de l'effet

  // Déclaration des états avec useState
  const [clicked, setClicked] = React.useState(false);

  // Fonction de validation du nom
  function rgxNom(data) {
    const regex = /^[a-zA-Z\s]{1,}$/; // Expression régulière pour vérifier le nom
    return regex.test(data);
  }

  // Fonction de validation du matricule
  function rgxMat(data) {
    const regexMatricule = /^\d{7,8}$/; // Expression régulière pour vérifier le matricule
    return regexMatricule.test(data);
  }

  // Fonction pour vérifier si les champs du formulaire sont remplis
  function dataFilled(data) {
    return data.NomDeChercheur != "" && data.rang != "" && data.Matricule != "";
  }

  // Fonction de validation globale
  function validation(data) {
    return (
      dataFilled(data) && rgxNom(data.NomDeChercheur) && rgxMat(data.Matricule)
    );
  }

  // Fonction gérant le clic sur le bouton Ajouter Membre
  function clickHandler() {
    if (validation(formDataList)) { // Vérification de la validité des données
      setFormData((prev) => {
        prev.ListChercheurs.push(formDataList); // Ajout des données au formulaire
        return prev;
      });
      ToggleHandler(); // Fermeture du pop-up
    } else {
      setClicked(true); // Affichage des messages d'erreur
    }
  }

  // Rendu JSX du composant
  return (
    <div className="w-full absolute items-center flex justify-center top-0 bg-bg_gris bg-opacity-60 w_full h-full">
      <div className="flex flex-col w-[400px] h-fit rounded-[5px] py-[16px] px-[32px] gap-[8px] shadow-xl items-end bg-pure_white" ref={menuRef}>
        <Titre text="Membre" icon={icon} clickHandler={ToggleHandler} /> {/* Titre du pop-up */}

        {/* Formulaire */}
        <form className="w-full flex flex-col gap-1 items-end">
          <div className="w-full flex flex-col gap-[3px]">
            {/* Champ Nom complet */}
            <div className="w-full p-[5px] border-b-gris_claire border-b-[3px]">
              <label htmlFor="NomDeChercheur">
                Nom Complet <span className="text-error text-bold text-[20px]">*</span>:
              </label>
              <input
                type="text"
                name="NomDeChercheur"
                value={formDataList.NomDeChercheur}
                className="h-[30px] w-full px-[5px] outline-offset-[8px] rounded-[0.1px] my-[2px] text-[18px] font-light"
                onChange={changeHandler}
                onFocus={() => setClicked(false)}
              />
              {/* Affichage des erreurs */}
              {!rgxNom(formDataList.NomDeChercheur) && formDataList.NomDeChercheur != "" && clicked && (
                <p className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}>
                  Nom non valide
                </p>
              )}
              {formDataList.NomDeChercheur == "" && clicked && (
                <p className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}>
                  Veuillez remplir ce champ.
                </p>
              )}
            </div>
            {/* Champ Matricule */}
            <div className="w-full p-[5px] border-b-gris_claire border-b-[3px]">
              <label htmlFor="Matricule">
                Matricule <span className="text-error text-bold text-[20px]">*</span>:
              </label>
              <input
                type="text"
                name="Matricule"
                value={formDataList.Matricule}
                className="h-[30px] w-full px-[5px] outline-offset-[8px] rounded-[0.1px] my-[2px] text-[18px] font-light"
                onChange={changeHandler}
                onFocus={() => setClicked(false)}
              />
              {/* Affichage des erreurs */}
              {!rgxMat(formDataList.Matricule) && formDataList.Matricule != "" && clicked && (
                <p className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}>
                  Matricule non valide
                </p>
              )}
              {formDataList.Matricule == "" && clicked && (
                <p className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}>
                  Veuillez remplir ce champ.
                </p>
              )}
            </div>
            {/* Champ Rang */}
            <div className="w-full p-[5px] border-b-gris_claire border-b-[3px]">
              <label htmlFor="rang">
                Rang <span className="text-error text-bold text-[20px]">*</span>:
              </label>
              <input
                name="rang"
                className="h-[30px] w-full px-[5px] outline-offset-[8px] rounded-[0.1px] my-[2px] text-[18px] font-light outline-none"
                onChange={changeHandler}
                value={formDataList.rang}
                onFocus={() => setClicked(false)}
                type="number"
                min={1}
                max={formDataList.length}
              />
              {/* Affichage des erreurs */}
              {formDataList.rang != "" && clicked && formDataList.rang < 1 && (
                <p className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}>
                  Rang non valide, le rang ne peut pas être inférieur à 1.
                </p>
              )}
              {formDataList.rang != "" && clicked && formDataList.rang > formDataList.length && (
                <p className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}>
                  Rang non valide, veuillez entrer les auteurs dans l'ordre.
                </p>
              )}
              {formDataList.rang == "" && clicked && (
                <p className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}>
                  Veuillez remplir ce champ.
                </p>
              )}
            </div>
          </div>
          {/* Bouton Ajouter Membre */}
          <BoutonAjouter clickHandler={clickHandler} text="Ajouter Membre" />
        </form>
      </div>
    </div>
  );
}
