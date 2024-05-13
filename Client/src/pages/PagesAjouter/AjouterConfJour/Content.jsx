import React from "react";
import BoutonAjouter from "./BoutonAjouter";
import LesChercheurs from "./LesChercheurs";
import PopUp from "./PopUp";
import "../AjouterPublication/Ajouter.css"; // Import du fichier de style CSS
import axios from "axios";

export default function Content() {
  // State pour gérer l'état du PopUp
  const [PopUpToggle, setPopUpToggle] = React.useState(false);

  // State pour stocker les données du formulaire
  let [formData, setFormData] = React.useState({
    nom: "",
    lien: "",
    acronyme: "",
    Maison_Edition: "",
    type: "",
    periodicite: "",
    listClassement: [],
  });

  // Fonction pour basculer l'état du PopUp
  function ToggleHandler() {
    setPopUpToggle(!PopUpToggle);
  }

  // Fonction pour mettre à jour les données du formulaire lors de la saisie de l'utilisateur
  function changeHandler(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function clickHandler() {} // Cette fonction est définie mais pas utilisée, donc je la laisse telle quelle

  const periodicite = [
    "Annuelle",
    "Biennale",
    "Mensuelle",
    "Trimestrielle",
    "Semestrielle",
  ];
  // les fonctions de validation
  function rgxNom(data) {
    const regex = /^[a-zA-Z\s]{1,}$/;
    return regex.test(data);
  }
  function rgxLien(data) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(data);
  }
  function rgxMaison(data) {
    const regex = /^[a-zA-Z0-9\s\-&',.()]+$/;
    return regex.test(data);
  }
  function validateAcronym(acronym) {
    const acronymRegex = /^[A-Z0-9]+$/;
    return acronymRegex.test(acronym);
  }
  const [clicked, setClicked] = React.useState(false);

  function dataFilled(data) {
    return data.nom != "" && data.acronyme != "" && data.type != "";
  }
  function validation(data) {
    return (
      rgxNom(data.nom) &&
      dataFilled(data) &&
      validateAcronym(data.acronyme) &&
      (data.lien == "" || rgxLien(data.lien)) &&
      (data.Maison_Edition == "" || rgxMaison(data.Maison_Edition))
    );
  }
  const [validate, setValidate] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  function sendInfo() {
    if (validation(formData)) {
      axios
        .post("http://127.0.0.1:8000/maj/AjouterConfJouranl/", formData)
        .then((response) => {
          if (
            response.data.message == "Venue with given Acronyme already exists"
          )
            setMessage(true);
          else {
            setMessage(false);
            setValidate(true);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setClicked(true);
    }
  }
  return (
    <div className="bg-bg-yellow h-full w-full relative ">
      <form action="" className="flex flex-col items-center p-8 pt-[32px]">
        <div className="flex flex-row gap-[16px] px-8 " id="div-principale">
          <div className=" flex flex-col gap-3" id="col1">
            <div className="flex flex-col">
              <label htmlFor="Nom">
                Nom<span className="text-error text-bold text-[20px]">*</span>
              </label>
              <input
                id="Nom"
                className=" bg-[#DDE7F0] w-[1057px] text-[20px] text-pure_black h-[50px] px-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                value={formData.nom}
                name="nom"
                type="text"
                required
                onChange={changeHandler}
                onFocus={() => {
                  setClicked(false);
                  setValidate(false);
                }}
              />
              {!rgxNom(formData.nom) && formData.nom != "" && clicked && (
                <p
                  className={`text-[12px] p-[2px] text-error w-full text-start`}
                >
                  Nom non valide
                </p>
              )}
              {formData.nom == "" && clicked && (
                <p
                  className={`text-[12px] p-[2px] text-error w-full text-start`}
                >
                  Veuillez remplir ce champ
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="Lien">Lien</label>
              <input
                id="Lien"
                className=" bg-[#DDE7F0] w-[1057px] text-[20px] text-pure_black h-[50px] px-5 border-[#3D80B3] border-[2px] rounded-[5px]"
                value={formData.lien}
                name="lien"
                type="text"
                required
                onChange={changeHandler}
                onFocus={() => {
                  setClicked(false);
                  setValidate(false);
                }}
              />
              {!rgxLien(formData.lien) && formData.lien != "" && clicked && (
                <p
                  className={`text-[12px] p-[2px] text-error w-full text-start`}
                >
                  Lien non valide
                </p>
              )}
            </div>

            <div className="flex flex-row gap-[16px]" id="row1">
              <div className="flex flex-col">
                <label htmlFor="acronyme">
                  Acronyme
                  <span className="text-error text-bold text-[20px]">*</span>
                </label>
                <input
                  id="acronyme"
                  className="bg-[#DDE7F0] w-[524px] text-[20px] text-pure_black h-[50px] px-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                  value={formData.acronyme}
                  name="acronyme"
                  type="text"
                  required
                  onChange={changeHandler}
                  onFocus={() => {
                    setClicked(false);
                    setValidate(false);
                  }}
                />
                {!validateAcronym(formData.acronyme) &&
                  formData.acronyme != "" &&
                  clicked && (
                    <p
                      className={`text-[12px] p-[2px] text-error w-full text-start`}
                    >
                      Acronyme non valide
                    </p>
                  )}
                {formData.acronyme == "" && clicked && (
                  <p
                    className={`text-[12px] p-[2px] text-error w-full text-start`}
                  >
                    Veuillez remplir ce champ
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="Maison_Edition" className="h-[30px]">
                  Maison d&apos;Edition
                </label>
                <input
                  id="Maison_Edition"
                  className="bg-[#DDE7F0] w-[524px] text-[20px] text-pure_black h-[50px] px-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                  value={formData.Maison_Edition}
                  name="Maison_Edition"
                  type="text"
                  required
                  onChange={changeHandler}
                  onFocus={() => {
                    setClicked(false);
                    setValidate(false);
                  }}
                />
                {!rgxMaison(formData.Maison_Edition) &&
                  formData.Maison_Edition != "" &&
                  clicked && (
                    <p
                      className={`text-[12px] p-[2px] text-error w-full text-start`}
                    >
                      Maison d&apos;edition non valide
                    </p>
                  )}
              </div>
            </div>

            <div className="flex flex-row gap-[16px]" id="row1">
              <div className="flex flex-col">
                <label htmlFor="type">
                  Type
                  <span className="text-error text-bold text-[20px]">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  className="bg-[#DDE7F0] w-[524px] text-[20px] text-pure_black h-[50px] px-5 border-[#3D80B3] border-[2px] rounded-[5px]"
                  onChange={changeHandler}
                  onFocus={() => {
                    setClicked(false);
                    setValidate(false);
                  }}
                >
                  <option className="font-normal text-gris">
                    Choisissez le type
                  </option>
                  <option value="Conference">Conference</option>
                  <option value="Journal">Journal</option>
                </select>

                {formData.type == "" && clicked && (
                  <p className={`text-[12px] p-[2px] text-error`}>
                    Veuillez remplir ce champ
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="periodicite" className="h-[30px]">
                  Peiodicité
                </label>
                <select
                  type="text"
                  name="periodicite"
                  id="periodicite"
                  value={formData.periodicite}
                  className="bg-[#DDE7F0] w-[524px] text-[20px] text-pure_black h-[50px] px-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                  onChange={changeHandler}
                  onFocus={() => {
                    setClicked(false);
                    setValidate(false);
                  }}
                >
                  <option className=" text-gris ">Periodicité</option>
                  {periodicite.map((option, index) => (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="flex flex-col pl-[128px] " id="Redacteurs">
        <label>Classements</label>
        <BoutonAjouter
          clickHandler={clickHandler}
          ToggleHandler={ToggleHandler}
          text="Ajouter Classement"
        />
      </div>

      {PopUpToggle && (
        <PopUp ToggleHandler={ToggleHandler} setFormData={setFormData} />
      )}

      <div className="flex flex-col  mx-[128px] my-[16px]">
        <LesChercheurs listClassement={formData.listClassement} />
      </div>

      {validate && (
        <p className="w-full text-center text-[18px] p-[2px] text-success">
          {formData.type} ajouté avec seccuss
        </p>
      )}
      {message && (
        <p className="w-full text-center text-[18px] p-[2px] text-gris">
          {formData.type} avec ce Acronyme existe déjà
        </p>
      )}
      <div className="w-full relative">
        <button
          id="my-button"
          type="button"
          className=" right-0 absolute bg-main_yellow mr-16  border-none h-[50px] reounded-[4px]  px-[16px] w-[225px]  ${color}   shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-hover_yellow hover:scale-[1.02] hover:duration-300  active:scale-95 active:duration-300"
          onClick={() => {
            sendInfo();
          }}
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
}
