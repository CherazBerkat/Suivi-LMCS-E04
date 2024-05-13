// Disabling eslint rule for prop types
/* eslint-disable react/prop-types */

// Importing necessary hooks and components
import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import EquipeAboutCard from "./EquipeAboutCard";
import TeamMembersCard from "./TeamMembersCard";
import TitleTeam from "./TitleTeam";

// Exporting the TeamSec component
export default function TeamSec({ team, aboutTeam, one, id }) {
  // Conditionally rendering if team data is not available
  if (!team) {
    return null;
  }

  // Function to generate list of team members
  const midtab = (tab) => {
    return tab.members.map((e, i) => (
      <li key={i} className="flex flex-row items-center gap-[10px] group cursor-default">
        <p className="bg-main_yellow rounded-full h-[26px] w-[26px] text-center group-hover:bg-[#464646]">
          {i + 2}
        </p>
        <p className="text-pure_white group-hover:text-main_yellow">{e}</p>
      </li>
    ));
  };

  // Function to generate list with team leader at top
  const newTab = (tab) => (
    <ul className="text-[20px] leading-[30px] font-medium flex flex-col items-start gap-10">
      <li key={tab.chef_equipe} className="flex flex-row items-center gap-[10px] group cursor-default">
        <p className="bg-main_yellow rounded-full h-[26px] w-[26px] text-center group-hover:bg-[#464646]">1</p>
        <p className="text-pure_white group-hover:text-main_yellow">
          Chef d&apos;equipe:{" "}
          <span className="font-normal">{tab.chef_equipe}</span>
        </p>
      </li>
      {midtab(tab)}
    </ul>
  );

  // State variable for animation
  const [animate, setAnimate] = useState(false);

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

  // Effect hook to trigger animation on scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const element = document.getElementById(`${id}`);
      if (element) {
        const elementPosition = element.offsetTop;
        if (scrollPosition > elementPosition && windowWidth === window.screen.availWidth) {
          setAnimate(true);
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [windowWidth, id]);

  // Animation spring configurations
  const animationOne = useSpring({
    from: animate && { transform: "translate(0,-10%) ", opacity: 0 },
    to: animate && { transform: "translate(0,0)", opacity: 1 },
    config: animate && { duration: 700 },
    delay: 200,
  });

  const animationTwo = useSpring({
    from: animate && { transform: "translate(0,10%) ", opacity: 0 },
    to: animate && { transform: "translate(0,0)", opacity: 1 },
    config: animate && { duration: 700 },
    delay: 200,
  });

  // Rendering the component
  return (
    <div className={`flex ${windowWidth > 1214 ? "gap-12" : "gap-8"} flex-col overflow-hidden`}>
      {/* Team title */}
      <TitleTeam text={team.nom} textColor="text-pure_white" />
      <div className={`flex ${windowWidth > 904 ? "flex-row" : "flex-col"} ${windowWidth > 1216 ? "gap-32" : windowWidth > 1152 ? "gap-16" : "gap-8"} px-8 py-[5px]`} id={id}>
        {/* Animated member or about card */}
        <animated.div style={one ? animationOne : animationTwo}>
          <TeamMembersCard list={newTab(team)} />
        </animated.div>
        <animated.div style={!one ? animationOne : animationTwo}>
          <EquipeAboutCard contenu={aboutTeam} />
        </animated.div>
      </div>
    </div>
  );
}
