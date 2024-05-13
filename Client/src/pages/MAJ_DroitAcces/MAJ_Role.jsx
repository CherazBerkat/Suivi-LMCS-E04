// Importations
import { useEffect, useState } from "react";
import SearchSideBar from "../../components/Search-side-bar/SearchSideBar"; // Composant de la barre latérale de recherche
import SearchNavBar from "../../components/MAJ_status/Searchnavbar"; // Composant de la barre de navigation de recherche
import "./style.css"; // Fichier de style CSS
import { convertNomComplet } from "./Nom_Prenom"; // Fonction de conversion du nom complet
import axios from "axios"; // Bibliothèque axios pour les requêtes HTTP

// Page de mise à jour des rôles des utilisateurs
const MAJ_Role = () => {
  // État pour stocker les profils des utilisateurs
  const [profile, setProfile] = useState([]);
  
  // Récupérer les profils des utilisateurs depuis l'API lors du chargement initial
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://127.0.0.1:8000/maj/getutilisateurs/");
      setProfile(response.data);
    };
    fetchData();
  }, []);

  // État pour stocker le rôle actuel de l'utilisateur connecté et son nom
  const [role, setRole] = useState("");
  const [nom, setNom] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("http://127.0.0.1:8000/Get_user_by_id/", {
        user_id: localStorage.getItem("user_id"),
      });
      setNom(response.data[0].nom_complet);
      setRole(localStorage.getItem("role"));
    };
    fetchData();
  }, []);

  // Fonction pour gérer le changement de rôle d'un utilisateur
  const handleChange = async (e, index) => {
    const { value } = e.target;
    const id = profile[index].utilisateur_id;
    await axios.patch("http://127.0.0.1:8000/maj/Modifrole/", {
      User_id: id,
      role: value,
    });
    const newProfile = [...profile];
    newProfile[index].role = value;
    setProfile(newProfile);
  };

  // Rendu JSX de la page de mise à jour des rôles
  return (
    <div className="flex flex-row h-full bg-white">
      <div className="w-[14.58%] h-screen shadow-[0_0_25px_rgba(0,0,0,0.25)] z-10 fixed top-0 min-w-[130px] bg-white">
        <SearchSideBar page={3} /> {/* Composant de la barre latérale de recherche */}
      </div>
      <div className="flex-grow ml-[max(130px,14.58%)]">
        <SearchNavBar text="Mise à jour" role={role} nom={nom} /> {/* Composant de la barre de navigation de recherche */}
        <div className="flex justify-start items-center gap-4 my-12 mx-10 text-2xl font-semibold">
          Liste des Utilisateurs
        </div>
        <div className="flex flex-col box mx-8">
          <div className="border border-gray-200">
            <div className="grid grid-cols-4 gap-4 py-6 px-8 md:ml-20 ml-2 text-sm font-medium">
              <div>Nom</div>
              <div>Prénom</div>
              <div>Email</div>
              <div className="ml-4">Statut</div>
            </div>
          </div>
          {/* Mapper les profils des utilisateurs pour les afficher */}
          {profile.map((prof, index) => {
            const { prenom, nom } = convertNomComplet(prof.nom_complet);
            return (
              <div key={index}>
                <div className={index % 2 == 0 ? "bg-white" : "bg-[#F3F7FC]"}>
                  <div className="grid grid-cols-4 gap-4 md:ml-20 ml-2 py-6 px-8 md:text-sm text-xs">
                    <div>{nom}</div>
                    <div>{prenom}</div>
                    <div>{prof.email}</div>
                    <div>
                      {/* Sélecteur pour choisir le rôle de l'utilisateur */}
                      <select
                        name=""
                        id=""
                        value={prof.role}
                        onChange={(e) => handleChange(e, index)}
                        className={
                          prof.role == "assistant"
                            ? "rounded-lg bg-[#B3DA08] py-2 md:px-6 px-1 md:ml-4 ml-0 font-medium"
                            : prof.role == "chercheur"
                              ? "rounded-lg py-2 md:px-6 px-1 md:ml-4 ml-0 bg-[#63A0CD] text-white font-medium"
                              : prof.role == "directeur"
                                ? "rounded-lg py-2 md:px-6 px-1 md:ml-4 ml-0 bg-[#D1F427] font-medium"
                                : "rounded-lg py-2 md:px-6 px-1 md:ml-4 ml-0 bg-[#244964] text-white font-medium"
                        }
                      >
                        <option value="assistant">Assistant</option>
                        <option value="chercheur">Chercheur</option>
                        <option value="directeur">Directeur</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MAJ_Role;
