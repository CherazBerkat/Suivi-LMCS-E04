/* eslint-disable react/prop-types */
// Carte numérique avec texte et nombre
export default function CardNum({ text, num }) {
  return (
    <div className="h-[150px] w-[300px] bg-pure_white shadow-[0_0_5px_0_rgba(0,0,0,0.25)] rounded-[12px] py-4 px-8 flex flex-row items-center gap-8">
      {/* Affichage du nombre */}
      <p className="text-main_blue font-semibold text-[30px] leading-[45px] ">
        {num}
      </p>
      {/* Affichage du texte */}
      <p className="text-[18px] leading-[27px] font-semibold w-[181px] text-center ">
        {text}
      </p>
    </div>
  );
}
