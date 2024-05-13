// Composant ListChercheurs utilisé pour afficher une liste de chercheurs avec leurs noms et rôles

export default function ListChercheurs({ ListeMembres }) {
  return (
    <div>
      <div
        id="button-members" // ID du conteneur des membres
        className="flex flex-row gap-[10px] flex-wrap  py-2 " // Classe CSS du conteneur avec des styles dynamiques
      >
        {ListeMembres.map((option, index) => (
          <div
            className=" bg-gris w-fit px-[16px] h-[40px] items-center rounded-[5px] justify-center flex flex-row gap-[5px] text-pure_white text-[18px] font-medium " // Classe CSS de chaque membre avec des styles dynamiques
            key={index} // Clé unique pour chaque membre
          >
            <div>{option.NomDeChercheur}</div> {/* Nom du chercheur */}
            <div className="font-light px-3">|</div> {/* Séparateur */}
            <div>{option.RoleDeChercheur}</div> {/* Rôle du chercheur */}
          </div>
        ))}
      </div>
    </div>
  );
}
