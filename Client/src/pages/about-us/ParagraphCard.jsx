/* eslint-disable react/prop-types */
export default function ParagraphCard({ contenu }) {
  return (
    <div className="bg-[#646464] bg-opacity-[15%] p-8 text-pure_white min-w-[432.4px] w-[519px] rounded-[5px] shadow-[0_0_5px_0_rgba(255,255,255,0.25)] text-[19px] leading-[28.5px] hover:scale-[1.02] hover:duration-300 group-hover:font-semibold">
      {contenu}
    </div>
  );
}
