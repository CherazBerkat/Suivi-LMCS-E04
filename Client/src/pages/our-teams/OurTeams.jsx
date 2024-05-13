/* eslint-disable react-hooks/exhaustive-deps */ // Désactivation de l'avertissement lié à l'utilisation exhaustive des dépendances dans les hooks
import LandingNavBar from "../../components/nav-bars/LandingNavBar"; // Import du composant de la barre de navigation de la page d'accueil
import TeamCard from "./TeamCard"; // Import du composant de la carte d'équipe
import { useState, useEffect } from "react"; // Import des hooks useState et useEffect depuis React
//import { useSpring, animated } from "react-spring"; // Import des fonctions useSpring et animated depuis react-spring
import "./Teams.css"; // Import du fichier CSS pour les équipes
import axios from "axios"; // Import d'axios pour les requêtes HTTP

export default function OurTeams() {
  const [tabobj, setTabObj] = useState([
    {
      nom: "",
      members: [],
      chef_equipe: "",
    },
  ]); // Initialisation de l'état pour les équipes
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/our_team/");
        setTabObj(res.data); // Mise à jour des données des équipes
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []); // Exécution de l'effet uniquement lors du montage du composant

  const jr = new Date().getDay();
  const mois = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const midtab = (tab) => {
    return tab.members.map((e, i) => (
      <li
        key={i}
        className="flex flex-row items-center gap-[10px] group cursor-default"
      >
        <p className="bg-main_yellow rounded-full h-[26px] w-[26px] text-center group-hover:bg-[#464646]">
          {i + 2}
        </p>
        <p className="text-pure_white group-hover:text-main_yellow">{e}</p>
      </li>
    ));
  };

  const newTab = (tab) => (
    <ul className="text-[20px] leading-[30px] font-medium flex flex-col items-start gap-10">
      <li
        key={tab.chef_equipe}
        className="flex flex-row items-center gap-[10px] group cursor-default"
      >
        <p className="bg-main_yellow rounded-full h-[26px] w-[26px] text-center group-hover:bg-[#464646]">
          1
        </p>
        <p className="text-pure_white group-hover:text-main_yellow">
          Chef d'équipe:{" "}
          <span
            className="font-normal
          "
          >
            {tab.chef_equipe}
          </span>
        </p>
      </li>
      {midtab(tab)}
    </ul>
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Exécution de l'effet uniquement lors du montage du composant

  const length =
    tabobj % 3 == 0
      ? (tabobj.length - (tabobj.length % 3)) / 3
      : (tabobj.length - (tabobj.length % 3)) / 3 + 1;

  const [animationStates, setAnimationStates] = useState(
    Array(length).fill(false)
  );
  useEffect(() => {
    setAnimationStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[0] = true;
      return newStates;
    });
  }, []); // Exécution de l'effet uniquement lors du montage du composant

  const [Index, setIndex] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const elementPosition = document.getElementById(`Row${Index}`).offsetTop;
      if (
        scrollPosition > 1.1 * elementPosition &&
        windowWidth == window.screen.availWidth
      ) {
        setAnimationStates((prevStates) => {
          const newStates = [...prevStates];
          newStates[Index] = true;
          return newStates;
        });

        Index < length - 1 && setIndex((prevIndex) => prevIndex + 1);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [windowWidth, Index, animationStates]); // Exécution de l'effet uniquement lorsqu'il y a des changements dans la largeur de la fenêtre, l'index et les états d'animation

  let rowIndex = 0;
  const contenu = tabobj.map((e, i) => {
    let animationStyle;
    const id = `Row${rowIndex}`;
    if (rowIndex === 0) {
      if (i === 1) {
        animationStyle = `${animationStates[rowIndex] ? "SlideRightOne" : ""}`;
      } else if (i === 2) {
        animationStyle = `${animationStates[rowIndex] ? "SlideRightTwo" : ""}`;
      } else {
        animationStyle = "";
      }
    } else {
      switch (i % 3) {
        case 0:
          animationStyle = `${animationStates[rowIndex] ? "SlideDown" : ""}`;
          break;
        case 1:
          animationStyle = `${animationStates[rowIndex] ? "SlideDownOne" : ""}`;
          break;
        case 2:
          animationStyle = `${animationStates[rowIndex] ? "SlideDownTwo" : ""}`;
          break;
      }
    }

    if ((i + 1) % 3 === 0) {
      rowIndex++;
    }

    return (
      <div key={i} className={animationStyle} id={id}>
        <TeamCard
          nom={e.nom}
          list={newTab(e)}
          jr={jr}
          mois={mois}
          year={year}
        />
      </div>
    );
  });

  const xPad = () =>
    windowWidth > 1466
      ? "px-[150px]"
      : windowWidth > 1383
        ? "px-[100px]"
        : "px-[50px]";

  return (
    <div className="bg-bg_black min-h-screen">
      <LandingNavBar text="our teams" href="/" />
      <div
        className={`${xPad()} py-[90px] grid grid-cols-1 ${
          windowWidth > 1255
            ? "grid-cols-3"
            : windowWidth > 866
              ? "grid-cols-2"
              : ""
        } justify-items-center items-center gap-10`}
      >
        {contenu}
      </div>
    </div>
  );
}
