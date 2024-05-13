import { useEffect, useState } from "react"; // Import de useEffect et useState depuis React
import SearchNavBar from "../../components/nav-bars/SearchNavBar"; // Import du composant de la barre de navigation de recherche
import SearchSideBar from "../../components/Search-side-bar/SearchSideBar"; // Import du composant de la barre latérale de recherche
import arrowSmallLeft from "../../assets/icons/arrowSmallLeft.svg"; // Import de l'icône de flèche vers la gauche
import { useLocation } from "react-router-dom"; // Import de la fonction useLocation pour obtenir les informations de l'URL
import axios from "axios"; // Import de axios pour les requêtes HTTP

const Modifier_Pub = () => {
  const location = useLocation(); // Obtention des informations de l'URL
  const [erreur, seterreur] = useState(""); // Initialisation de l'état pour les erreurs
  const [success, setsuccess] = useState(""); // Initialisation de l'état pour les succès
  const { titre_publication, profile } = location.state; // Extraction des données de l'URL
  const [listechercheur, setlistechercheur] = useState([]); // Initialisation de l'état pour la liste des chercheurs
  const [publication, setPublication] = useState({
    ConfJournal_id: "",
    chercheur_id: "",
    id: "",
    nombre_pages: "",
    nombre_volumes: "",
    date_publication: "",
    titre_publication: titre_publication,
    lien: "",
  }); // Initialisation de l'état pour les informations de publication

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.post(
        "http://127.0.0.1:8000/profil/view_publication2/",
        { titre_publication: publication.titre_publication }
      );
      setPublication(response.data); // Mise à jour des informations de publication
      const response2 = await axios.post(
        "http://127.0.0.1:8000/recherche/Authors/",
        {
          titre: publication.titre_publication,
          date_publication: publication.date_publication,
          ConfJournal_id: publication.ConfJournal_id,
        }
      );
      setlistechercheur(response2.data); // Mise à jour de la liste des chercheurs
    };
    fetchdata();
  }, [
    publication.titre_publication,
    publication.date_publication,
    publication.ConfJournal_id,
  ]); // Exécution de l'effet uniquement lorsqu'il y a des changements dans les détails de la publication

  const [error, setError] = useState(""); // Initialisation de l'état pour les erreurs de saisie

  const handleChangenbrpage = (e) => {
    const value = e.target.value;
    if (/^([0-9_-]*)?$/.test(value)) {
      setPublication({ ...publication, nombre_pages: value });
      setError("");
    } else {
      setError("Veuillez entrer des chiffres, _ ou - uniquement");
    }
  };

  const handleChangenbrvol = (e) => {
    const value = e.target.value;
    if (/^([0-9_-]*)?$/.test(value)) {
      setPublication({ ...publication, nombre_volumes: value });
      setError("");
    } else {
      setError("Veuillez entrer des chiffres, _ ou - uniquement");
    }
  };

  const handelsubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/profil/modif_publication/", {
        titre_publication: publication.titre_publication,
        ConfJournal_id: publication.ConfJournal_id,
        date_publication: publication.date_publication,
        nombre_pages: publication.nombre_pages,
        nombre_volumes: publication.nombre_volumes,
      });
      setsuccess("Publication modifiée avec succès");
      seterreur("");
    } catch (error) {
      console.log(error);
      setsuccess("");
      seterreur("Erreur lors de la modification de la publication");
    }
  };

  return (
    <div className="flex flex-row h-full bg-white w-full">
      <div className="w-[14.58%] h-screen shadow-[0_0_25px_rgba(0,0,0,0.25)] z-10 fixed top-0 min-w-[130px] bg-white">
        <SearchSideBar page={profile == true ? 4 : 1} visiteur={false} /> {/* Affichage de la barre latérale de recherche */}
      </div>
      <div className="flex-grow ml-[max(130px,14.58%)] ">
        <SearchNavBar
          text="Modifier la publication"
          icon={arrowSmallLeft}
          href={"/MonProfile"}
          visiteur={false}
        /> {/* Affichage de la barre de navigation de recherche */}
        <div className=" flex justify-center items-center flex-col w-full my-6">
          <form className=" w-full" onSubmit={handelsubmit}>
            <div className=" flex justify-start flex-col my-4 mx-16">
              <p className="  my-1">Titre Du Publication</p>
              <input
                type="text"
                placeholder="lorem ipsum"
                className=" py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80] px-2"
                value={publication.titre_publication}
                readOnly
              />
            </div>
            <div className=" flex justify-start flex-col  mx-16">
              <p className="  my-1">Lien</p>
              <input
                type="text"
                placeholder="https://www.figma.com/"
                className="py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80]  px-2"
                value={publication.lien}
                readOnly
              />
            </div>
            <div className=" flex justify-start items-center mx-16 gap-8 my-4">
              <div className=" flex justify-start flex-col w-full ">
                <p>
                  Année <span className=" text-red-700">*</span>
                </p>
                <input
                  type="text"
                  name=""
                  id=""
                  className="py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80]  px-2 "
                  required
                  placeholder="2022"
                  value={publication.date_publication}
                  readOnly
                />
              </div>
              <div className=" flex justify-start flex-col w-full">
                <p>Acronyme</p>
                <input
                  type="text"
                  name=""
                  id=""
                  className="py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80]  px-2"
                  placeholder="LSA"
                  value={publication.ConfJournal_id}
                  readOnly
                />
              </div>
            </div>
            <div className=" flex justify-start items-center mx-16 gap-8 my-4">
              <div className=" flex justify-start flex-col w-full ">
                <p>
                  Nombre de pages<span className=" text-red-700">*</span>
                </p>
                <input
                  type="text"
                  name="nombre_pages"
                  id=""
                  className="py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80]  px-2 "
                  required
                  placeholder="120-34-644"
                  value={publication.nombre_pages}
                  onChange={handleChangenbrpage}
                />
              </div>
              <div className=" flex justify-start flex-col w-full">
                <p>
                  Nombre de volumes<span className=" text-red-700">*</span>
                </p>
                <input
                  type="text"
                  name="nombre_volumes"
                  id=""
                  className="py-2 border-[#3D80B3] border rounded bg-[#C9DCEE80]  px-2"
                  placeholder="03-2123-1231"
                  value={publication.nombre_volumes}
                  onChange={handleChangenbrvol}
                />
              </div>
            </div>
            <p className=" my-4 mx-20 text-red-600 text-sm ">{error}</p>
            <div className=" flex gap-2 flex-wrap  mx-16 text-white font-medium mr">
              {listechercheur.map((chercheur, index) => (
                <div className=" py-2 px-4 bg-[#989898] rounded " key={index}>
                  <p className=" px-2">
                    {chercheur} <span>{index + 1}</span>
                  </p>
                </div>
              ))}
            </div>
            <p className=" text-sm text-green-500 py-2 px-4 mx-2 ">{success}</p>
            <p className="text-sm text-red-500 py-2 px-4 mx-2 ">{erreur}</p>
            <div className=" flex justify-end my-4 mr-16">
              <button
                className=" py-3 px-6 bg-[#E2FD52]  rounded text-sm font-medium"
                type="submit"
              >
                Sauvegarder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modifier_Pub;
