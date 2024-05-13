// Composant PubCard pour afficher une carte de publication
import { useState } from "react";
export default function PubCard({ nbpages, nom, authors }) {
  // Vérifier si le nombre d'auteurs dépasse 3 et ajouter "Voire plus..." si c'est le cas
  if (authors.length > 3) {
    authors = authors.slice(0, 3);
    authors.push("Voire plus...");
  }
  // Tronquer le nom s'il dépasse 20 caractères
  const truncatedName = nom.length > 20 ? nom.substring(0, 20) + "..." : nom;
  // État pour suivre le survol de la carte
  const [isHovered, setIsHovered] = useState(false);

  // Rendu JSX de la carte de publication
  return (
    <a
      href=""
      className="pub-card group bg-pure_white w-[416px] h-[253px] rounded-[3px] p-8 shadow-[0_0_10px_0_rgba(0,0,0,0.25)] flex flex-col gap-4 items-center hover:bg-[#4646461A] hover:scale-[1.02] hover:duration-300 active:scale-95 active:duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-row justify-between items-center text-main_blue leading-[28.5px] font-medium w-full group-hover:font-semibold">
        <h5 className="text-[19px] group-hover:text-[20px] overflow-clip">
          {isHovered ? nom : truncatedName}
        </h5>
        <h6 className="text-[15px] group-hover:text-[17px]">{nbpages} pages</h6>
      </div>
      <ul className="text-[19px] leading-[28.5px] font-medium text-[#30353C] group-hover:opacity-100 text-center">
        {authors}
      </ul>
    </a>
  );
}
