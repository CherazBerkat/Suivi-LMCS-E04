/* eslint-disable react/prop-types */ // Désactivation de l'avertissement lié à la validation des types de propriétés dans les composants React
export default function TeamCard({ nom, list, jr, mois, year }) {
  return (
    <div className="bg-pure_black p-4 rounded-[3px] shadow-[0_0_5px_0_rgba(255,255,255,0.25)] min-h-[324.5px] w-[378px] flex flex-col gap-10">
      <h2 className="text-[30px] leading-[45px] font-bold text-main_blue w-full text-center">
        {nom}
      </h2>
      {list}
      <p className=" w-full text-[15px] leading-[22.5px] text-[#FDFFE5] text-end">
        Mis à jour le: {jr}/{mois}/{year}
      </p>
    </div>
  );
}
