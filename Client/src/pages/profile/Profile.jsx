/* eslint-disable react/prop-types */
import ProfileChercheur from "./ProfileChercheur"; // Import du composant ProfileChercheur
import ProfileAss from "./ProfileAss"; // Import du composant ProfileAss

export default function Profile({ isAssitant, infoUser, matricule }) {
  return (
    <>
      <div>
        {isAssitant ? (
          // Affichage du composant ProfileAss si l'utilisateur est un assistant
          <ProfileAss User_id={infoUser} />
        ) : (
          // Affichage du composant ProfileChercheur si l'utilisateur est un chercheur
          <ProfileChercheur User_id={infoUser} Matricule={matricule} />
        )}
      </div>
    </>
  );
}
