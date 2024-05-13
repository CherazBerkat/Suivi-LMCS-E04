/* eslint-disable react/prop-types */
import Bouton from "./Bouton";
import React, { useEffect } from "react";
import "../Pametres.css";
import axios from "axios";

export default function Pages1({
  infoUser1,
  username,
  utilisateur_id,
  Matricule,
}) {
  const [formData, setFormData] = React.useState({});
  useEffect(() => {
    setFormData({
      utilisateur_id: utilisateur_id,
      ORCID: infoUser1.ORCID,
      Matricule: Matricule,
      diplome: infoUser1.diplome,
      email: infoUser1.email,
      equipe: infoUser1.equipe,
      etablissement_origine: infoUser1.etablissement_origine,
      grade_enseignement: infoUser1.grade_enseignement,
      grade_recherche: infoUser1.grade_recherche,
      hindex: infoUser1.hindex,
      nom_complet: infoUser1.nom_complet,
      qualite: infoUser1.qualite,
      tel: infoUser1.tel,
      username: username,
    });
  }, [infoUser1, username, utilisateur_id, Matricule]);

  // /////////////////////////////////////////////////////////////////////////
  // INTEGRATION :
  const handleSend = async () => {
    console.log("in send of page one ");
    try {
      await axios.post(
        "http://127.0.0.1:8000/params/update_personal_info/",
        formData
      );
    } catch (err) {
      console.log(err);
    }
  };
  // /////////////////////////////////////////////////////////////////////////

  const list_qualite = ["Chercheur", "Doctorant", "Chercheur-enseignant"];
  const list_diplome = ["Doctorat", "Master", "Licence"];
  const list_equipe = [
    " EIAH ",
    " Codesign ",
    " managment",
    " optimisation",
    " sures",
    "TII",
  ];
  const list_grad_e = ["Professeur", "MCA", "MCB", "MAA", "MAB"];
  const list_grad_r = ["Grade 1", "Grade 2", "Grade 3"];

  function changeHandler(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function rgxNom(data) {
    const regex = /^[a-zA-Z\s]{1,}$/;
    return regex.test(data);
  }

  function rgxEmail(data) {
    const email = /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+.[a-zA-Z]{2,6})$/;
    return email.test(data);
  }
  function rgxUtilisateur(data) {
    const utilis = /^[a-zA-Z0-9 _.-]+$/;
    return utilis.test(data);
  }

  function rgxPhone(data) {
    const phone =
      /^0[567]\d{2}(?:\s?-?\s?)?\d{2}(?:\s?-?\s?)?\d{2}(?:\s?-?\s?)?\d{2}$/;
    return phone.test(data);
  }

  function rgxEtab(data) {
    const Etab = /^[a-zA-Z\s\d\-,.()]+$/;
    return Etab.test(data);
  }

  function rgxORCD(data) {
    const ORCD = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    return ORCD.test(data);
  }

  function validation(data) {
    if (
      !rgxNom(data.nom_complet) ||
      !rgxEmail(data.email) ||
      !rgxUtilisateur(data.username) ||
      !rgxPhone(data.tel) ||
      !rgxEtab(data.etablissement_origine) ||
      !rgxORCD(data.ORCID) ||
      data.hindex < 0
    ) {
      return false;
    }
    return true;
  }
  const [clicked, setClicked] = React.useState(false);

  function pushPage1() {
    if (validation(formData)) {
      handleSend();
    } else {
      setClicked(true);
    }
  }

  return (
    <div>
      <form className="flex flex-col items-end">
        <div className="flex flex-row  gap-[16px] px-8 " id="div-principale">
          <div className=" flex flex-col gap-3" id="col1">
            <div className="flex flex-col">
              <label htmlFor="nomComplet">Nom Complet</label>
              <input
                id="nomComplet"
                className=" bg-[#DDE7F0] w-[350px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                name="nom_complet"
                value={formData.nom_complet}
                type="text"
                onChange={changeHandler}
              />
              {!rgxNom(formData.nom_complet) &&
                formData.nom_complet != "" &&
                clicked && (
                  <p
                    className={`text-[12px] p-[2px] text-error w-full text-start`}
                  >
                    Nom non valide
                  </p>
                )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Adresse Mail</label>
              <input
                id="email"
                className="bg-[#DDE7F0] w-[350px] text-[20px] text-pure_black h-[50px] p-5 border-[#3D80B3] border-[2px] rounded-[5px]"
                value={formData.email}
                name="email"
                type="text"
                onChange={changeHandler}
              />
              {!rgxEmail(formData.email) && formData.email != "" && clicked && (
                <p
                  className={`text-[12px] p-[2px] text-error w-full text-start`}
                >
                  Email non valide
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="qualite">Qualité</label>
              <select
                name="qualite"
                id="qualite"
                type="text"
                value={formData.qualite}
                className="bg-[#DDE7F0] w-[350px] text-[20px] text-pure_black h-[50px] border-[#3D80B3] border-[2px] rounded-[5px] my-[2px]"
                onChange={changeHandler}
              >
                <option value="" className="text-gris font-light ">
                  {infoUser1.qualite}
                </option>
                {list_qualite.map((option, index) => (
                  <option value={option} className="text-gris" key={index}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col ">
              <label htmlFor="diplome">Diplome</label>
              <select
                name="diplome"
                id="diplome"
                type="text"
                value={formData.diplome}
                className="bg-[#DDE7F0] w-[350px] text-[20px] text-pure_black h-[50px] border-[#3D80B3] border-[2px] rounded-[5px] my-[2px]"
                onChange={changeHandler}
              >
                <option value="" className="text-gris font-light ">
                  {infoUser1.diplome}
                </option>
                {list_diplome.map((option, index) => (
                  <option value={option} className="text-gris" key={index}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className=" flex flex-col gap-3" id="col2">
            <div className="flex flex-col">
              <label htmlFor="username">Nom d&apos;Utilisateur </label>
              <input
                id="username"
                className="bg-[#DDE7F0] w-[350px] text-[20px] text-pure_black h-[50px] p-5 border-[#3D80B3] border-[2px] rounded-[5px]"
                value={formData.username}
                name="username"
                type="text"
                onChange={changeHandler}
              />
              {!rgxUtilisateur(formData.username) &&
                formData.username != "" &&
                clicked && (
                  <p
                    className={`text-[12px] p-[2px] text-error w-full text-start`}
                  >
                    Nom d&apos;utilisateur non valide ,nom d&apos;utilisateur ne
                    doit pas contenir des caractères spéciaux
                  </p>
                )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="telephone">N° Téléphone</label>
              <input
                id="telephone"
                className="bg-[#DDE7F0] w-[350px] text-[20px] text-pure_black h-[50px] p-5 border-[#3D80B3] border-[2px] rounded-[5px]"
                value={formData.tel}
                name="tel"
                type="phone"
                onChange={changeHandler}
              />
              {!rgxPhone(formData.tel) && formData.tel != "" && clicked && (
                <p
                  className={`text-[12px] p-[2px] text-error w-full text-start`}
                >
                  Numéro de téléphone non valide
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="gradeR">Grade De Recherhce</label>
              <select
                name="grade_recherche"
                id="gradeR"
                type="text"
                value={formData.grade_recherche}
                className="bg-[#DDE7F0] w-[350px] text-[20px] text-pure_black h-[50px] border-[#3D80B3] border-[2px] rounded-[5px] my-[2px]"
                onChange={changeHandler}
              >
                <option value="" className="text-gris font-light ">
                  {infoUser1.grade_recherche}
                </option>
                {list_grad_r.map((option, index) => (
                  <option value={option} className="text-gris" key={index}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="etab">Etablissement d&apos;Origine</label>
              <input
                id="etab"
                className="bg-[#DDE7F0] w-[350px] text-[20px] text-pure_black h-[50px] p-5 border-[#3D80B3] border-[2px] rounded-[5px] my-[2px]"
                value={formData.etablissement_origine}
                name="etablissement_origine"
                type="text"
                onChange={changeHandler}
              />
              {!rgxEtab(formData.etablissement_origine) &&
                formData.etablissement_origine != "" &&
                clicked && (
                  <p
                    className={`text-[12px] p-[2px] text-error w-full text-start`}
                  >
                    Nom d&apos;Etablissement non valide
                  </p>
                )}
            </div>
          </div>

          <div className=" flex flex-col gap-3 " id="col3">
            <div className="flex flex-col">
              <label htmlFor="oricd">ORCID</label>
              <input
                id="orcid"
                className="bg-[#DDE7F0] w-350px text-[20px] text-pure_black h-[50px] p-5 border-[#3D80B3] border-[2px] rounded-[5px]"
                value={formData.ORCID}
                name="ORCID"
                type="text"
                onChange={changeHandler}
              />
              {!rgxORCD(formData.ORCID) && formData.ORCID != "" && clicked && (
                <p
                  className={`text-[12px] p-[2px] text-error w-full text-start`}
                >
                  ORCID non valide, ORCID doit être sous format
                  xxxx-xxxx-xxxx-xxxx
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="hindex">H-index</label>
              <input
                id="hindex"
                className="bg-[#DDE7F0] w-350px text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                value={formData.hindex}
                name="hindex"
                type="number"
                min={0}
                onChange={changeHandler}
              />
              {formData.hindex < 0 && formData.hindex != "" && (
                <p
                  className={`text-[12px] p-[2px] text-error w-full text-start`}
                >
                  Hindex non valide, Hindex est un nombre réel positive
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="gradeE">Grade Enseignement </label>
              <select
                name="grade_enseignement"
                id="gradeE"
                value={formData.grade_enseignement}
                type="text"
                className="bg-[#DDE7F0] w-[350px] text-[20px] text-pure_black h-[50px]  border-[#3D80B3] border-[2px] rounded-[5px] my-[2px]"
                onChange={changeHandler}
              >
                <option value="" className="text-gris font-light ">
                  {infoUser1.grade_enseignement}
                </option>
                {list_grad_e.map((option, index) => (
                  <option value={option} className="text-gris" key={index}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="qualite">Equipe </label>
              <select
                name="equipe"
                id="equipe"
                type="text"
                value={formData.equipe}
                className="bg-[#DDE7F0] w-[350px] text-[20px] text-pure_black h-[50px]  border-[#3D80B3] border-[2px] rounded-[5px] my-[2px]"
                onChange={changeHandler}
              >
                <option value="" className="text-gris font-light ">
                  {infoUser1.equipe}
                </option>
                {list_equipe.map((option, index) => (
                  <option value={option} className="text-gris" key={index}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <Bouton pushPage={pushPage1} />
      </form>
    </div>
  );
}
