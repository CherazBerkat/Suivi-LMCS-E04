// Import du composant PubCard et du composant Block
import PubCard from "./PubCard";
import Block from "../Block/Block";
// Import des hooks useEffect et useState depuis React
import { useState, useEffect } from "react";
// Import de useSpring et animated depuis react-spring
import { useSpring, animated } from "react-spring";
// Import d'axios pour les requêtes HTTP
import axios from "axios";

// Définition du composant PubBlock
export default function PubBlock() {
  // Tableau pour stocker les composants PubCard
  const tab = [];
  // État pour stocker les données des publications
  const [list, setList] = useState([
    {
      nbpages: "100",
      nom: "example1",
      authors: ["author1", "author2"],
    },
    {
      nbpages: "100",
      nom: "example1",
      authors: ["author1", "author2"],
    },
    {
      nbpages: "100",
      nom: "example1",
      authors: ["author1", "author2"],
    },
    {
      nbpages: "100",
      nom: "example1",
      authors: ["author1", "author2"],
    },
    {
      nbpages: "100",
      nom: "example1",
      authors: ["author1", "author2"],
    },
    {
      nbpages: "100",
      nom: "example1",
      authors: ["author1", "author2"],
    },
  ]);

  // Effet pour récupérer les données des publications depuis l'API
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/home/LatestPublications/"
        );
        if (response.data.length >= 6) {
          setList(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  // Fonction pour mapper les auteurs d'une publication en éléments de liste
  const listAuthors = (i) =>
    list[i].authors.map((e, i2) => <li key={i2}>{e}</li>);

  // Boucle pour créer les PubCard à afficher
  for (let i = 0; i < 6; i++) {
    tab.push(
      <PubCard
        nbpages={list[i].nbpages}
        nom={list[i].nom}
        authors={listAuthors(i)}
      />
    );
  }

  // État pour la largeur de la fenêtre
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effet pour mettre à jour la largeur de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // État pour animer les éléments lors du scroll
  const [animate, setAnimate] = useState(false);

  // Effet pour déterminer quand activer les animations
  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const elementPosition = document.getElementById("pubs").offsetTop;
      if (
        scrollPosition > 1.1 * elementPosition &&
        windowWidth == window.screen.availWidth
      ) {
        setAnimate(true);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [windowWidth]);

  // Définition des animations pour les PubCard
  const slideRightOne = useSpring({
    from: animate && { opacity: 0, transform: "translateX(-100%)" },
    to: animate && { opacity: 1, transform: "translate(0)" },
    config: animate && { duration: 500 },
  });

  const slideRightTwo = useSpring({
    from: animate && { opacity: 0, transform: "translateX(-200%)" },
    to: animate && { opacity: 1, transform: "translate(0)" },
    config: animate && { duration: 500 },
    delay: animate && 200,
  });

  const slideDownOne = useSpring({
    from: animate && { opacity: 0, transform: "translateY(-100%)" },
    to: animate && { opacity: 1, transform: "translate(0)" },
    config: animate && { duration: 500 },
  });
  const slideDownTwo = useSpring({
    from: animate && { opacity: 0, transform: "translateY(-100%)" },
    to: animate && { opacity: 1, transform: "translate(0)" },
    config: animate && { duration: 500 },
    delay: animate && 300,
  });
  const slideDownThree = useSpring({
    from: animate && { opacity: 0, transform: "translateY(-100%)" },
    to: animate && { opacity: 1, transform: "translate(0)" },
    config: animate && { duration: 500 },
    delay: animate && 600,
  });

  // Contenu JSX du composant PubBlock
  const contenu = (
    <div className="flex flex-col gap-6 " id="pubs">
      <div className="flex flex-row justify-center gap-8 items-center">
        <animated.div>{tab[0]}</animated.div>
        {windowWidth > 911 && (
          <animated.div style={slideRightOne}>{tab[1]}</animated.div>
        )}
        {windowWidth > 1351 && (
          <animated.div style={slideRightTwo}>{tab[2]}</animated.div>
        )}
      </div>
      <div className="flex flex-row justify-center  gap-8 items-center">
        <animated.div style={slideDownOne}>{tab[3]}</animated.div>
        {windowWidth > 911 && (
          <animated.div style={slideDownTwo}>{tab[4]}</animated.div>
        )}
        {windowWidth > 1351 && (
          <animated.div style={slideDownThree}>{tab[5]}</animated.div>
        )}
      </div>
      {windowWidth < 1351 && windowWidth > 911 && (
        <div className="flex flex-row gap-8 justify-center  items-center">
          <animated.div>{tab[2]}</animated.div>
          <animated.div>{tab[5]}</animated.div>
        </div>
      )}
    </div>
  );

  // Rendu du composant PubBlock
  return (
    <Block
      title="dernières publications"
      contenu={contenu}
      isButton={undefined}
      isPadding={undefined}
      bg="bg-bg_yellow"
    />
  );
}
