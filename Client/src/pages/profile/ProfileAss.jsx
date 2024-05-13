/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import SearchSideBar from "../../components/Search-side-bar/SearchSideBar"; // Import du composant SearchSideBar
import SearchNavBar from "../../components/nav-bars/SearchNavBar"; // Import du composant SearchNavBar
import mail from "../../assets/icons/mail.svg"; // Import de l'icône mail
import axios from "axios"; // Import de axios

export default function ProfileAss({ User_id }) {
  const [profile, setProfile] = useState({
    utilisateur_id: "",
    email: "",
    role: "",
    nom_complet: "",
    photo_url: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/profil/user_personal_info/",
          { User_id: User_id }
        );
        setProfile(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, [User_id]);

  return (
    <div className="flex flex-row h-screen ">
      <div className="w-[14.58%] h-screen shadow-[0 0 25px rgba(0,0,0,0.25)] z-10 fixed top-0 min-w-[130px]">
        <SearchSideBar page={1} visiteur={false} />
      </div>
      <div className="flex-grow  ml-[max(130px,14.58%)] h-screen bg-bg_yellow justify-center   ">
        <SearchNavBar
          text="Recherche"
          role="Chercheur"
          nom="Balla Amar"
          visiteur={false}
        />
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
                <Info icon={mail} label="E-mail :" value={profile.email} />
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
      <img src={icon} alt={label} />
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
