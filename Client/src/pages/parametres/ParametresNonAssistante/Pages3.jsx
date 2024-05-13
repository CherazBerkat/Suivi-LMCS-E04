/* eslint-disable react/prop-types */
import Bouton from "./Bouton";
import React from "react";
import axios from "axios";

export default function Pages3({ infoUser3 ,utilisateur_id , Matricule}) {
  const [formData, setFormData] = React.useState(
    
   {utilisateur_id: utilisateur_id,
    Matricule: Matricule,
    sitePersonnel:infoUser3.site_personel,
    ReasearchGate:infoUser3.search_gate ,
    googleScholar:infoUser3.ggl_scholar ,
  Dblp:infoUser3.dblp}
  );
  console.log(formData);

    // /////////////////////////////////////////////////////////////////////////
  // INTEGRATION : 
  const handleSend = async () => {
    console.log("in send handler");
    try {
      const response = await axios.post('http://127.0.0.1:8000/params/update_chercheur_url/', formData);
      console.log(response.data);
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
  function rgxsite(data) {
    const site =
      /^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,6})+(?:\/[^\s]*)?$/;
    return site.test(data);
  }
  function rgxdblp(data) {
    const dblp = /^https:\/\/dblp\.org\/pid\/\d+\/[a-zA-Z0-9-]+\.html$/;
    return dblp.test(data);
  }
  function rgxggl(data) {
    const ggl =
      /^https:\/\/scholar\.google\.com\/citations\?user=[a-zA-Z0-9-]+&hl=[a-z]{2}&oi=sra$/;
    return ggl.test(data);
  }
  function rgxsearch(data) {
    const site = /https:\/\/www\.searchgate\.com\/profile\/[a-zA-Z0-9_-]+/;
    return site.test(data);
  }

  function notallvoid() {
    return (
      formData.sitePersonnel != "" ||
      formData.googleScholar != "" ||
      formData.Dblp != "" ||
      formData.ReasearchGate != ""
    );
  }
  function validation() {
    if (notallvoid()) {
      if (
        (formData.sitePersonnel != "" && !rgxsite(formData.sitePersonnel)) ||
        (formData.googleScholar != "" && !rgxggl(formData.googleScholar)) ||
        (formData.Dblp != "" && !rgxdblp(formData.Dblp)) ||
        (formData.ReasearchGate != "" && !rgxsearch(formData.ReasearchGate))
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  const [clicked, setClicked] = React.useState(false);
  function pushPage3() {
    if (validation()) {
      console.log(formData);
      handleSend();

    } else {
      setClicked(true);
    }
  }

  return (
    <div>
      <form className="flex flex-col items-end gap-3">
        <div className="flex flex-col">
          <label htmlFor="URLDeSitePersonnel">URL De Site Personnel</label>
          <input
            id="URLDeSitePersonnel"
            className="bg-[#DDE7F0] w-[800px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
            value={formData.sitePersonnel}
            type="text"
            required
            name="sitePersonnel"
            onChange={changeHandler}
            onFocus={() => setClicked(false)}
          />
          {!rgxsite(formData.sitePersonnel) &&
            clicked &&
            formData.sitePersonnel != "" && (
              <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
                Url non valide.
              </p>
            )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="URLGoogleScholar">URL Google Scholar </label>
          <input
            id="URLGoogleScholar"
            className="bg-[#DDE7F0] w-[800px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
            value={formData.googleScholar}
            type="text"
            required
            name="googleScholar"
            onChange={changeHandler}
            onFocus={() => setClicked(false)}
          />
          {!rgxggl(formData.googleScholar) &&
            clicked &&
            formData.googleScholar != "" && (
              <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
                Url non valide.
              </p>
            )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="URLDBlp">URL DBlp</label>
          <input
            id="URLDBlp"
            className="bg-[#DDE7F0] w-[800px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
            value={formData.Dblp}
            type="text"
            required
            name="Dblp"
            onChange={changeHandler}
            onFocus={() => setClicked(false)}
          />
          {!rgxdblp(formData.Dblp) && clicked && formData.Dblp != "" && (
            <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
              Url non valide.
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="URLReaserchGate">URL Reaserch Gate</label>
          <input
            id="URLReaserchGate"
            className="bg-[#DDE7F0] w-[800px] text-[20px] text-pure_black h-[50px] p-5  border-[#3D80B3] border-[2px] rounded-[5px]"
            value={formData.ReasearchGate}
            type="text"
            required
            name="ReasearchGate"
            onChange={changeHandler}
            onFocus={() => setClicked(false)}
          />
          {!rgxsearch(formData.ReasearchGate) &&
            clicked &&
            formData.ReasearchGate != "" && (
              <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
                Url non valide.
              </p>
            )}
          {!notallvoid(formData) && clicked && (
            <p className={`text-[12px] p-[2px] text-error w-full text-start`}>
              Veuillez remplir au moins un champ.
            </p>
          )}
        </div>
        <Bouton pushPage={pushPage3} />
      </form>
    </div>
  );
}
