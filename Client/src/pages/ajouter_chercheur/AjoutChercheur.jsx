import { useState, useEffect } from "react";
import arrowSmallLeft from "../../assets/icons/arrowSmallLeft.svg";
import SearchNavBar from "../../components/nav-bars/SearchNavBar";
import SearchSideBar from "../../components/Search-side-bar/SearchSideBar";
import stepone from "../../assets/images/stepone.svg";
import steptwo from "../../assets/images/steptwo.svg";
import stepthree from "../../assets/images/stepthree.svg";
import stepfour from "../../assets/images/stepfour.svg";
import axios from "axios";

const AjoutChercheur = () => {
  const [erreurm, seterreurm] = useState("");
  const [erreurn, seterreurn] = useState("");
  const [erreurt, seterreurt] = useState("");
  const [erreurh, seterreurh] = useState("");
  const [erreur, seterreur] = useState("");
  const [success, setsuccess] = useState("");
  const [equipe, setEquipe] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/our_team/");
        console.log(res.data);
        setEquipe(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  const [step, setStep] = useState(1);
  const [popup, setPopup] = useState(false);
  const [formData, setFormData] = useState({
    chercheur_id: "",
    nom_complet: "",
    email: "",
    tel: "",
    diplome: "",
    etablissement_origine: "",
    qualite: "",
    grade_enseignement: "",
    grade_recherche: "",
    hindex: 0,
    equipe: "",
    chef_E: false,
    dblp: "",
    ggl_scholar: "",
    site_personel: "",
    search_gate: "",
    statut: "actif",
    ORCID: "",
  });
  const [formData2, setFormData2] = useState({
    equipe: "",
    chef_E: "",
  });
  const handleChange2 = (e) => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    setPopup(false);
  };
  const handleChange = (e) => {
    const hasNumber = /\d/;
    const haschar = /^[A-Za-z]+$/;
    if (formData.chercheur_id.length > 8) {
      seterreurm("matricule peut pas depasser 8 chiffres");
    }
    if (formData.chercheur_id.length <= 8) {
      seterreurm("");
    }
    if (hasNumber.test(formData.nom_complet)) {
      seterreurn("nom ne peut pas contenier des chiffres");
    }
    if (!hasNumber.test(formData.nom_complet)) {
      seterreurn("");
    }
    if (haschar.test(formData.tel)) {
      seterreurt("tel ne peut pas contenir des charactere");
    }
    if (!haschar.test(formData.tel)) {
      seterreurt("");
    }
    if (haschar.test(formData.hindex) || formData.hindex < 0) {
      seterreurh("hindex ne peut pas contenir des charactere ou etre negatif");
    }

    if (!haschar.test(formData.hindex)) {
      seterreurh("");
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      equipe: formData2.equipe,
      chef_E: formData2.chef_E,
    };
    if (!formData.chercheur_id.trim()) {
      alert("Matricule is required");
      return;
    }
    if (!formData.nom_complet.trim()) {
      alert("Nom Complet is required");
      return;
    }
    if (!formData.email.trim()) {
      alert("Adresse Mail is required");
      return;
    }
    if (!formData.tel.trim()) {
      alert("Numero de telephone is required");
      return;
    }
    if (!formData.etablissement_origine.trim()) {
      alert("vous devez saisez vos etablissement d'origine");
    }
    if (!formData.diplome.trim()) {
      alert("vous devez saisez vos diplome");
    }

    if (isNaN(formData.hindex) || formData.hindex < 0) {
      alert("Hindex must be a positive number");
      return;
    }
    console.log(formData);
    console.log(formData2);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/maj/Ajouterchercheurs/",
        updatedFormData
      );
      console.log(response);
      setsuccess("chercheur a ete ajoute avec succes");
      seterreur("");
    } catch {
      seterreur("un probleme a ete rencontre vous pouvez repeter plutart");
      setsuccess("");
    }
  };
  const role = localStorage.getItem("role");
  return (
    <div
      className={
        popup
          ? "flex flex-row h-full w-full  bg-black/20 "
          : "flex flex-row h-full bg-white  "
      }
    >
      <div className="w-[14.58%] h-screen shadow-[0_0_25px_rgba(0,0,0,0.25)] z-10 fixed top-0 min-w-[130px] bg-white">
        <SearchSideBar page={3} />
      </div>
      <div className="flex-grow ml-[max(130px,14.58%)] ">
        <SearchNavBar
          text="Ajouter Un Chercheur"
          visiteur={false}
          icon={arrowSmallLeft}
          href={
            role == "assistant"
              ? "/MiseAJour/Assisstant"
              : role == "directeur"
                ? "/maj/status"
                : "/maj/Chercheur"
          }
        />
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col justify-center items-center gap-2  my-10 "
        >
          {step === 1 && (
            <div className=" text-xl">
              <img src={stepone} alt="stepone" />
              <div className=" flex justify-start flex-col my-8 mx-20">
                <p className="  my-2">
                  Matricule <span className=" text-red-600">*</span>
                </p>
                <input
                  type="text"
                  name="chercheur_id"
                  value={formData.chercheur_id}
                  onChange={handleChange}
                  placeholder="12/234"
                  className=" py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80] px-2"
                  required
                />
                <p className=" text-sm text-red-600 py-2 px-4">{erreurm}</p>
              </div>
              <div className=" flex justify-start flex-col my-8 mx-20">
                <p className="  my-2">
                  Nom Complet <span className=" text-red-600">*</span>
                </p>
                <input
                  type="text"
                  name="nom_complet"
                  value={formData.nom_complet}
                  onChange={handleChange}
                  placeholder="Koudil Mouloud"
                  className=" py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80] px-2"
                  required
                />
                <p className=" text-sm text-red-600 py-2 px-4">{erreurn}</p>
              </div>
              <div className=" flex justify-start flex-col my-8 mx-20">
                <p className="  my-2">
                  Adresse Mail <span className=" text-red-600">*</span>
                </p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="m_koudil@esi.dz"
                  className=" py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80] px-2"
                  required
                />
              </div>
              <div className=" flex justify-start flex-col my-8 mx-20">
                <p className="  my-2">
                  Numero de telephone <span className=" text-red-600">*</span>
                </p>
                <input
                  type="tel"
                  name="tel"
                  value={formData.tel}
                  onChange={handleChange}
                  placeholder="023 444 444"
                  className=" py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80] px-2"
                  required
                />
                <p className="text-sm text-red-600 py-2 px-4">{erreurt}</p>
              </div>
              <div>
                <div
                  className={
                    step === 1
                      ? " flex items-center justify-end mx-20"
                      : " flex items-center justify-between mx-20"
                  }
                >
                  <div className={step === 1 ? "hidden" : undefined}>
                    <button
                      className="py-3 px-6 bg-[#E2FD52]  rounded  font-medium text-[16px] "
                      onClick={() => setStep(step - 1)}
                    >
                      {step === 1 ? "" : " <    Precedent"}
                    </button>
                  </div>
                  <button
                    className="py-3 px-6 bg-[#E2FD52]  rounded font-medium text-[16px]"
                    onClick={() => setStep(step + 1)}
                  >
                    {step === 4 ? "Sauvegarder" : "Suivant    >"}
                  </button>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className=" text-xl">
              <img src={steptwo} alt="steptwo" />
              <div className=" flex justify-start flex-col my-8 mx-20">
                <p className="  my-2">
                  HIndex <span className=" text-red-600">*</span>
                </p>
                <input
                  type="text"
                  name="hindex"
                  value={formData.hindex}
                  onChange={handleChange}
                  placeholder="0123"
                  className=" py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80] px-2"
                  required
                />
                <p className="text-sm text-red-600 py-2 px-4">{erreurh}</p>
              </div>
              <div className=" flex justify-start flex-col my-8 mx-20">
                <p className="  my-2">
                  Qualité <span className=" text-red-600">*</span>
                </p>
                <select
                  value={formData.qualite}
                  onChange={handleChange}
                  name="qualite"
                  id=""
                  className="py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80] px-2"
                >
                  <option value="Doctorant">Doctorant</option>
                  <option value="Enseignat Chercheur">
                    Enseignat Chercheur
                  </option>
                </select>
              </div>
              <div className=" flex justify-start flex-col my-8 mx-20">
                <p className="  my-2">
                  Grade Recherche <span className=" text-red-600">*</span>
                </p>
                <select
                  name="grade_recherche"
                  id=""
                  value={formData.grade_recherche}
                  onChange={handleChange}
                  className="py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80] px-2"
                >
                  <option value="Directeur de Recherche">
                    Directeur de Recherche
                  </option>
                  <option value="Maitre de Recherche A">
                    Maitre de Recherche A
                  </option>
                  <option value="Maitre de Recherche B">
                    Maitre de Recherche B
                  </option>
                </select>
              </div>
              <div className=" flex justify-start flex-col my-8 mx-20">
                <p className="  my-2">
                  Grade Enseignement <span className=" text-red-600">*</span>
                </p>
                <select
                  name="grade_enseignement"
                  id=""
                  value={formData.grade_enseignement}
                  onChange={handleChange}
                  className="py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80] px-2"
                >
                  <option value="Assistant d'enseignement">
                    Assistant d&aposenseignement
                  </option>
                  <option value="Chargé de cours">Chargé de cours</option>
                  <option value="Maître d'enseignement ">
                    Maître d&aposenseignement{" "}
                  </option>
                  <option value="Professeur assistant">
                    Professeur assistant
                  </option>
                  <option value="Professeur associé">
                    Professeur associé{" "}
                  </option>
                  <option value="Professeur ordinaire">
                    Professeur ordinaire
                  </option>
                  <option value="Professeur honoraire">
                    Professeur honoraire
                  </option>
                </select>
              </div>
              <div>
                <div
                  className={
                    step === 1
                      ? " flex items-center justify-end mx-20"
                      : " flex items-center justify-between mx-20"
                  }
                >
                  <div className={step === 1 ? "hidden" : undefined}>
                    <button
                      className="py-3 px-6 bg-[#E2FD52]  rounded  font-medium text-[16px] "
                      onClick={() => setStep(step - 1)}
                    >
                      {step === 1 ? "" : " <    Precedent"}
                    </button>
                  </div>
                  <button
                    className="py-3 px-6 bg-[#E2FD52]  rounded font-medium text-[16px]"
                    onClick={() => setStep(step + 1)}
                  >
                    {step === 4 ? "Sauvegarder" : "Suivant  >"}
                  </button>
                </div>
              </div>
            </div>
          )}
          <div
            className={
              popup
                ? " absolute border shadow  px-4 py-8 z-50 flex-col bg-white w-1/4 rounded "
                : " hidden"
            }
          >
            <div>
              <div className=" flex justify-between items-center mb-8 mx-4 ">
                <p className=" text-2xl  font-bold">Chercheur</p>
                <p
                  className="text-2xl font-bold cursor-pointer"
                  onClick={() => setPopup(false)}
                >
                  X
                </p>
              </div>
              <div className="  flex-col my-4 mx-4">
                <select
                  name="equipe"
                  id=""
                  value={formData2.equipe}
                  onChange={handleChange2}
                  className=" block px-2 py-2 w-full my-4 border-b border-black"
                >
                  {equipe.map((equipes, index) => {
                    return (
                      <option key={index} value={equipes.nom}>
                        {equipes.nom}
                      </option>
                    );
                  })}
                </select>
                <select
                  name="chef_E"
                  id=""
                  value={formData2.chef_E}
                  onChange={handleChange2}
                  className=" block px-2 py-2 w-full my-4 border-b border-black"
                >
                  <option value={true}>chef</option>
                  <option value={false}>membre</option>
                </select>
                <button
                  onClick={handleSubmit2}
                  className="py-2 px-4 bg-[#E2FD52]  rounded font-medium text-[16px] w-full mt-4"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
          {step === 3 && (
            <div className=" text-xl">
              <img src={stepthree} alt="stepthree" />
              <div className=" flex justify-start flex-col my-8 mx-20">
                <p className="  my-2">
                  Diplome <span className=" text-red-600">*</span>
                </p>
                <input
                  type="text"
                  name="diplome"
                  value={formData.diplome}
                  onChange={handleChange}
                  placeholder="PhD En Informatique"
                  className=" py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80] px-2"
                  required
                />
              </div>
              <div className=" flex justify-start flex-col my-8 mx-20">
                <p className="  my-2">
                  Etablissement D’origine{" "}
                  <span className=" text-red-600">*</span>
                </p>
                <input
                  type="text"
                  name="etablissement_origine"
                  value={formData.etablissement_origine}
                  onChange={handleChange}
                  placeholder="Labo LSCI"
                  className=" py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80] px-2"
                  required
                />
              </div>
              <div className=" flex justify-start flex-col my-8 mx-20">
                <p className="  my-2">
                  Equipe <span className=" text-red-600">*</span>
                </p>
                <input
                  type="text"
                  placeholder="023 444 444"
                  className=" py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80] px-2"
                  required
                  onFocus={() => {
                    setPopup(true);
                  }}
                />
              </div>
              <div className=" flex justify-start flex-col my-8 mx-20">
                <p className="  my-2">ORCID </p>
                <input
                  type="text"
                  name="ORCID"
                  value={formData.ORCID}
                  onChange={handleChange}
                  placeholder="0232 2444 5444 7095"
                  className=" py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80] px-2"
                />
              </div>
              <div>
                <div
                  className={
                    step === 1
                      ? " flex items-center justify-end mx-20"
                      : " flex items-center justify-between mx-20"
                  }
                >
                  <div className={step === 1 ? "hidden" : undefined}>
                    <button
                      className="py-3 px-6 bg-[#E2FD52]  rounded  font-medium text-[16px] "
                      onClick={() => setStep(step - 1)}
                    >
                      {step === 1 ? "" : " <    Precedent"}
                    </button>
                  </div>
                  <button
                    className="py-3 px-6 bg-[#E2FD52]  rounded font-medium text-[16px]"
                    onClick={() => setStep(step + 1)}
                  >
                    {step === 4 ? "Sauvegarder" : "Suivant  >"}
                  </button>
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className=" text-xl">
              <img src={stepfour} alt="stepfour" />
              <div className=" flex justify-start flex-col my-8 mx-20">
                <p className="  my-2">URL De Site Personnel </p>
                <input
                  type="url"
                  name="site_personel"
                  value={formData.site_personel}
                  onChange={handleChange}
                  placeholder="http://balla.esi.dz"
                  className=" py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80] px-2"
                />
              </div>
              <div className=" flex justify-start flex-col my-8 mx-20">
                <p className="  my-2">URL Google Scholar </p>
                <input
                  type="url"
                  name="ggl_scholar"
                  value={formData.ggl_scholar}
                  onChange={handleChange}
                  placeholder="http://dblp.com"
                  className=" py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80] px-2"
                />
              </div>
              <div className=" flex justify-start flex-col my-8 mx-20">
                <p className="  my-2">URL DBlP </p>
                <input
                  type="url"
                  name="dblp"
                  value={formData.dblp}
                  onChange={handleChange}
                  placeholder="http://dblp.com"
                  className=" py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80] px-2"
                />
              </div>
              <div className=" flex justify-start flex-col my-8 mx-20">
                <p className="  my-2">URL Reaserch Gate </p>
                <input
                  type="url"
                  name="search_gate"
                  value={formData.search_gate}
                  onChange={handleChange}
                  placeholder="http://dblp.com"
                  className=" py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80] px-2"
                />
              </div>
              <p className="text-sm text-green-600 py-2 px-4">{success}</p>
              <p className="text-sm text-red-600 py-2 px-4">{erreur}</p>
              <div>
                <div
                  className={
                    step === 1
                      ? " flex items-center justify-end mx-20"
                      : " flex items-center justify-between mx-20"
                  }
                >
                  <div className={step === 1 ? "hidden" : undefined}>
                    <button
                      className="py-3 px-6 bg-[#E2FD52]  rounded  font-medium text-[16px] "
                      onClick={() => setStep(step - 1)}
                    >
                      {step === 1 ? "" : " <    Precedent"}
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-6 bg-[#E2FD52]  rounded font-medium text-[16px]"
                  >
                    Sauvegarder
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AjoutChercheur;
