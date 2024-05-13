/* eslint-disable react/prop-types */
import photo1 from "../../../assets/images/photo1.svg";
import photo2 from "../../../assets/images/photo2.svg";
import photo3 from "../../../assets/images/photo3.svg";
import photo4 from "../../../assets/images/photo4.svg";
import photo5 from "../../../assets/images/photo5.svg";
import search from "../../../assets/icons/search.svg";
import ButHome from "../../../components/buttons/ButHome";
import NumberCard from "../number-card/NumberCard";
import axios from "axios";
import "./FirstSection.css";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

export default function FirstSection() {
  const [bgIndex, setBgIndex] = useState(0);
  const images = [photo1, photo2, photo3, photo4, photo5];

  const [statsData, setStatsData] = useState({
    nbChercheurs: 0,
    nbPublications: 0,
    nbDoctorants: 0,
    nbProfesseurs: 0,
    nbRevues: 0,
  });

  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/home/stats/");
        setStatsData(response.data);
      } catch (error) {
        console.error("Error fetching stats data:", error);
      }
    };
    data();

    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const bgStyle = {
    backgroundImage: `url(${images[bgIndex]})`,
    transition: "opacity 2s ease-in-out",
  };

  const slideInProps = useSpring({
    from: { opacity: 0, transform: "translateY(-100%)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  const slideRigthOne = useSpring({
    from: { opacity: 0, transform: "translateX(-500px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    config: { duration: 1000 },
  });

  const slideRigthTwo = useSpring({
    from: { opacity: 0, transform: "translateX(-250px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    config: { duration: 1000 },
  });
  const slideRigthThree = useSpring({
    from: { opacity: 0, transform: "translateX(250px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    config: { duration: 1000 },
  });
  const slideRigthFoor = useSpring({
    from: { opacity: 0, transform: "translateX(500px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    config: { duration: 1000 },
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="w-full h-[723px] top-[-70px] relative bg-cover bg-center transition-opacity flex flex-col gap-[90px] justify-center items-center"
      style={bgStyle}
    >
      <animated.div
        className={`flex flex-col gap-[50px] ${
          windowWidth > 915 ? "w-[896px]" : "w-[600px]"
        } justify-center items-center`}
        style={slideInProps}
      >
        <div className="flex flex-col justify-center gap-[10px] items-center text-center">
          <h1 className="text-pure_white text-[50px] leading-[75px] self-center font-bold">
            LABORATOIRE DE METHODES DE CONCEPTION DES SYSTEME
          </h1>
          <h2 className="text-pure_white text-[20px] leading-[26px] font-semibold ">
            Etablissement de rattachement: Ecole nationale Supérieure
            d’Informatique
          </h2>
        </div>
        <a href="/Recherche/visiteur">
          <ButHome
            width="w-[280px]"
            isIcon={false}
            text="Discover"
            icon={search}
            upper={false}
          />
        </a>
      </animated.div>
      <div className="flex flex-row items-center justify-center gap-8">
        {windowWidth > 500 && (
          <animated.div style={slideRigthFoor}>
            <NumberCard
              text="Chercheurs"
              start={statsData.nbChercheurs - 10}
              end={statsData.nbChercheurs}
            />
          </animated.div>
        )}
        <animated.div style={slideRigthThree}>
          <NumberCard
            text="Publications"
            start={statsData.nbPublications - 10}
            end={statsData.nbPublications}
          />
        </animated.div>
        {windowWidth > 720.8 && (
          <NumberCard
            text="Doctorants"
            start={statsData.nbDoctorants - 10}
            end={statsData.nbDoctorants}
          />
        )}
        {windowWidth > 969.6 && (
          <animated.div style={slideRigthTwo}>
            <NumberCard
              text="Professeurs"
              start={statsData.nbProfesseurs - 10}
              end={statsData.nbProfesseurs}
            />
          </animated.div>
        )}
        {windowWidth > 1227.2 && (
          <animated.div style={slideRigthOne}>
            <NumberCard
              text="ConfJournal"
              start={statsData.nbRevues - 10}
              end={statsData.nbRevues}
            />
          </animated.div>
        )}
      </div>
    </div>
  );
}
