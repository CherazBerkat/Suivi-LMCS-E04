// Importing necessary hooks and components
import { useState, useEffect } from "react";
import TeamSec from "./TeamSec";
import SecTitle from "./SecTitle";
import axios from "axios";

// Exporting the SecTwo component
export default function SecTwo() {
  // State variable for team data
  const [tabobj, setTabObj] = useState([]);

  // Effect hook to fetch data on component mount
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios("http://127.0.0.1:8000/About_us/ourTeam");
        setTabObj(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  // Function to find team by name
  function findTeam(arr, nom) {
    const formattedName = nom.toLowerCase().replace(/\s/g, "");
    const foundObject = arr.find((obj) => {
      const objName = obj.nom.toLowerCase().replace(/\s/g, "");
      return objName === formattedName;
    });
    return foundObject;
  }

  // State variable for window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect hook to update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Rendering the component
  return (
    <div className="flex flex-col gap-4 ">
      {/* Section title */}
      <SecTitle text="Equipes De Recherche" textColor="text-pure_white" />
      <div className={`flex flex-col py-8 ${windowWidth > 1191 ? "px-24" : "px-4"} gap-16 items-center`}>
        {/* Team sections */}
        <TeamSec team={findTeam(tabobj, "EIAH")} aboutTeam="L’équipe EIAH est une équipe pluridisciplinaire. Elle comporte non seulement des chercheurs en informatique mais également en électronique, mathématique et anglais. Ainsi, les thématiques traitées par l’équipe relèvent de l’intérêt des membres, des sujets d’actualité dans le domaine des EIAH et aussi des besoins spécifiques de l’école." one={true} id="one" />
        <TeamSec team={findTeam(tabobj, "Codesign")} aboutTeam="L’équipe « systèmes embarqués » développe des méthodes de conception de différents types de systèmes embarqués communicants. Ces derniers, contrairement à des systèmes classiques, présentent diverses contraintes telles que l’espace, le temps, l’énergie consommée, la fiabilité…" one={false} id="two" />
        <TeamSec team={findTeam(tabobj, "Managment des systèmes d’information")} aboutTeam="L’équipe s’intéresse aux problèmes d’Ingénierie des besoins des systèmes d’information et de  l’Aide à la décision pour une efficacité du pilotage à tous les niveaux de l’organisation. L’équipe se focalise ainsi sur les problèmes d’Ingénierie des connaissances et des compétences en situation intra et inter-organisationnelle d’une part et les technologies de l’entreprise 2.0 support d’autre part." one={true} id="three" />
        <TeamSec team={findTeam(tabobj, "Optimisation")} aboutTeam="L’équipe l‘optimisation s’intéresse à différents types de problèmes NP-Difficile (mono-objectif/ Multi-objectif), à leur modélisation et à leur résolution. Plusieurs méthodes de résolution (exacte et approchée) sont étudiées/proposées ainsi que plusieurs approches de collaboration séquentielles et parallèles (Grille de calcul, GPU). Nous nous intéressons également à l’application du data mining dans la résolution de ces problèmes." one={false} id="four" />
        <TeamSec team={findTeam(tabobj, "Sures")} aboutTeam="Les travaux de l’équipe SURES s’articulent autour de la conception de Systèmes Ubiquitaires Résilients Efficaces et Sécurisés. L’équipe s’intéresse donc en particulier à l’ingénierie de systèmes de communication sans fil et mobiles sous de fortes contraintes de ressources et requérant un haut niveau de disponibilité et de résilience étant donné la nature sensible de leurs applications sous-jacentes dans divers domaines : santé (smart health), distribution (smart grid, fleet management), smart cities, agriculture (smart farms), domotique, etc." one={true} id="five" />
        <TeamSec team={findTeam(tabobj, "Traitement et interpretation des images")} aboutTeam="Thématiques et axes de recherche : Segmentation des images Interprétation et annotation des images Recalage des images Objectifs scientifiques et techniques : Conception et construction de modèles CNN-3D pour diverses applications Application des CNN développés sur des bases de données d’images collectée localement dans les centres d’imagerie et les hôpitaux algériens." one={false} id="six" />
      </div>
    </div>
  );
}
