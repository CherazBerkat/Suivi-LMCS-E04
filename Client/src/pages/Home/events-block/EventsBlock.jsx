/* eslint-disable react/prop-types */
import Block from "../Block/Block.jsx";
import EventCard from "./EventCard.jsx";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

export default function EventsBlock({ list }) {
  const tab = [];
  for (let i = 0; i < 3; i++) {
    tab.push(
      <EventCard
        key={i}
        name={list[i].name}
        place={list[i].place}
        start={list[i].start}
        end={list[i].end}
        day={list[i].day}
        month={list[i].month}
        year={list[i].year}
        weekday={list[i].weekday}
      />
    );
  }

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const elementPosition = document.getElementById("Events").offsetTop;
      if (scrollPosition > 1.08 * elementPosition) {
        setAnimate(true);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const slideUp = useSpring({
    from: animate && { opacity: 0, transform: "translateY(70%)" },
    to: animate && { opacity: 1, transform: "translateY(0)" },
    config: { duration: 500 },
  });

  const slideDown = useSpring({
    from: animate && { opacity: 0, transform: "translateY(-70%)" },
    to: animate && { opacity: 1, transform: "translateY(0)" },
    config: { duration: 500 },
  });

  const contenu = (
    <div className="flex flex-col items-center gap-8" id="Events">
      <animated.div style={slideUp}>{tab[0]}</animated.div>
      {tab[1]}
      <animated.div style={slideDown}>{tab[2]}</animated.div>
    </div>
  );
  return (
    <Block
      title="Événements à venir"
      contenu={contenu}
      isButton={false}
      isPadding={true}
      bg="bg-bg_pure_white"
    />
  );
}
