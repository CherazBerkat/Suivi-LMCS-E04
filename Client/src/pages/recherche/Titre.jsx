/* eslint-disable react/prop-types */
// Composant de titre avec option de clic
export default function Titre({ text, icon, clickHandler }) {
  return (
    <>
      <div
        className="bg-pure_white flex flex-row justify-between items-center font-bold text-[20px] w-full cursor-pointer"
        onClick={() => clickHandler()}
      >
        {text}
        {icon && <img src={icon} />}
      </div>
    </>
  );
}
