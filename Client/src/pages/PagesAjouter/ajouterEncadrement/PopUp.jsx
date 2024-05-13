/* eslint-disable react/prop-types */ // Désactivation des avertissements de propTypes pour ce composant

import Titre from "../../recherche/Titre"; // Importation du composant Titre
import icon from "../../../assets/icons/cross-small.svg"; // Importation de l'icône
import BoutonAjouter from "./BoutonAjouter"; // Importation du composant BoutonAjouter
import React from "react"; // Importation de React
import "../AjouterPublication/Ajouter.css"; // Importation des styles

// Composant PopUp utilisé pour afficher une boîte de dialogue pour ajouter un étudiant
export default function PopUp({ ToggleHandler, setFormData }) {
  const [formDataList1, setFormDataList1] = React.useState(""); // État local pour stocker le nom de l'étudiant

  // Fonction de gestion du changement dans le champ de saisie du nom de l'étudiant
  function changeHandler1(event) {
    setFormDataList1(event.target.value); // Mise à jour de l'état avec la nouvelle valeur saisie
  }

  let isOpen = 1; // Initialisation du compteur de clicks
  const menuRef = React.useRef(null); // Référence pour la boîte de dialogue

  // Effet secondaire pour détecter les clics en dehors de la boîte de dialogue et fermer celle-ci
  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isOpen == 2
      ) {
        ToggleHandler(); // Appel de la fonction pour fermer la boîte de dialogue
      } else isOpen++; // Incrémentation du compteur de clics
    };

    document.addEventListener("click", handleOutsideClick); // Écoute des clics sur le document

    return () => {
      document.removeEventListener("click", handleOutsideClick); // Désabonnement de l'écoute des clics lors du démontage du composant
    };
  }, [ToggleHandler, isOpen]); // Déclenchement de l'effet secondaire lors du changement de ToggleHandler ou isOpen

  const [clicked, setClicked] = React.useState(false); // État local pour gérer si le bouton a été cliqué ou non

  // Fonction de validation du nom de l'étudiant
  function rgxNom(data) {
    const regex = /^[a-zA-Z\s]{1,}$/; // Expression régulière pour vérifier le format du nom
    return regex.test(data); // Vérification du format du nom
  }

  // Fonction de gestion du clic sur le bouton pour ajouter l'étudiant
  function clickHandler1() {
    if (formDataList1 != "" && rgxNom(formDataList1)) { // Vérification si le nom est non vide et valide
      setFormData((prev) => {
        prev.etudiants.push(formDataList1); // Ajout du nom de l'étudiant à la liste des étudiants
        return prev; // Retour de l'état mis à jour
      });
      ToggleHandler(); // Fermeture de la boîte de dialogue
    } else {
      setClicked(true); // Activation de l'état de clic
    }
  }

  return (
    <div className="  w-full absolute items-center flex justify-center top-0 bg-bg_gris bg-opacity-60 w_full h-full">
      <div
        className=" flex flex-col w-[400px] h-fit   rounded-[5px] py-[16px] px-[32px] gap-[8px] shadow-xl items-end bg-pure_white"
        ref={menuRef} // Attribution de la référence pour la boîte de dialogue
      >
        <Titre text="Etudiant" icon={icon} clickHandler={ToggleHandler} /> {/* Affichage du titre de la boîte de dialogue */}

        <form className="w-full flex flex-col gap-1 items-end ">
          <div className="w-full flex flex-col gap-[3px]  ">
            <div className="w-full p-[5px]  border-b-gris_claire border-b-[3px] ">
              <label htmlFor="nom">
                Nom Complet {/* Affichage de l'intitulé du champ */}
                <span className="text-error text-bold text-[20px]">*</span>:
              </label>
              <input
                type="text"
                name="nom"
                className="h-[30px] w-full px-[5px] outline-offset-[8px] rounded-[0.1px] my-[2px] text-[18px] font-light"
                value={formDataList1}
                onChange={changeHandler1} // Gestionnaire de changement de saisie
                onFocus={() => setClicked(false)} // Gestionnaire de focus
              />
            </div>
            {/* Affichage des messages d'erreur si le nom est invalide ou manquant */}
            {!rgxNom(formDataList1) && formDataList1 != "" && clicked && (
              <p
                className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}
              >
                Nom non valide
              </p>
            )}
            {formDataList1 == "" && clicked && (
              <p
                className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}
              >
                Veuillez remplire ce champ.
              </p>
            )}
          </div>

          <BoutonAjouter clickHandler={clickHandler1} text="Ajouter Etudiant" /> {/* Affichage du bouton pour ajouter l'étudiant */}
        </form>
      </div>
    </div>
  );
}
