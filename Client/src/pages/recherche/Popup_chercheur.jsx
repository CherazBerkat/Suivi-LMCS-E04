/* eslint-disable react/prop-types */
import icon from "../../assets/icons/cross-small.svg";
import Titre from "./Titre";
import Bouton2 from "./Bouton2";
import Bouton3 from "./Bouton3.";
import { useState, useEffect, useRef } from "react";
import "./Popup.css";

export default function Popup_chercheur({
  clickHandler,
  list_chercheur,
  list_qualite,
  list_diplome,
  list_equipe,
  list_statut,
  list_grad_e,
  list_grad_r,
  ArrayChercheurs,
}) {
  const [isAjoutClicked, setIsAjoutClicked] = useState(false);
  const [isClickSauv, setIsClickSauv] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    qualite: "",
    hindex: "",
    matricule: "",
    diplome: "",
    equipe: "",
    grade_ens: "",
    grade_rech: "",
    statut: "",
  });

  function changeHandler(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  } // info collecté dans le formData done
  function PushChercheur() {
    ArrayChercheurs.push(formData);
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
        data[key].trim() !== ""
      ) {
        return false;
      }
    }

    // If all values are empty or whitespace, return false
    return true;
  }
  function dataVoidArrayChercheurs(ArrayChercheurs) {
    if (ArrayChercheurs.length === 0) return true;
    return false;
  }

  function validationHindex(data) {
    if (data.hindex < 0 && data.hindex != "") return false;
    return true;
  }
  const regexMatricule = /^\d{7,8}$/;

  function validationMatricule(data) {
    if (data != "" && !regexMatricule.test(data)) return false;
    return true;
  }

  function Validation(data) {
    if (dataVoid(data)) return false;
    if (!validationHindex(data)) return false;
    if (!validationMatricule(data.matricule)) return false;
    return true;
  }

  function clickHandlerSauv() {
    if (Validation(formData)) {
      PushChercheur();
      setIsClickSauv(false);
      clickHandler();
    } else setIsClickSauv(true);
  }

  function resetForm() {
    if (Validation(formData)) {
      PushChercheur();
      setFormData({
        nom: "",
        qualite: "",
        hindex: "",
        diplome: "",
        equipe: "",
        grade_ens: "",
        grade_rech: "",
        statut: "",
        matricule: "",
      });
      setIsAjoutClicked(false);
    } else setIsAjoutClicked(true);
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

  // _______________________________________________________________________________________________________

  return (
    <div
      className=" flex flex-col w-[400px] h-fit  rounded-[5px] py-[16px] px-[32px] gap-[8px] shadow-xl items-end bg-pure_white"
      ref={menuRef}
    >
      <Titre text="Chercheur" icon={icon} clickHandler={clickHandler} />

      <form action="POST" className="w-full flex flex-col gap-1 items-end">
        <div className="w-full flex flex-col gap-[1px] ">
          <div
            className={`w-full p-[5px] ${((isAjoutClicked && dataVoidArrayChercheurs(ArrayChercheurs)) || isClickSauv) && dataVoid(formData) ? "border-b-error border-b-[1px]" : "border-b-[3px] border-b-gris_claire"} `}
          >
            <select
              type="text"
              value={formData.nom}
              name="nom"
              className="h-[30px] w-full outline-offset-[8px] px-[5px]  rounded-[0.1px] my-[2px]  text-[20px] font-normal "
              onChange={changeHandler}
            >
              <option className="font-bold ">Nom</option>
              {list_chercheur.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[3px]  ">
          <div
            className={`w-full p-[5px] ${(isAjoutClicked || isClickSauv) && dataVoid(formData) ? "border-b-error border-b-[1px]" : "border-b-[3px] border-b-gris_claire"} `}
          >
            <select
              type="text"
              value={formData.equipe}
              name="equipe"
              className="h-[30px] w-full px-[5px] outline-offset-[8px] rounded-[0.1px] my-[2px]  text-[20px] font-normal"
              onChange={changeHandler}
            >
              <option className=" font-bold">Equipe</option>
              {list_equipe.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>{" "}
          </div>
        </div>

        <div className="w-full flex flex-col gap-[3px]  ">
          <div
            className={`w-full p-[5px] ${(isAjoutClicked || isClickSauv) && dataVoid(formData) ? "border-b-error border-b-[1px]" : "border-b-[3px] border-b-gris_claire"} `}
          >
            <select
              type="text"
              name="qualite"
              value={formData.qualite}
              className="h-[30px] w-full px-[5px] outline-offset-[8px]  rounded-[0.1px] my-[2px] text-[18px] font-normal"
              onChange={changeHandler}
            >
              <option className=" font-bold ">Qualité</option>
              {list_qualite.map((option, index) => (
                <option value={option} className=" font-bold " key={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[3px]  ">
          <div
            className={`w-full p-[5px] ${(isAjoutClicked || isClickSauv) && dataVoid(formData) ? "border-b-error border-b-[1px]" : "border-b-[3px] border-b-gris_claire"} `}
          >
            <select
              type="text"
              name="diplome"
              value={formData.diplome}
              className="h-[30px] w-full px-[5px] outline-offset-[8px]  rounded-[0.1px] my-[2px]  text-[18px] font-normal"
              onChange={changeHandler}
            >
              <option className=" font-bold ">Diplome</option>
              {list_diplome.map((option, index) => (
                <option value={option} className="" key={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[3px]  ">
          <div
            className={`w-full p-[5px] ${(isAjoutClicked || isClickSauv) && dataVoid(formData) ? "border-b-error border-b-[1px]" : "border-b-[3px] border-b-gris_claire"} `}
          >
            <select
              type="text"
              name="statut"
              value={formData.statut}
              className="h-[30px] w-full px-[5px] outline-offset-[8px]  rounded-[0.1px] my-[2px]  text-[18px] font-normal"
              onChange={changeHandler}
            >
              <option className=" font-bold  ">Statut </option>
              {list_statut.map((option, index) => (
                <option value={option} className="" key={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[3px]  ">
          <div
            className={`w-full p-[5px] ${(isAjoutClicked || isClickSauv) && dataVoid(formData) ? "border-b-error border-b-[1px]" : "border-b-[3px] border-b-gris_claire"} `}
          >
            <select
              type="text"
              name="grade_ens"
              value={formData.grade_ens}
              className="h-[30px] w-full px-[5px] outline-offset-[8px]  rounded-[0.1px] my-[2px]  text-[18px] font-normal"
              onChange={changeHandler}
            >
              <option className="  font-bold ">Grade denseignement</option>
              {list_grad_e.map((option, index) => (
                <option value={option} className="" key={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[3px]  ">
          <div
            className={`w-full p-[5px] ${(isAjoutClicked || isClickSauv) && dataVoid(formData) ? "border-b-error border-b-[1px]" : "border-b-[3px] border-b-gris_claire"} `}
          >
            <select
              type="text"
              name="grade_rech"
              value={formData.grade_rech}
              className="h-[30px] w-full px-[5px] outline-offset-[8px]  rounded-[0.1px] my-[2px]  text-[18px] font-normal"
              onChange={changeHandler}
            >
              <option className="  font-bold ">Grade de recherche </option>
              {list_grad_r.map((option, index) => (
                <option value={option} className="" key={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[3px]  ">
          <div
            className={`w-full p-[5px] ${(isAjoutClicked || isClickSauv) && dataVoid(formData) ? "border-b-error border-b-[1px]" : "border-b-[3px] border-b-gris_claire"} `}
          >
            <input
              type="text"
              name="matricule"
              placeholder="Matricule"
              className="h-[30px] w-full px-[5px] outline-offset-[8px] placeholder:text-girs rounded-[0.1px] my-[2px] text-[18px] font-normal"
              value={formData.matricule}
              onChange={changeHandler}
            />
          </div>
        </div>
        {!validationMatricule(formData.matricule) &&
          formData.matricule != "" &&
          (isAjoutClicked || isClickSauv) && (
            <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
              Matricule non valide
            </p>
          )}

        <div className="w-full flex flex-col gap-[3px]  ">
          <div
            className={`w-full p-[5px] ${(isAjoutClicked || isClickSauv) && dataVoid(formData) ? "border-b-error border-b-[1px]" : "border-b-[3px] border-b-gris_claire"} `}
          >
            <input
              type="number"
              min="0"
              name="hindex"
              className="h-[30px] w-full px-[5px] outline-offset-[8px] placeholder:text-girs rounded-[0.1px] my-[2px]  text-[18px] font-normal"
              value={formData.hindex}
              placeholder="Hindex"
              onChange={changeHandler}
            />
          </div>
        </div>
        {formData.hindex < 0 &&
          formData.hindex !=
            ""(
              <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
                Hindex non valide, Hindex est un nombre réel positive
              </p>
            )}
        {(isAjoutClicked || isClickSauv) && dataVoid(formData) && (
          <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
            Veuillez remplir au moins un champ
          </p>
        )}
        <div className="flex flex-row justify-between w-full px-8px">
          <Bouton2
            text="Sauvgarder Filtre"
            color="bg-main_blue"
            margin="0px"
            strockcolor="border-none"
            clickHandler={clickHandlerSauv}
          />
          <Bouton3
            text="Ajouter chercheur"
            color="bg-main_yellow"
            margin="mr-[5px]"
            strockcolor="border-none"
            Push={resetForm}
          />
        </div>
      </form>
    </div>
  );
}
