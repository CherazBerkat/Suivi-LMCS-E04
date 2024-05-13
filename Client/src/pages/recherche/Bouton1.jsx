/* eslint-disable react/prop-types */
// Bouton1 : pour afficher le pop up ou le masquer

export default function Bouton1({
  text,
  icon,
  color,
  strockcolor,
  margin,
  clickHandler,
}) {
  return (
    <button
      onClick={() => clickHandler()}
      className={` ${margin} border  ${strockcolor} border-[2px] h-[3rem] w-fit px-[10px] py-1 my-2 ${color} text-xs rounded-[2px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-hover_yellow hover:scale-[1.02] hover:duration-300  active:scale-95 active:duration-300 `}
    >
      <div className="flex flex-row justify-center items-center gap-[1px] font-bold text-[13px] text-pure_black">
        {text}
        {icon && <img src={icon} width="30px" className="ml-[5px]" />}
      </div>
    </button>
  );
}
