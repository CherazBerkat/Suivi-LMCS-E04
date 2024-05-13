/* eslint-disable react/prop-types */ // Désactive les avertissements de propTypes pour ce fichier

import ProfilePic from "../../../components/profile-pic/ProfilePic"; // Importe le composant ProfilePic

// Définit le composant Member avec des propriétés name, role, img et fonction
export default function Member({ name, role, img, fonction }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-fit h-fit">
      <ProfilePic src={img} width="w-[130px]" height={"h-[130px]"} /> {/* Affiche l'image du profil */}
      <div className="flex flex-col items-center justify-center text-center text-pure_white">
        <h4 className="uppercase text-[25px] leading-[37.5px] font-bold"> {/* Affiche le nom en majuscules */}
          {name}
        </h4>
        <h5 className="uppercase text-[13px] leading-[19.5px] font-semibold "> {/* Affiche la fonction en majuscules */}
          {fonction}
        </h5>
        <h6 className="lowercase text-[12px] leading-[18px] font-normal"> {/* Affiche le rôle en minuscules */}
          {role}
        </h6>
      </div>
    </div>
  );
}
