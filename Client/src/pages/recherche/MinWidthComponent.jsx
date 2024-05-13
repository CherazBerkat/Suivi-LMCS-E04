import { useEffect } from "react";

// Composant pour gérer la largeur minimale de la fenêtre
export default function MinWidthComponent() {
  const minWidth = 675; // Largeur minimale requise

  // Effet pour écouter les changements de taille de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      // Vérifie si la largeur de la fenêtre est inférieure à la largeur minimale requise
      if (window.innerWidth < minWidth) {
        return;
      } else {
        // Supprime l'écouteur d'événements de redimensionnement lorsque la largeur est suffisante
        window.removeEventListener("resize", handleResize);
      }
    };
    // Ajoute un écouteur d'événements de redimensionnement lors du montage du composant
    window.addEventListener("resize", handleResize);
    // Supprime l'écouteur d'événements de redimensionnement lors du démontage du composant
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Dépendance vide pour exécuter l'effet une seule fois lors du montage du composant
}
