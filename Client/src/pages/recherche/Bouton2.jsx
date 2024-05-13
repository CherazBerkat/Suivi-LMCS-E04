/* eslint-disable react/prop-types */
// push forms in array to filter result : Bouton

export default function Bouton2({
  text,
  icon,
  color,
  strockcolor,
  margin,
  clickHandler,
}) {
  return (
    <button
      type="button"
      onClick={() => {
        clickHandler();
      }}
      className={` ${margin} border  ${strockcolor} border-[2px] h-[2.5rem] w-full px-[20px] py-1 my-2 ${color} text-xs * rounded-[2px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-hover_yellow hover:scale-[1.02] hover:duration-300  active:scale-95 active:duration-300 `}
    >
      <div className=" flex flex-row justify-center items-center gap-[1px] font-medium text-[13px] text-pure_white">
        {text}
        {icon && <img src={icon} width="30px" />}
      </div>
    </button>
  );
}
