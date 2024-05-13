/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchSideBar from "../../components/Search-side-bar/SearchSideBar"; // Import du composant SearchSideBar
import SearchNavBar from "../../components/nav-bars/SearchNavBar"; // Import du composant SearchNavBar
import mail from "../../assets/icons/mail.svg"; // Import de l'icône mail
import axios from "axios"; // Import de axios

export default function MonProfileAss() {
  const location = useLocation(); // Utilisation du hook useLocation pour obtenir l'objet de localisation de l'URL
  const { User_id } = location.state; // Extraction de User_id à partir de location.state
  console.log("User_id:", User_id); // Affichage de User_id dans la console

  const [profile, setProfile] = useState({ // Initialisation du state profile avec un objet vide
    utilisateur_id: "",
    email: "",
    role: "",
    nom_complet: "",
    photo_url: "",
  });

  useEffect(() => {
    const fetchProfile = async () => { // Définition de la fonction asynchrone fetchProfile
      try {
        const response = await axios.post( // Envoi d'une requête POST avec axios
          "http://127.0.0.1:8000/profil/user_personal_info/", // URL de l'API
          { User_id: User_id } // Données à envoyer dans le corps de la requête
        );
        setProfile(response.data); // Mise à jour du state profile avec les données de la réponse
      } catch (err) {
        console.log(err); // Gestion des erreurs en affichant l'erreur dans la console
      }
    };
    fetchProfile(); // Appel de la fonction fetchProfile lors du premier rendu et à chaque changement de User_id
  }, [User_id]);

  return (
    <div className="flex flex-row h-screen ">
      <div className="w-[14.58%] h-screen shadow-[0 0 25px rgba(0,0,0,0.25)] z-10 fixed top-0 min-w-[130px]">
        <SearchSideBar page={4} visiteur={false} /> {/* Affichage du composant SearchSideBar */}
      </div>
      <div className="flex-grow  ml-[max(130px,14.58%)] h-screen bg-bg_yellow justify-center   ">
        <SearchNavBar
          text="Profile"
          role="Chercheur"
          nom="Balla Amar"
          visiteur={false}
        /> {/* Affichage du composant SearchNavBar */}
        <div style={{ marginTop: "16px" }}>
          <div className="flex justify-center items-center">
            <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-[1057px] gap-16 md:px-8 md:py-2.5 rounded-lg bg-white shadow-md">
              <div className="flex items-center relative gap-1.5">
                <img
                  className="rounded-full"
                  src={profile.photo_url}
                  alt="Chercheur"
                  style={{
                    width: "14vw",
                    height: "14vw",
                    maxWidth: "120px",
                    maxHeight: "120px",
                  }}
                />
                <div className="flex flex-col justify-center items-start relative space-y-[-8px]">
                  <p className="text-[30px] font-semibold uppercase text-bg_black">
                    {profile.nom_complet}
                  </p>
                  <p className="text-[18px] font-light text-center text-bg_black">
                    {profile.role}
                  </p>
                </div>
              </div>
              <div className="hidden md:block w-0.5 h-[200px] bg-[#dcdcdc]" />
              <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 space-y-[-3px]">
                <Info icon={mail} label="E-mail :" value={profile.email} /> {/* Affichage du composant Info */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Info Component
const Info = ({ icon, label, value }) => (
  <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-2.5 py-[5px]">
    <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative">
      <img src={icon} alt={label} /> {/* Affichage de l'icône */}
    </div>
    <p className="flex-grow-0 flex-shrink-0 text-[20px] text-left">
      <span className="flex-grow-0 flex-shrink-0 text-[20px] text-left text-main_blue">
        {label}
      </span>
      <span className="flex-grow-0 flex-shrink-0 text-[20px] text-left text-bg_black">
        {value}
      </span>
    </p>
  </div>
);
