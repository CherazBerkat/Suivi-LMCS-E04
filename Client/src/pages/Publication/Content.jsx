/* eslint-disable react/prop-types */

import icon1 from "../../assets/icons/users-more.svg";
import icon2 from "../../assets/icons/calendar.svg";
import icon3 from "../../assets/icons/document-filled.svg";
import Bouton from "./Bouton";
import "./Publication.css";
import { useNavigate } from "react-router-dom";

export default function Content({
  titre,
  redacteurs,
  annee_creaction,
  nbvol,
  nbpage,
  url,
  profile,
}) {
  // Obtention des noms des rédacteurs et les séparer par des virgules
  const nomsChercheurs = redacteurs.map((chercheur) => chercheur.nom);
  const nomsSeparesParVirgules = nomsChercheurs.join(", ");
  
  // Initialisation du hook de navigation
  const navigate1 = useNavigate();

  // Fonction de gestion du clic sur le bouton pour modifier la publication
  const handleClickProfile = () => {
    // Redirection vers la page de modification de la publication en fonction du profil
    profile === true
      ? navigate1("/pub/modifier_pub", {
          state: { profile: true, titre_publication: titre },
        })
      : navigate1("/pub/modifier_pub", {
          state: { profile: false, titre_publication: titre },
        });
  };

  return (
    <>
      <div
        id="titre-pub"
        className="font-medium text-text_blue text-[35px] pt-16 px-16 w-3/4"
      >
        {titre}
      </div>
      <div
        className="flex flex-col items-end bg-bg_yellow"
        id="publication-content"
      >
        <div className="flex flex-col gap-5  items-start p-[64px] w-full">
          <div
            className="flex flex-row gap-2 items-center text-[20px] "
            id="publication-info"
          >
            <div>
              <img src={icon1} alt="icon" />
            </div>
            <div className="text-main_blue ">Rédacteurs:</div>
            <div id="publication-redacteurs">{nomsSeparesParVirgules}</div>
          </div>

          <div
            className="flex flex-row gap-2 items-center text-[20px]"
            id="publication-info"
          >
            <div>
              <img src={icon2} alt="icon" />
            </div>
            <div className="text-main_blue ">année de création:</div>
            <div> {annee_creaction}</div>
          </div>

          <div
            className="flex flex-row gap-2 items-center text-[20px] "
            id="publication-info"
          >
            <div>
              <img src={icon3} alt="icon" />
            </div>
            <div className="text-main_blue ">Nombre De Volumes:</div>
            <div> {nbvol}</div>
          </div>

          <div
            className="flex flex-row gap-2 items-center text-[20px] "
            id="publication-info"
          >
            <div>
              <img src={icon3} alt="icon" />
            </div>
            <div className="text-main_blue ">Nombre De Pages:</div>
            <div> {nbpage}</div>
          </div>
        </div>

        <div className="pb-8 flex flex-row" id="publication-buttons">
          <div>
            {/* Affichage du bouton pour modifier la publication si le profil est actif */}
            {profile && (
              <Bouton
                text="Modifier la publication"
                color="bg-gris"
                strockcolor="border-none"
                margin="mr-[16px] mb-[16px]"
                onClick={handleClickProfile}
              />
            )}
          </div>

          {/* Bouton pour voir la publication */}
          <div>
            <Bouton
              text="Voir la publication"
              color="bg-main_blue"
              strockcolor="border-none"
              margin="mr-[128px]"
              url={url}
            />
          </div>
        </div>
      </div>
    </>
  );
}
