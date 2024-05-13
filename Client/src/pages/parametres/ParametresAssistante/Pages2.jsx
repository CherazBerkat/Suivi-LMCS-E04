/* eslint-disable react/prop-types */

import Bouton from "./Bouton";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import axios from "axios";

export default function Pages2({ utilisateur_id }) {
  const [matches, setMatches] = useState(false);

  const [password, setpassword] = useState(false);
  const showpassword = () => {
    setpassword(!password);
  };
  const [password1, setpassword1] = useState(false);
  const showpassword1 = () => {
    setpassword1(!password1);
  };
  const [password2, setpassword2] = useState(false);
  const showpassword2 = () => {
    setpassword2(!password2);
  };

  const [formData, setFormData] = useState({
    utilisateur_id: utilisateur_id,
    ancien_mot_de_passe: "",
    nouveau_mot_de_passe: "",
    R_nouveau_mot_de_passe: "",
  });

  // /////////////////////////////////////////////////////////////////////////
  // INTEGRATION :
  const handleSend = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/params/update_chercheur_password/",
        formData
      );
      setMatches(response.data.matches);
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

  function validePassword(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return regex.test(password);
  }
  function contientLettreMinuscule(chaine) {
    return /[a-z]/.test(chaine);
  }
  function contientLettreMajuscule(chaine) {
    return /[A-Z]/.test(chaine);
  }
  function contientChiffre(chaine) {
    return /\d/.test(chaine);
  }
  function contientCaractereSpecial(chaine) {
    return /[!@#$%^&*(),.?":{}|<>]/.test(chaine);
  }
  function champVide(data) {
    return (
      data.ancien_mot_de_passe == "" ||
      data.nouveau_mot_de_passe == "" ||
      data.R_nouveau_mot_de_passe == ""
    );
  }

  function validation(data) {
    if (
      data.nouveau_mot_de_passe != data.R_nouveau_mot_de_passe ||
      !validePassword(data.nouveau_mot_de_passe) ||
      champVide(data)
    ) {
      return false;
    } else {
      return true;
    }
  }
  const [clicked, setClicked] = useState(false);
  function pushPage2() {
    if (validation(formData)) {
      if (!matches) {
        setClicked(false);
        setFormData({
          utilisateur_id: utilisateur_id,
          ancien_mot_de_passe: "",
          nouveau_mot_de_passe: "",
          R_nouveau_mot_de_passe: "",
        });
      } else {
        setClicked(true);
      }
      handleSend();
    } else {
      setClicked(true);
    }
  }

  return (
    <form action="" className="flex flex-col items-end gap-5" id="form">
      <div className="flex flex-col">
        <label htmlFor="AncienMotDePasse">
          Ancien Mot De Passe{" "}
          <span className="text-error text-bold text-[20px]">*</span>
        </label>
        <div className="relative">
          <input
            id="AncienMotDePasse"
            className="bg-[#DDE7F0] w-[800px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
            placeholder="****************************"
            name="ancien_mot_de_passe"
            type={password ? "text" : "password"}
            onFocus={() => setClicked(false)}
            onChange={changeHandler}
          />

          {password ? (
            <BiShow
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#808080] cursor-pointer w-8 h-8"
              onClick={showpassword}
            />
          ) : (
            <BiHide
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#808080] cursor-pointer w-8 h-8"
              onClick={showpassword}
            />
          )}
        </div>
        {!formData.matches && clicked && (
          <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
            Mot de passe non valide
          </p>
        )}
        {formData.ancien_mot_de_passe == "" && clicked && (
          <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
            Veuillez saisir votre mot de passe actuel
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="NouveauMotDePasse">
          Nouveau Mot De Passe
          <span className="text-error text-bold text-[20px]">*</span>
        </label>
        <div className="relative">
          <input
            id="NouveauMotDePasse"
            className="bg-[#DDE7F0] w-[800px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
            placeholder="****************************"
            name="nouveau_mot_de_passe"
            type={password1 ? "text" : "password"}
            onChange={changeHandler}
            onFocus={() => setClicked(false)}
          />
          {password1 ? (
            <BiShow
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#808080] cursor-pointer w-8 h-8"
              onClick={showpassword1}
            />
          ) : (
            <BiHide
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#808080] cursor-pointer w-8 h-8"
              onClick={showpassword1}
            />
          )}
        </div>
        {!validePassword(formData.nouveau_mot_de_passe) &&
          !contientLettreMinuscule(formData.nouveau_mot_de_passe) &&
          clicked &&
          !formData.nouveau_mot_de_passe == "" && (
            <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
              Mot de passe non valide, mot de passe doit contenire au moins une
              lettre minuscule
            </p>
          )}
        {!validePassword(formData.nouveau_mot_de_passe) &&
          !contientLettreMajuscule(formData.nouveau_mot_de_passe) &&
          clicked &&
          !formData.nouveau_mot_de_passe == "" && (
            <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
              Mot de passe non valide, mot de passe doit contenire au moins une
              lettre majuscule
            </p>
          )}
        {!validePassword(formData.nouveau_mot_de_passe) &&
          !contientChiffre(formData.nouveau_mot_de_passe) &&
          clicked &&
          !formData.nouveau_mot_de_passe == "" && (
            <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
              Mot de passe non valide, mot de passe doit contenire au moins un
              chiffre
            </p>
          )}
        {!validePassword(formData.nouveau_mot_de_passe) &&
          !contientCaractereSpecial(formData.nouveau_mot_de_passe) &&
          clicked &&
          !formData.nouveau_mot_de_passe == "" && (
            <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
              Mot de passe non valide, mot de passe doit contenire au moins un
              caractère spécial
            </p>
          )}
        {!validePassword(formData.nouveau_mot_de_passe) &&
          formData.nouveau_mot_de_passe.length < 8 &&
          clicked &&
          !formData.nouveau_mot_de_passe == "" && (
            <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
              Mot de passe non valide, mot de passe doit contenire au moins 8
              caractères
            </p>
          )}
        {formData.nouveau_mot_de_passe == "" && clicked && (
          <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
            Veuillez saisir votre nouveau mot de passe
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="RépétezLeNouveauMotDePasse">
          Répétez Le Nouveau Mot De Passe
          <span className="text-error text-bold text-[20px]">*</span>
        </label>
        <div className="relative">
          <input
            id="RépétezLeNouveauMotDePasse"
            className="bg-[#DDE7F0] w-[800px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
            placeholder="****************************"
            name="R_nouveau_mot_de_passe"
            type={password2 ? "text" : "password"}
            onFocus={() => setClicked(false)}
            onChange={changeHandler}
          />
          {password2 ? (
            <BiShow
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#808080] cursor-pointer w-8 h-8"
              onClick={showpassword2}
            />
          ) : (
            <BiHide
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#808080] cursor-pointer w-8 h-8"
              onClick={showpassword2}
            />
          )}
        </div>
        {formData.nouveau_mot_de_passe !== formData.R_nouveau_mot_de_passe &&
          clicked && (
            <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
              Les mots de passe ne correspondent pas
            </p>
          )}
        {validation(formData) && clicked && formData.matches && (
          <p className={`text-[20px] p-[2px] text-success w-full text-center`}>
            Mot de passe mis à jour avec succès
          </p>
        )}
      </div>

      <Bouton pushPage={pushPage2} />
    </form>
  );
}
