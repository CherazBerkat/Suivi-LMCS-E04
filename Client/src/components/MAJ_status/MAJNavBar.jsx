/* eslint-disable react/prop-types */
export default function MAJNavBar(props) {
  return (
    <div>
      <div className="px-8 py-2.5 bg-pure_white sticky top-0 z-10 flex flex-row justify-between items-center shadow-[0_0_25px_rgba(0,0,0,0.25)]">
        {props.content}
      </div>
    </div>
  );
}
