// Disabling eslint rule for prop types
/* eslint-disable react/prop-types */

// Exporting the Bouton component
export default function Bouton({
  text,
  icon,
  color,
  strockcolor,
  margin,
  clickHandler,
}) {
  // Rendering the component
  return (
    <button
      type="button"
      className={` ${margin} border ${strockcolor} border-[1px] h-[3rem] w-fit px-[8px] py-1 ${color} text-xs font-semibold rounded shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-hover_yellow hover:scale-[1.02] hover:duration-300 focus:bg-pressed_yellow active:scale-95 active:duration-300`}
      onClick={() => clickHandler()}
    >
      <div className="flex flex-row justify-center items-center gap-[1px] font-bold text-[13px]">
        {text}
        {icon && <img src={icon} width="30px" />}
      </div>
    </button>
  );
}
