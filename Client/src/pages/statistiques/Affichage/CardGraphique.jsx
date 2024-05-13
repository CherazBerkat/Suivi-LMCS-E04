/* eslint-disable react/prop-types */
// Carte graphique avec ajustement de taille en fonction de la fenêtre
import { useState, useEffect } from "react";

export default function CardGraphoque({ contenu }) {
  // État pour stocker la largeur de la fenêtre
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effet pour mettre à jour la largeur de la fenêtre lors du redimensionnement
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Dépendance vide pour exécuter l'effet une seule fois après le montage initial

  // Rendu conditionnel de la taille de la carte en fonction de la largeur de la fenêtre
  return (
    <div
      className={` ${
        windowWidth > 680
          ? "w-[511.5px] h-[334px]"
          : windowWidth > 582
          ? "w-[400px] h-[300px]"
          : "w-[340px] h-[280px]"
      } bg-pure_white shadow-[0_0_25px_0_rgba(0,0,0,0.25)] rounded-[12px] p-8 text-black`}
    >
      {contenu}
    </div>
  );
}
