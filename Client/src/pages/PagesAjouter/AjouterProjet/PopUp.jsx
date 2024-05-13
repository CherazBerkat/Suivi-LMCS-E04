// Composant PopUp utilisé pour ajouter un nouveau membre

import Titre from "../../recherche/Titre"; // Import du composant Titre
import icon from "../../../assets/icons/cross-small.svg"; // Import de l'icône
import BoutonAjouter from "./BoutonAjouter"; // Import du composant BoutonAjouter
import React from "react"; // Import de React
import "../AjouterPublication/Ajouter.css"; // Import des styles CSS

export default function PopUp({ ToggleHandler, setFormData }) {
  const [formDataList, setFormDataList] = React.useState({
    NomDeChercheur: "", // Nom du chercheur
    Matricule: "", // Matricule du chercheur
    RoleDeChercheur: "", // Rôle du chercheur
  });

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

  const [clicked, setClicked] = React.useState(false);

  // Fonction pour vérifier si le nom est valide
  function rgxNom(data) {
    const regex = /^[a-zA-Z\s]{1,}$/;
    return regex.test(data);
  }

  // Fonction pour vérifier si le matricule est valide
  function rgxMat(data) {
    const regexMatricule = /^\d{7,8}$/;
    return regexMatricule.test(data);
  }

  // Fonction pour vérifier si les champs sont remplis
  function dataFilled(data) {
    return (
      data.NomDeChercheur != "" &&
      data.RoleDeChercheur != "" &&
      data.Matricule != ""
    );
  }

  // Fonction pour valider les données saisies
  function validation(data) {
    return (
      dataFilled(data) && rgxNom(data.NomDeChercheur) && rgxMat(data.Matricule)
    );
  }

  // Fonction pour gérer le clic sur le bouton Ajouter
  function clickHandler() {
    if (validation(formDataList)) {
      setFormData((prev) => {
        prev.ListeMembres.push(formDataList);
        return prev;
      });
      ToggleHandler();
    } else {
      setClicked(true);
    }
  }

  return (
    <div className=" w-full absolute items-center flex justify-center top-0 bg-bg_gris bg-opacity-60 w_full h-full">
      <div
        className=" flex flex-col w-[400px] h-fit rounded-[5px] py-[16px] px-[32px] gap-[8px] shadow-xl items-end bg-pure_white"
        ref={menuRef}
      >
        <Titre text="Membre" icon={icon} clickHandler={ToggleHandler} />

        <form className="w-full flex flex-col gap-1 items-end ">
          <div className="w-full flex flex-col gap-[3px]  ">
            <div className="w-full p-[5px] border-b-gris_claire border-b-[3px] ">
              <label htmlFor="NomDeChercheur">
                Nom Complet{" "}
                <span className="text-error text-bold text-[20px]">*</span>:
              </label>
              <input
                type="text"
                name="NomDeChercheur"
                value={formDataList.NomDeChercheur}
                className="h-[30px] w-full px-[5px] outline-offset-[8px] rounded-[0.1px] my-[2px] text-[18px] font-light"
                onChange={changeHandler}
                onFocus={() => setClicked(false)}
              />
            </div>
            {!rgxNom(formDataList.NomDeChercheur) &&
              formDataList.NomDeChercheur != "" &&
              clicked && (
                <p
                  className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}
                >
                  Nom non valide
                </p>
              )}
            {formDataList.NomDeChercheur == "" && clicked && (
              <p
                className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}
              >
                Veuillez remplire ce champ.
              </p>
            )}
          </div>
          <div className="w-full flex flex-col gap-[3px]  ">
            <div className="w-full p-[5px] border-b-gris_claire border-b-[3px] ">
              <label htmlFor="Matricule">
                Matricule
                <span className="text-error text-bold text-[20px]">*</span>:
              </label>
              <input
                type="text"
                name="Matricule"
                value={formDataList.Matricule}
                className="h-[30px] w-full px-[5px] outline-offset-[8px] rounded-[0.1px] my-[2px] text-[18px] font-light"
                onChange={changeHandler}
                onFocus={() => setClicked(false)}
              />
            </div>
            {!rgxMat(formDataList.Matricule) &&
              formDataList.Matricule != "" &&
              clicked && (
                <p
                  className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}
                >
                  Matricule non valide
                </p>
              )}
            {formDataList.Matricule == "" && clicked && (
              <p
                className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}
              >
                Veuillez remplire ce champ.
              </p>
            )}
          </div>

          <div className="w-full flex flex-col gap-[3px]">
            <div className="w-full p-[5px] border-b-gris_claire border-b-[3px]">
              <label htmlFor="RoleDeChercheur">
                Role <span className="text-error text-bold text-[20px]">*</span>
                :
              </label>

              <select
                name="RoleDeChercheur"
                className="h-[30px] w-full px-[5px] outline-offset-[8px]  rounded-[0.1px] my-[2px] text-[18px] font-light outline-none"
                onChange={changeHandler}
                value={formDataList.RoleDeChercheur}
                onFocus={() => setClicked(false)}
              >
                <option value="">Choisissez le Role</option>
                <option value="Chef">Chef</option>
                <option value="Membre">Membre</option>
              </select>
            </div>
            {formDataList.RoleDeChercheur == "" && clicked && (
              <p
                className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}
              >
                Veuillez remplire ce champ.
              </p>
            )}
          </div>

          <BoutonAjouter clickHandler={clickHandler} text="Ajouter Membre" />
        </form>
      </div>
    </div>
  );
}
