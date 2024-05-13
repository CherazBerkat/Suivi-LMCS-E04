/* eslint-disable react/prop-types */
// AboutCard component definition
export default function AboutCard({ contenu, title, num }) {
  // Rendering the component
  return (
    <div
      // Classname for styling
      className={`pub-card group bg-pure_white w-[416px] h-[253px] rounded-[3px] px-4 py-2 shadow-[0_0_10px_0_rgba(0,0,0,0.25)] flex flex-col ${num ? "gap-0" : "gap-8"} items-center hover:bg-[#4646461A] hover:scale-[1.02] hover:duration-300 active:scale-95 active:duration-300 group-hover:font-semibold`}
    >
      {/* Rendering title if provided */}
      <h5
        className={`text-[25px] leading-[35.5px] font-medium ${title ? "" : "hidden"}`}
      >
        {title}
      </h5>
      {/* Rendering content */}
      {contenu}
    </div>
  );
}
