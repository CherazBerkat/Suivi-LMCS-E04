/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import TogglePages1 from "./ParametresNonAssistante/TogglePages1";
import TogglePages2 from "./ParametresAssistante/TogglePages2";
export default function Content({ isAssitant }) {
  // data obtenu de back end (hadou des examples mn 3andi bah ntesti) : data pour placeholders de formulaire

  const utilisateur_id = localStorage.getItem("user_id"); // from local storage
  const Matricule = localStorage.getItem("matricule"); // from local storage

  // CAS NON ASSISTANTE
  const [infoUser1, setinfoUser1] = useState({
    utilisateur_id: utilisateur_id, //get it from the local storage
    Matricule: Matricule, //get it from the local storage
    nom_complet: "",
    email: "",
    qualite: "",
    diplome: "",
    username: "",
    tel: "",
    grade_enseignement: "",
    etablissement_origine: "",
    ORCID: "",
    hindex: "",
    grade_recherche: "",
    equipe: "",
  });
  const [username, setusername] = useState("");
  // les info de chercheur:
  const [infoUser3, setinfoUser3] = useState({
    utilisateur_id: utilisateur_id, //get it from the local storage
    sitePersonnel: "",
    googleScholar: "",
    Dblp: "",
    ReasearchGate: "",
  });

  useEffect(() => {
    // data to  get from back to fill placeholders
    const fetchinfoUser1 = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/profil/chercheur_personal_info/",
          { Matricule: Matricule }
        );
        setinfoUser1(response.data);
        setinfoUser3(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchinfoUser1();
  }, [Matricule]);

  //get  le username de chercheur from backend ;
  useEffect(() => {
    const fetchinfoAss = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/profil/user_personal_info/",
          { User_id: utilisateur_id }
        );
        setusername(response.data.nom_utilisateur);
      } catch (err) {
        console.log(err);
      }
    };
    fetchinfoAss();
  }, [Matricule, utilisateur_id]);

  // cAS ASSISTANTE
  const [infoAss, setinfoAss] = useState({
    utilisateur_id: utilisateur_id, //get it from the local storage
    nom_complet: "",
    email: "",
    username: "",
  });

  // get assisstante data from back
  useEffect(() => {
    const fetchinfoAss = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/profil/user_personal_info/",
          { User_id: utilisateur_id }
        );
        setinfoAss(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchinfoAss();
  }, [Matricule, utilisateur_id]);

  return (
    <div className="bg-bg_yellow h-full w-full items-center justify-start flex flex-col">
      {isAssitant ? (
        <TogglePages2 infoUser1={infoAss} utilisateur_id={utilisateur_id} />
      ) : (
        <TogglePages1
          infoUser1={infoUser1}
          infoUser3={infoUser3}
          username={username}
          utilisateur_id={utilisateur_id}
          Matricule={Matricule}
        />
      )}
    </div>
  );
}
