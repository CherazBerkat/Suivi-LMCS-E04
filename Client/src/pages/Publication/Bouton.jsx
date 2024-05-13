/* eslint-disable react/prop-types */

export default function Bouton({
  text,
  icon,
  color,
  strockcolor,
  margin,
  url,
  onClick,
}) {
  // Composant de bouton avec lien facultatif
  return (
    <button
      type="button"
      className={` ${margin} border  ${strockcolor} border-[1px] h-[2.75rem] w-fit px-[32px] py-1 ${color} text-xs font-semibold rounded-[45px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-hover_yellow hover:scale-[1.02] hover:duration-300  active:scale-95 active:duration-300 `}
      onClick={onClick}
    >
      <div className=" flex flex-row justify-center items-center gap-[1px] font-medium text-[16px] text-pure_white">
        {/* Lien optionnel */}
        <a href={url}>{text}</a>

        {/* Affichage de l'icône si elle est présente */}
        {icon && <img src={icon} width="30px" />}
      </div>
    </button>
  );
}
