// Import de l'icône PlusBlue
import PlusBlue from "../../../assets/icons/plusblue.svg";
// Import des hooks useEffect et useState depuis React
import { useEffect, useState } from "react";
// Import des styles CSS spécifiques pour NumberCard
import "./NumberCard.css";

// Définition du composant NumberCard
export default function NumberCard({ start, end, text }) {
  // Tableau pour stocker les nombres à afficher
  const numtab = [];
  numtab.push(end);
  for (let i = start; i <= end; i++) {
    numtab.push(i);
  }

  // Création du JSX pour les nombres à afficher
  const tab = numtab.map((num, index) => (
    <p
      className="text-steel_blue font-semibold text-[50px] leading-[75px] scrollUp"
      key={index}
    >
      {num}
    </p>
  ));

  // État pour contrôler le chargement des nombres
  const [loaded, setLoaded] = useState(true);

  // Effet pour changer l'état de chargement après un délai
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(false);
    }, 3800);

    return () => clearTimeout(timeout);
  }, []);

  // Rendu du composant NumberCard
  return (
    <div
      className="flex flex-col justify-center items-center rounded-[2px] bg-pure_white bg-opacity-65 w-[213px] px-8 py-4
      shadow-[0_0_10px_0_rgba(0,0,0,0.25)]"
    >
      <div className=" grid grid-cols-4 items-center justify-center px-3">
        <img src={PlusBlue} />
        <div className="col-span-3">
          <div className="flex flex-col items-center justify-start h-[80px] truncate">
            {/* Condition pour afficher soit les nombres soit le dernier nombre */}
            {loaded ? tab : tab[tab.length - 1]}
          </div>
        </div>
      </div>
      <p className="font-medium text-[25px] leading-[37.5px]">{text}</p>
    </div>
  );
}
