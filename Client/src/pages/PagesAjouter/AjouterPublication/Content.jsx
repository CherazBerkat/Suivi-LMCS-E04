import React from "react";
import BoutonAjouter from "./BoutonAjouter";
import LesChercheurs from "./LesChercheurs";
import PopUp from "./PopUp";
import "./Ajouter.css";
import axios from "axios";

export default function Content() {
  const [PopUpToggle, setPopUpToggle] = React.useState(false);

  let [formData, setFormData] = React.useState({
    titre_publication: "",
    lien: "",
    nombre_pages: "",
    nombre_volumes: "",
    annee: "",
    acronyme: "",
    ListChercheurs: [],
  });

  // INTEGRATION : //////////////////////////////////////////////
  const handleSend = async () => {
    console.log("in send handler");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/maj/Ajouterpublication/",
        formData
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }; ///////////////////////////////////////////////////////////////////////

  function ToggleHandler() {
    setPopUpToggle(!PopUpToggle);
  }
  function clickHandler() {}

  function changeHandler(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  const [clicked, setClicked] = React.useState(false);
  function rgxTitle(data) {
    const regex = /^[a-zA-Z0-9\s()\-.,:'’]+$/;
    return regex.test(data);
  }
  function rgxLien(data) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(data);
  }
  function validateAcronym(acronym) {
    const acronymRegex = /^[A-Z0-9]+$/;
    return acronymRegex.test(acronym);
  }
  function dataFilled(data) {
    return (
      data.TitreDePublication != "" &&
      data.nombre_pages != "" &&
      data.nombre_volumes != "" &&
      data.annee != "" &&
      data.acronyme != "" &&
      data.ListChercheurs.length != 0
    );
  }
  function validation(data) {
    return (
      rgxTitle(data.titre_publication) &&
      dataFilled(data) &&
      validateAcronym(data.acronyme) &&
      (data.lien == "" || rgxLien(data.lien)) &&
      data.annee <= new Date().getFullYear() &&
      data.annee >= 0
    );
  }
  const [validate, setValidate] = React.useState(false);
  function sendInfo() {
    if (validation(formData)) {
      console.log("sending"); ////////////////////////////////////////
      setValidate(true);
      handleSend();
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
              <label htmlFor="TitreDePublication">
                Titre De Publication
                <span className="text-error text-bold text-[20px]">*</span>
              </label>
              <input
                id="TitreDePublication"
                className=" bg-[#DDE7F0] w-[1057px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                value={formData.titre_publication}
                name="titre_publication"
                type="text"
                required
                onChange={changeHandler}
                onFocus={() => {
                  setClicked(false);
                  setValidate(false);
                }}
              />
              {!rgxTitle(formData.titre_publication) &&
                formData.titre_publication != "" &&
                clicked && (
                  <p
                    className={`text-[12px] p-[2px] text-error w-full text-start`}
                  >
                    Titre non valide
                  </p>
                )}
              {formData.titre_publication == "" && clicked && (
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
                className="bg-[#DDE7F0] w-[1057px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
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
                <label htmlFor="NombreDePges">
                  Nombre De Pges
                  <span className="text-error text-bold text-[20px]">*</span>
                </label>
                <input
                  id="NombreDePges"
                  className="bg-[#DDE7F0] w-[524px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                  value={formData.nombre_pages}
                  name="nombre_pages"
                  type="text"
                  min={0}
                  required
                  onChange={changeHandler}
                  onFocus={() => {
                    setClicked(false);
                    setValidate(false);
                  }}
                />

                {formData.nombre_pages == "" && clicked && (
                  <p
                    className={`text-[12px] p-[2px] text-error w-full text-start`}
                  >
                    Veuillez remplir ce champ
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="NombreDeVolumes">
                  Nombre De Volumes
                  <span className="text-error text-bold text-[20px]">*</span>
                </label>
                <input
                  id="NombreDeVolumes"
                  className="bg-[#DDE7F0] w-[524px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                  value={formData.nombre_volumes}
                  name="nombre_volumes"
                  type="text"
                  min={0}
                  required
                  onChange={changeHandler}
                  onFocus={() => {
                    setClicked(false);
                    setValidate(false);
                  }}
                />
                {formData.nombre_volumes == "" && clicked && (
                  <p
                    className={`text-[12px] p-[2px] text-error w-full text-start`}
                  >
                    Veuillez remplir ce champ
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-row gap-[16px]" id="row1">
              <div className="flex flex-col">
                <label htmlFor="annee">
                  Année
                  <span className="text-error text-bold text-[20px]">*</span>
                </label>
                <input
                  id="Annee"
                  className="bg-[#DDE7F0] w-[524px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                  value={formData.annee}
                  name="annee"
                  type="number"
                  min={1950}
                  required
                  onChange={changeHandler}
                  onFocus={() => {
                    setClicked(false);
                    setValidate(false);
                  }}
                />
                {formData.annee != "" && clicked && formData.annee < 0 && (
                  <p
                    className={`text-[12px] p-[2px] text-error w-full text-start`}
                  >
                    Annee non valide, veuillez entrer un nombre positif
                  </p>
                )}

                {formData.annee == "" && clicked && (
                  <p
                    className={`text-[12px] p-[2px] text-error w-full text-start`}
                  >
                    Veuillez remplir ce champ
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="Acronyme">
                  Acronyme
                  <span className="text-error text-bold text-[20px]">*</span>
                </label>
                <input
                  id="Acronyme"
                  className="bg-[#DDE7F0] w-[524px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
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
            </div>
          </div>
        </div>
      </form>

      <div className="flex flex-col pl-[128px] " id="Redacteurs">
        <label>
          Les Rédacteurs
          <span className="text-error text-bold text-[20px]">*</span>
        </label>
        <BoutonAjouter
          clickHandler={clickHandler}
          ToggleHandler={ToggleHandler}
          text="Ajouter Auteur"
        />
      </div>

      {PopUpToggle && (
        <PopUp ToggleHandler={ToggleHandler} setFormData={setFormData} />
      )}

      <div className="flex flex-col  mx-[128px] my-[16px]">
        <LesChercheurs ListChercheurs={formData.ListChercheurs} />
      </div>
      {validate && (
        <p className="w-full text-center text-[18px] p-[2px] text-success">
          Publication ajouté avec seccuss
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
          className=" right-0 absolute bg-main_yellow mr-16  border-none h-[50px] reounded-[4px]  px-[16px] w-[225px]  ${color}   shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-hover_yellow hover:scale-[1.02] hover:duration-300   active:scale-95 active:duration-300"
        >
          Sauvgarder
        </button>
      </div>
    </div>
  );
}
