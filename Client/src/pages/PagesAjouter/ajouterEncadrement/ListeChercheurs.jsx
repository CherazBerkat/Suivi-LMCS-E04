/* eslint-disable react/prop-types */ // Désactivation des avertissements de propTypes pour ce composant

// Composant ListChercheurs utilisé pour afficher une liste de membres
export default function ListChercheurs({ ListMembres }) {
  return (
    <div>
      <div
        id="button-members"
        className="flex flex-row gap-[10px] flex-wrap  py-2 "
      >
        {ListMembres.map((option, index) => (
          <div
            className=" bg-gris w-fit px-[16px] h-[40px] items-center rounded-[5px] justify-center flex flex-row gap-[5px] text-pure_white text-[18px] font-medium "
            key={index}
          >
            <div>{option.NomDeChercheur}</div> {/* Affichage du nom du chercheur */}
            <div className="font-light px-3">|</div> {/* Séparateur */}
            <div>{option.RoleDeChercheur}</div> {/* Affichage du rôle du chercheur */}
          </div>
        ))}
      </div>
    </div>
  );
}
