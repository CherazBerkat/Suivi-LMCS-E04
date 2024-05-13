/* eslint-disable react/prop-types */
import "./Cardpub.css";
import { useNavigate } from "react-router-dom";

export function Cardpub({ publication, profile }) {
  const {
    titre_publication,
    nombre_pages,
    date_publication,
    Authors,
    ConfJournal_id,
  } = { ...publication };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Publication", {
      state: { titre_publication, date_publication, ConfJournal_id, profile },
    });
  };
  return (
    <div
      className="relative px-4 py-3.5  gap-4  .2xl:w-full rounded bg-white flex flex-col  shadow-[0_2px_4px_rgba(0,0,0,0.25)]  focus:bg-bg_yellow focus:shadow-none hover:bg-slate-100 hover:scale-[1.02] hover:duration-300  active:scale-95 active:duration-300"
      id="card"
      onClick={handleClick}
    >
      <div className="flex flex-row justify-between">
        <h2 className="self-stretch text-main_blue text-lg font-medium">
          {titre_publication}
        </h2>
        <p className="text-right text-neutral-700 text-opacity-50 text-base font-medium">
          {" "}
          nombre de pages: {nombre_pages}
        </p>
      </div>

      <div className="self-stretch text-black text-base font-normal">
        <p>{Authors.join("; ")}</p>
      </div>
      <p className="text-right text-neutral-700 text-opacity-50 text-base font-medium">
        année {date_publication}
      </p>
    </div>
  );
}

export default Cardpub;
