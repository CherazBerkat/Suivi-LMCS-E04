/* eslint-disable react/prop-types */
export default function ButRest(props) {
  return (
    <button
      className={`${props.width} py-4 bg-main_yellow text-md font-semibold rounded shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-hover_yellow hover:scale-[1.02] hover:duration-300  focus:bg-pressed_yellow active:scale-95 active:duration-300 `}
    >
      {props.text}
    </button>
  );
}
