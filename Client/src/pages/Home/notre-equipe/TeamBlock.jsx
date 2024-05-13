// Import des hooks useState et useEffect depuis React
import { useState, useEffect } from "react";
// Import de axios pour les requêtes HTTP
import axios from "axios";
// Import du composant Member
import Member from "./Member";
// Import du composant Block
import Block from "../Block/Block.jsx";
// Import des animations Spring de React
import { useSpring, animated } from "react-spring";

// Définition du composant TeamBlock
export default function TeamBlock() {
  // État pour stocker les données des membres de l'équipe
  const [data, setData] = useState([
    {
      name: "Nom",
      equipe: "equipe ",
      fonction: "Chercheur ",
      img: "../../../assets/icons/Ellipse.svg",
    },
    {
      name: "Nom",
      equipe: "equipe ",
      fonction: "Chercheur ",
      img: "../../../assets/icons/Ellipse.svg",
    },
    {
      name: "Nom",
      equipe: "equipe ",
      fonction: "Chercheur ",
      img: "../../../assets/icons/Ellipse.svg",
    },
    {
      name: "Nom",
      equipe: "equipe ",
      fonction: "Chercheur ",
      img: "../../../assets/icons/Ellipse.svg",
    },
    {
      name: "Nom",
      equipe: "equipe ",
      fonction: "Chercheur ",
      img: "../../../assets/icons/Ellipse.svg",
    },
    {
      name: "Nom",
      equipe: "equipe ",
      fonction: "Chercheur ",
      img: "../../../assets/icons/Ellipse.svg",
    },
  ]);

  // Effet pour récupérer les données des membres de l'équipe
  useEffect(() => {
    const getData = async () => {
      try {
        // Requête GET pour récupérer les données des membres de l'équipe
        const response = await axios.get(
          "http://127.0.0.1:8000/home/Chefsequipes/"
        );
        // Met à jour les données si la réponse est reçue avec succès
        if (response.data.length >= 6) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  // Tableaux pour stocker les composants Member
  const tab1 = [];
  const tab2 = [];
  // Boucle pour diviser les membres en deux groupes
  for (let i = 0; i < 6; i += 2) {
    tab1.push(
      <Member
        key={i}
        name={data[i].name}
        equipe={data[i].equipe}
        img={data[i].img}
        fonction={data[i].fonction}
      />
    );
    tab2.push(
      <Member
        key={i}
        name={data[i + 1].name}
        equipe={data[i + 1].equipe}
        img={data[i + 1].img}
        fonction={data[i + 1].fonction}
      />
    );
  }

  // État pour stocker la largeur de la fenêtre
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effet pour mettre à jour la largeur de la fenêtre lors du redimensionnement
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // État pour animer l'apparition des membres de l'équipe
  const [animate, setAnimate] = useState(false);

  // Effet pour déclencher l'animation lors du défilement de la page
  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const elementPosition = document.getElementById("Teams").offsetTop;
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

  // Propriétés pour les animations Spring
  const slideUpProps = useSpring({
    from: animate && { opacity: 0, transform: "translateY(50%)" },
    to: animate && { opacity: 1, transform: "translateY(0)" },
    config: animate && { duration: 450 },
  });

  const slideDownProps = useSpring({
    from: animate && { opacity: 0, transform: "translateY(-50%)" },
    to: animate && { opacity: 1, transform: "translateY(0)" },
    config: animate && { duration: 450 },
  });

  const slideLeft = useSpring({
    from: animate && { opacity: 0, transform: "translateX(420px) " },
    to: animate && { opacity: 1, transform: "translateX(0)" },
    config: animate && { duration: 450 },
    delay: animate && 450,
  });

  const slideRight = useSpring({
    from: animate && { opacity: 0, transform: "translateX(-420px) " },
    to: animate && { opacity: 1, transform: "translateX(0)" },
    config: animate && { duration: 450 },
    delay: animate && 450,
  });

  // JSX pour afficher les membres de l'équipe
  const tab = (
    <div className="flex flex-col gap-[50px]" id="Teams">
      <div className="flex flex-row justify-between items-center">
        <animated.div style={slideLeft}>{tab1[0]}</animated.div>
        <animated.div style={slideUpProps}>{tab1[1]}</animated.div>
        {windowWidth > 678 && (
          <animated.div style={slideRight}>{tab1[2]}</animated.div>
        )}
      </div>
      <div className="flex flex-row justify-between items-center">
        <animated.div style={slideLeft}>{tab2[0]}</animated.div>
        <animated.div style={slideDownProps}>{tab2[1]}</animated.div>
        {windowWidth > 678 && (
          <animated.div style={slideRight}>{tab2[2]}</animated.div>
        )}
      </div>
      {windowWidth < 678 && (
        <div className="flex flex-row justify-between items-center">
          <animated.div>{tab1[2]}</animated.div>
          <animated.div>{tab2[2]}</animated.div>
        </div>
      )}
    </div>
  );

  // Rendu du composant Block contenant les membres de l'équipe
  return (
    <Block
      title="Notre équipe"
      contenu={tab}
      isButton={true}
      isPadding={windowWidth >= 952 && true}
      bg="bg-bg_black"
      src={"/OurTeams"}
    />
  );
}
