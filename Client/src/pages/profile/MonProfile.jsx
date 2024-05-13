/* eslint-disable react/prop-types */
import MonProfileChercheur from "./MonProfileChercheur"; // Import du composant MonProfileChercheur
import MonProfileAss from "./MonProfileAss"; // Import du composant MonProfileAss

export default function MonProfile() {
  const role = localStorage.getItem(role); // Récupération du rôle de l'utilisateur depuis le stockage local
  const User_id = localStorage.getItem(User_id); // Récupération de l'identifiant de l'utilisateur depuis le stockage local
  const matricule = localStorage.getItem(matricule); // Récupération du matricule de l'utilisateur depuis le stockage local
  
  return (
    <>
      <div>
        {/* Condition ternaire pour afficher le profil de l'assistant ou du chercheur en fonction du rôle */}
        {role == "assistant" ? (
          <MonProfileAss User_id={User_id} /> // Affichage du profil de l'assistant
        ) : (
          <MonProfileChercheur User_id={User_id} Matricule={matricule} /> // Affichage du profil du chercheur
        )}
      </div>
    </>
  );
}
