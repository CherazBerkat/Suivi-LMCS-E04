/* eslint-disable react/prop-types */ // Désactivation des avertissements de propTypes pour ce composant

// Composant ListeEtudiants utilisé pour afficher une liste d'étudiants
export default function ListeEtudiants({ listEtudiants }) {
  return (
    <div>
      <div
        id="button-members"
        className="flex flex-row gap-[10px] flex-wrap  py-2 "
      >
        {listEtudiants.map((option, index) => (
          <div
            className=" bg-gris w-fit px-[16px] h-[40px] items-center rounded-[5px] justify-center flex flex-row gap-[5px] text-pure_white text-[18px] font-medium "
            key={index}
          >
            <div>{option}</div> {/* Affichage du nom de l'étudiant */}
          </div>
        ))}
      </div>
    </div>
  );
}
