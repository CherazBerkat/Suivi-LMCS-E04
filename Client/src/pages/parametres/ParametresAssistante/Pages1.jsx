/* eslint-disable react/prop-types */
import Bouton from "./Bouton";
import React from "react";
import "../Pametres.css";
import axios from "axios";

export default function Pages1({ infoUser1, utilisateur_id }) {
  //////////////////////////
  const [formData, setFormData] = React.useState({});
  React.useEffect(() => {
    setFormData({
      utilisateur_id: utilisateur_id,
      nom_complet: infoUser1.nom_complet,
      email: infoUser1.email,
      username: infoUser1.nom_utilisateur,
    });
  }, [infoUser1, utilisateur_id]);

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

  function validation(data) {
    if (
      !rgxNom(data.nomComplet) ||
      !rgxEmail(data.email) ||
      !rgxUtilisateur(data.username)
    ) {
      return false;
    }
    return true;
  }

  function pushPage1() {
    if (validation(formData)) {
      handleSend();
    }
  }
  return (
    <div>
      <form action="" className="flex flex-col items-end">
        <div className="flex flex-col  gap-[16px] px-8 " id="div-principale">
          <div className=" flex flex-row gap-3" id="col1">
            <div className="flex flex-col">
              <label htmlFor="nomComplet">Nom Complet</label>
              <input
                id="nomComplet"
                className=" bg-[#DDE7F0] w-[350px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                value={formData.nom_complet}
                name="nom_complet"
                type="text"
                onChange={changeHandler}
              />
              {!rgxNom(formData.nomComplet) && formData.nomComplet != "" && (
                <p
                  className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}
                >
                  Nom non valide
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="username">Nom d&apos;Utilisateur</label>
              <input
                id="username"
                className="bg-[#DDE7F0] w-[350px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
                value={formData.username}
                name="username"
                type="text"
                onChange={changeHandler}
              />
              {!rgxUtilisateur(formData.username) &&
                formData.username != "" && (
                  <p
                    className={`text-[12px] p-[2px] text-error text-start text-wrap w-[350px]`}
                  >
                    Nom d&apos;utilisateur non valide ,nom d&apos;utilisateur ne
                    doit pas contenir des caractères spéciaux
                  </p>
                )}
            </div>
          </div>

          <div className=" flex flex-col gap-3" id="col2">
            <div className="flex flex-col">
              <label htmlFor="email">Adresse Mail</label>
              <input
                id="email"
                className="bg-[#DDE7F0] w-[725px] text-[20px] text-pure_black h-[50px] p-5 border-[#3D80B3] border-[2px] rounded-[5px]"
                value={formData.email}
                name="email"
                type="text"
                onChange={changeHandler}
              />
              {!rgxEmail(formData.email) && formData.email != "" && (
                <p
                  className={`text-[12px] p-[2px] text-error text-wrap w-[350px] text-start`}
                >
                  Email non valide
                </p>
              )}
            </div>
          </div>
        </div>

        <Bouton pushPage={pushPage1} />
      </form>
    </div>
  );
}
