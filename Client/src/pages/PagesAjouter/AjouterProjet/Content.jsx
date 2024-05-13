/* eslint-disable no-unused-vars */
import React from "react";
import BoutonAjouter from "./BoutonAjouter";
import LesChercheurs from "./LesChercheurs";
import PopUp from "./PopUp";
import "../AjouterPublication/Ajouter.css";
import axios from "axios";
export default function Content() {
  function clickHandler () {}
  const [PopUpToggle, setPopUpToggle] = React.useState(false);

  let [formData, setFormData] = React.useState({
    intitule: "",
    domaine: "",
    code: "",
    dateDeDebut: "",
    DateDeFin: "",
    ListeMembres: [],
  });

  const handleSend = async () => {
    console.log("in send handler");
    try {
      await axios.post("http://127.0.0.1:8000/maj/AjouterProjet/", formData);
    } catch (err) {
      console.log(err);
    }
  };

  function ToggleHandler() {
    setPopUpToggle(!PopUpToggle);
  }

  function changeHandler(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }
  const [clicked, setClicked] = React.useState(false);
  function dataFilled(data) {
    return (
      data.intitule != "" &&
      data.code != "" &&
      data.dateDeDebut != "" &&
      data.DateDeFin != "" &&
      data.ListeMembres.length != 0
    );
  }
  function rgxDom(data) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(data);
  }

  function rgxIntitule(data) {
    const regex = /^[\w\s\-\\.]*$/;
    return regex.test(data);
  }

  function rgxCode(data) {
    const regex = /^[A-Z0-9._\\-]*$/;
    return regex.test(data);
  }
  const [validate, setValidate] = React.useState(false);
  function validation(data) {
    return (
      dataFilled(data) &&
      rgxIntitule(data.intitule) &&
      rgxCode(data.code) &&
      (data.domaine == "" || rgxDom(data.domaine)) &&
      new Date(data.DateDeFin) >= new Date(data.dateDeDebut) &&
      new Date(data.dateDeDebut) >= new Date("01/01/1999") &&
      new Date(data.dateDeDebut) <= new Date() &&
      new Date(data.DateDeFin) >= new Date("01/01/1999") &&
      new Date(data.DateDeFin) <= new Date()
    );
  }
  const [message, setMessage] = React.useState(false);

  function sendInfo() {
    if (validation(formData)) {
      setValidate(true);
      handleSend();
    } else {
      setClicked(true);
    }
  }
  return (
    <div className="bg-bg-yellow h-full w-full relative ">
      <form className="flex flex-col items-center p-8 pt-[32px]">
        <div className="flex flex-row gap-[16px] px-8 " id="div-principale">
          <div className=" flex flex-col gap-3 " id="col1">
            <div className="flex flex-row gap-[16px]" id="row1">
              <div className="flex flex-col">
                <label htmlFor="intitule">
                  Intitulé
                  <span className="text-error text-bold text-[20px]">*</span>
                </label>
                <input
                  id="intitule"
                  className=" bg-[#DDE7F0] w-[1065px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                  value={formData.intitule}
                  name="intitule"
                  type="text"
                  required
                  onChange={changeHandler}
                  onFocus={() => setClicked(false)}
                />
                {formData.intitule != "" &&
                  clicked &&
                  !rgxIntitule(formData.intitule) && (
                    <p className={`text-[12px] p-[2px] text-error`}>
                      Intitulé non valide.
                    </p>
                  )}

                {formData.intitule == "" && clicked && (
                  <p className={`text-[12px] p-[2px] text-error`}>
                    Veuillez remplir ce champ.
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-row gap-[16px]" id="row1">
              <div className="flex flex-col">
                <label htmlFor="domaine">Domaine </label>
                <input
                  id="domaine"
                  className="bg-[#DDE7F0] w-[524px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                  value={formData.domaine}
                  name="domaine"
                  type="text"
                  onChange={changeHandler}
                  onFocus={() => {
                    setClicked(false);
                    setValidate(false);
                  }}
                />
                {formData.domaine != "" &&
                  clicked &&
                  !rgxDom(formData.domaine) && (
                    <p className={`text-[12px] p-[2px] text-error`}>
                      Domaine non valide.
                    </p>
                  )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="code">
                  Code
                  <span className="text-error text-bold text-[20px]">*</span>
                </label>
                <input
                  id="code"
                  className="bg-[#DDE7F0] w-[524px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                  value={formData.code}
                  name="code"
                  type="text"
                  required
                  onChange={changeHandler}
                  onFocus={() => {
                    setClicked(false);
                    setValidate(false);
                  }}
                />
                {formData.code == "" && clicked && (
                  <p className={`text-[12px] p-[2px] text-error`}>
                    Veuillez remplir ce champ.
                  </p>
                )}
                {formData.code != "" && clicked && !rgxCode(formData.code) && (
                  <p className={`text-[12px] p-[2px] text-error`}>
                    Code non valide.
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-row gap-[16px]" id="row1">
              <div className="flex flex-col">
                <label htmlFor="dateDeDebut">
                  date De Debut
                  <span className="text-error text-bold text-[20px]">*</span>
                </label>
                <input
                  id="dateDeDebut"
                  className="bg-[#DDE7F0] w-[524px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                  value={formData.dateDeDebut}
                  name="dateDeDebut"
                  type="date"
                  required
                  onChange={changeHandler}
                  onFocus={() => {
                    setClicked(false);
                    setValidate(false);
                  }}
                />
                {formData.dateDeDebut != "" &&
                  (new Date(formData.dateDeDebut) < new Date("01/01/1999") ||
                    new Date(formData.dateDeDebut) > new Date()) &&
                  clicked && (
                    <p className={`text-[12px] p-[2px] text-error`}>
                      Veuillez entrer une année depuis 1999 jusqu&apos;à
                      l&apos;année en cours.
                    </p>
                  )}
                {formData.dateDeDebut == "" && clicked && (
                  <p className={`text-[12px] p-[2px] text-error`}>
                    Veuillez remplir ce champ.
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="DateDeFin">
                  Date De Fin
                  <span className="text-error text-bold text-[20px]">*</span>
                </label>
                <input
                  id="DateDeFin"
                  className="bg-[#DDE7F0] w-[524px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                  value={formData.DateDeFin}
                  name="DateDeFin"
                  type="Date"
                  required
                  onChange={changeHandler}
                  onFocus={() => {
                    setClicked(false);
                    setValidate(false);
                  }}
                />
                {formData.DateDeFin != "" &&
                  (new Date(formData.DateDeFin) < new Date("01/01/1999") ||
                    new Date(formData.DateDeFin) > new Date()) &&
                  clicked && (
                    <p className={`text-[12px] p-[2px] text-error`}>
                      Veuillez entrer une année depuis 1999 jusqu&apos;à
                      l&apos;année en cours.
                    </p>
                  )}
                {formData.DateDeFin == "" && clicked && (
                  <p className={`text-[12px] p-[2px] text-error`}>
                    Veuillez remplir ce champ.
                  </p>
                )}
                {formData.dateDeDebut != "" &&
                  formData.DateDeFin != "" &&
                  new Date(formData.dateDeDebut) >= new Date("01/01/1999") &&
                  new Date(formData.dateDeDebut) <= new Date() &&
                  new Date(formData.DateDeFin) >= new Date("01/01/1999") &&
                  new Date(formData.DateDeFin) <= new Date() &&
                  clicked &&
                  new Date(formData.DateDeFin) <
                    new Date(formData.dateDeDebut) && (
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
          Les membres du projet
          <span className="text-error text-bold text-[20px]">*</span>
        </label>
        <BoutonAjouter clickHandler={clickHandler} ToggleHandler={ToggleHandler} text="Ajouter Membre" />
        {formData.ListeMembres.length == 0 && clicked && (
          <p className={`text-[12px] p-[2px] text-error`}>
            Veuillez ajouter au moins un membre.
          </p>
        )}
      </div>

      {PopUpToggle && (
        <PopUp ToggleHandler={ToggleHandler} setFormData={setFormData} />
      )}

      <div className="flex flex-col  mx-[128px] my-[16px]">
        <LesChercheurs ListeMembres={formData.ListeMembres} />
      </div>
      {validate && (
        <p className="w-full text-center text-[18px] p-[2px] text-success">
          Projet ajouté avec seccuss
        </p>
      )}
      {message && (
        <p className="w-full text-center text-[18px] p-[2px] text-gris">
          Chef de projet non trouvé
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
          className=" right-0 absolute  bg-main_yellow mr-16  border-none h-[50px] reounded-[4px]  px-[16px] w-[225px]  ${color}   shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-hover_yellow hover:scale-[1.02] hover:duration-300 active:scale-95 active:duration-300"
        >
          Sauvgarder
        </button>
      </div>
    </div>
  );
}
