// Disabling eslint rule for prop types
/* eslint-disable react/prop-types */

// Exporting the Titre component
export default function Titre({ text, icon, clickHandler }) {
  // Rendering the component
  return (
    <>
      <div
        className="bg-pure_white flex flex-row justify-center items-center font-bold text-[25px] w-full cursor-pointer"
        onClick={() => clickHandler()}
      >
        {text}
        {icon && <img src={icon} />}
      </div>
    </>
  );
}
