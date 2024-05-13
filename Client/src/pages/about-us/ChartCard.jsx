/* eslint-disable react/prop-types */
export default function AChartCard({ contenu, title, width, height }) {
  return (
    <div
      className={`pub-card group bg-bg_black ${width} ${height} rounded-[3px] px-4 py-2 flex flex-col gap-0 items-center hover:scale-[1.02] hover:duration-300 group-hover:font-semibold`}
    >
      <h5
        className={`text-[25px] leading-[35.5px] font-medium pl-8 text-pure_white text-center ${title ? "" : "hidden"}`}
      >
        {title}
      </h5>
      {contenu}
    </div>
  );
}
