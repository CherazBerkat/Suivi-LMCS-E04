import React from "react";
import BoutonAjouter from "./BoutonAjouter";
import ListeEtudiants from "./ListeEtudiants";
import ListeChercheurs from "./ListeChercheurs";
import PopUp from "./PopUp";
import "../AjouterPublication/Ajouter.css";
import PopUpChercheur from "./PopUpChercheur";
import axios from "axios";
export default function Content() {
  const [PopUpToggle1, setPopUpToggle1] = React.useState(false);
  const [PopUpToggle2, setPopUpToggle2] = React.useState(false);

  let [formData, setFormData] = React.useState({
    encad_id: "",
    titre: "",
    type: "",
    Annee_debut: "",
    annee_fin: "",
    etudiants: [],
    encadreurs: [],
  });

  function ToggleHandler1() {
    setPopUpToggle1(!PopUpToggle1);
  }
  function ToggleHandler2() {
    setPopUpToggle2(!PopUpToggle2);
  }
  function changeHandler(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }
  function clickHandler() {} 
  const [clicked, setClicked] = React.useState(false);
  function dataFilled(data) {
    return (
      data.titre != "" &&
      data.encad_id != "" &&
      data.Annee_debut != "" &&
      data.annee_fin != "" &&
      data.encadreurs.length != 0 &&
      data.etudiants.length != 0
    );
  }
  function rgxDom(data) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(data);
  }

  function rgxtitre(data) {
    const regex = /^[\w\s\-\\.]*$/;
    return regex.test(data);
  }

  function rgxencad_id(data) {
    const regex = /^[A-Z0-9._\\-]*$/;
    return regex.test(data);
  }
  const [validate, setValidate] = React.useState(false);
  function validation(data) {
    return (
      dataFilled(data) &&
      rgxtitre(data.titre) &&
      rgxencad_id(data.encad_id) &&
      (data.type == "" || rgxDom(data.type)) &&
      data.annee_fin >= data.Annee_debut &&
      data.Annee_debut >= 1999 &&
      data.Annee_debut <= new Date().getFullYear &&
      data.annee_fin >= 1999
    );
  }
  function sendInfo() {
    if (validation(formData)) {
      setValidate(true);
      console.log(validate);
      axios
        .post("http://127.0.0.1:8000/maj/AjouterEncadrement/", formData)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
      console.log(formData);
    } else {
      setClicked(true);
    }
  }

  return (
    <div className="bg-bg-yellow h-full w-full relative ">
      <form action="" className="flex flex-col items-center p-8 pt-[32px]">
        <div className="flex flex-row  gap-[16px] px-8 " id="div-principale">
          <div className=" flex flex-col gap-3" id="col1">
            <div className="flex flex-col">
              <label htmlFor="titre">
                Titre<span className="text-error text-bold text-[20px]">*</span>
              </label>
              <input
                id="titre"
                className=" bg-[#DDE7F0] w-[1057px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                value={formData.titre}
                name="titre"
                type="text"
                required
                onChange={changeHandler}
                onFocus={() => {
                  setClicked(false);
                  setValidate(false);
                }}
              />
              {formData.titre != "" && clicked && !rgxtitre(formData.titre) && (
                <p className={`text-[12px] p-[2px] text-error`}>
                  Titre non valide.
                </p>
              )}

              {formData.titre == "" && clicked && (
                <p className={`text-[12px] p-[2px] text-error`}>
                  Veuillez remplir ce champ.
                </p>
              )}
            </div>

            <div className="flex flex-row gap-[16px]" id="row1">
              <div className="flex flex-col">
                <label htmlFor="encad_id">
                  Code
                  <span className="text-error text-bold text-[20px]">*</span>
                </label>
                <input
                  id="encad_id"
                  className="bg-[#DDE7F0] w-[524px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                  value={formData.encad_id}
                  name="encad_id"
                  type="text"
                  required
                  onChange={changeHandler}
                  onFocus={() => {
                    setClicked(false);
                    setValidate(false);
                  }}
                />
                {formData.encad_id == "" && clicked && (
                  <p className={`text-[12px] p-[2px] text-error`}>
                    Veuillez remplir ce champ.
                  </p>
                )}
                {formData.encad_id != "" &&
                  clicked &&
                  !rgxencad_id(formData.encad_id) && (
                    <p className={`text-[12px] p-[2px] text-error`}>
                      Code non valide.
                    </p>
                  )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="type" className="h-[30px]">
                  Type
                </label>
                <input
                  id="type"
                  className="bg-[#DDE7F0] w-[524px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                  value={formData.type}
                  name="type"
                  type="text"
                  required
                  onChange={changeHandler}
                />
                {formData.type != "" && clicked && !rgxDom(formData.type) && (
                  <p className={`text-[12px] p-[2px] text-error`}>
                    Type non valide.
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-row gap-[16px]" id="row1">
              <div className="flex flex-col">
                <label htmlFor="Annee_debut">
                  Année De Début
                  <span className="text-error text-bold text-[20px]">*</span>
                </label>
                <input
                  id="Annee_debut"
                  className="bg-[#DDE7F0] w-[524px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                  value={formData.Annee_debut}
                  name="Annee_debut"
                  type="number"
                  min={1999}
                  max={new Date().getFullYear()}
                  required
                  onChange={changeHandler}
                  onFocus={() => {
                    setClicked(false);
                    setValidate(false);
                  }}
                />
                {formData.Annee_debut != "" &&
                  (formData.Annee_debut < 1999 ||
                    formData.Annee_debut > new Date().getFullYear) &&
                  clicked && (
                    <p className={`text-[12px] p-[2px] text-error`}>
                      Veuillez entrer une année depuis 1999 jusqu&apos;à
                      l&apos;année en cours.
                    </p>
                  )}
                {formData.Annee_debut == "" && clicked && (
                  <p className={`text-[12px] p-[2px] text-error`}>
                    Veuillez remplir ce champ.
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="annee_fin">
                  Année De Fin Prévisionnelle
                  <span className="text-error text-bold text-[20px]">*</span>
                </label>
                <input
                  id="annee_fin"
                  className="bg-[#DDE7F0] w-[524px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                  value={formData.annee_fin}
                  name="annee_fin"
                  type="number"
                  min={1999}
                  max={new Date().getFullYear()}
                  required
                  onChange={changeHandler}
                  onFocus={() => {
                    setClicked(false);
                    setValidate(false);
                  }}
                />
                {formData.annee_fin != "" &&
                  formData.annee_fin < 1999 &&
                  clicked && (
                    <p className={`text-[12px] p-[2px] text-error`}>
                      Veuillez entrer une année depuis 1999 jusqu&apos;à
                      l&apos;année en cours.
                    </p>
                  )}
                {formData.annee_fin == "" && clicked && (
                  <p className={`text-[12px] p-[2px] text-error`}>
                    Veuillez remplir ce champ.
                  </p>
                )}
                {formData.dateDeDebut != "" &&
                  formData.annee_fin != "" &&
                  formData.dateDeDebut >= 1999 &&
                  formData.dateDeDebut <= new Date().getFullYear &&
                  formData.annee_fin >= 1999 &&
                  formData.annee_fin <= new Date().getFullYear &&
                  clicked &&
                  formData.annee_fin < formData.dateDeDebut && (
                    <p className={`text-[12px] p-[2px] text-error`}>
                      Veuillez entrer une année de fin superieur à l&apos;année
                      de début
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="flex flex-col pl-[128px] " id="Redacteurs">
        <label>
          Les Etudiants:
          <span className="text-error text-bold text-[20px]">*</span>
        </label>
        <BoutonAjouter
          clickHandler={clickHandler}
          ToggleHandler={ToggleHandler1}
          text="Ajouter Etudiant"
        />
        {formData.etudiants.length == 0 && clicked && (
          <p className={`text-[12px] p-[2px] text-error`}>
            Veuillez ajouter au moins un Etudiant.
          </p>
        )}
      </div>
      <div className="flex flex-col  mx-[128px] my-[8px]">
        <ListeEtudiants listEtudiants={formData.etudiants} />
      </div>
      <div className="flex flex-col pl-[128px] " id="Redacteurs">
        <label>
          Les Encadreurs
          <span className="text-error text-bold text-[20px]">*</span>
        </label>
        <BoutonAjouter
          clickHandler={clickHandler}
          ToggleHandler={ToggleHandler2}
          text="Ajouter Encadreur"
        />
        {formData.encadreurs.length == 0 && clicked && (
          <p className={`text-[12px] p-[2px] text-error`}>
            Veuillez ajouter au moins un Encadrant.
          </p>
        )}
      </div>

      <div className="flex flex-col  mx-[128px] my-[8px]">
        <ListeChercheurs ListMembres={formData.encadreurs} />
      </div>

      {PopUpToggle1 && (
        <PopUp ToggleHandler={ToggleHandler1} setFormData={setFormData} />
      )}
      {PopUpToggle2 && (
        <PopUpChercheur
          ToggleHandler={ToggleHandler2}
          setFormData={setFormData}
        />
      )}
      {validate && (
        <p className="w-full text-center text-[18px] p-[2px] text-success">
          Projet ajouté avec seccuss
        </p>
      )}

      <div
        className="w-full relative"
        onClick={() => {
          sendInfo();
        }}
      >
        <button
          id="my-button"
          type="button"
          className=" right-0 absolute bg-main_yellow mr-16  border-none h-[50px] reounded-[4px]  px-[16px] w-[225px]  ${color}   shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-hover_yellow hover:scale-[1.02] hover:duration-300 active:scale-95 active:duration-300"
        >
          Sauvgarder
        </button>
      </div>
    </div>
  );
}
