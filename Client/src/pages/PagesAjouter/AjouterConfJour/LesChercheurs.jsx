/* eslint-disable react/prop-types */ // Désactivation des avertissements liés aux types des props

export default function ListChercheurs({ listClassement }) {
  return (
    <div>
      <div
        id="button-members"
        className="flex flex-row gap-[10px] flex-wrap  py-2 "
      >
        {/* Affichage de la liste des chercheurs */}
        {listClassement.map((option, index) => (
          <div
            className=" bg-gris w-fit px-[16px] h-[40px] items-center rounded-[5px] justify-center flex flex-row gap-[5px] text-pure_white text-[18px] font-medium "
            key={index}
          >
            <div>{option.nom}</div> {/* Affichage du nom du chercheur */}
            <div className="font-light px-3">|</div> {/* Séparateur */}
            <div>{option.rang}</div> {/* Affichage du rang du chercheur */}
          </div>
        ))}
      </div>
    </div>
  );
}
