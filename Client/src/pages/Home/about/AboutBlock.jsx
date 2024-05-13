// Importing necessary dependencies
import AboutCard from "./AboutCard";
import Block from "../Block/Block";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import axios from "axios";

// Defining the AboutBlock component
export default function AboutBlock() {
  // State variables for window width, doughnut data, and chart data
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [doughnutData, setDoughnutData] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Function to fetch doughnut data and chart data from the server
  useEffect(() => {
    const getDoughnutData = async () => {
      try {
        const res = await axios("http://127.0.0.1:8000/home/quality/");
        setDoughnutData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getChartData = async () => {
      try {
        const res = await axios(
          "http://127.0.0.1:8000/home/PublicationsByYear/"
        );
        setChartData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getChartData();
    getDoughnutData();
  }, []);

  // Registering Chart.js elements
  Chart.register({
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
  });

  // Background colors for doughnut chart
  const backgroundColors = [
    "#7C7C7C",
    "#E2FD52",
    "#F1FF96",
    "#B3DA08",
    "#3D80B3",
    "#31668F",
    "#94B9D5",
    "#16273B",
    "#234869",
    "#F3F3F3",
    "#234869",
  ];

  // Data for doughnut chart
  const doughnutLabels = doughnutData.map((item) => item.nom);
  const doughnutdataData = doughnutData.map((item) => item.nombre);
  const DoughnutBgs = backgroundColors.slice(0, doughnutdataData.length);

  // Data for line chart
  const chartLabels = chartData.map((item) => item.nom);
  const chartdataData = chartData.map((item) => item.nombre);

  // Options for doughnut chart
  const doughnutOptions = {
    responsive: true,
    hover: {
      mode: "index",
      intersect: true,
    },
    cutout: "60%",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "left",
        labels: {
          pointStyle: "circle",
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";

            if (label) {
              label += ": ";
            }
            label += context.formattedValue + "%";
            return label;
          },
        },
      },
    },
  };

  // Data for doughnut chart
  const DoughnutDataData = {
    labels: doughnutLabels,
    datasets: [
      {
        data: doughnutdataData,
        backgroundColor: DoughnutBgs,
        borderWidth: 0.5,
        pointStyle: "circle",
        font: {
          size: "16",
          color: "black",
        },
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  // Data for line chart
  const chartDataData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Nombre de Publication Depuis 1999",
        data: chartdataData,
        fill: false,
        borderColor: "#31668F",
        tension: 0.1,
      },
    ],
  };

  // Options for line chart
  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Année",
        },
      },
      y: {
        title: {
          display: true,
          text: "Nombre de Publications",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            label += context.parsed.y.toFixed(2) + "%";
            return label;
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    hover: {
      mode: "nearest",
      intersect: true,
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
  };

  // Effect to update window width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // State variable for animation
  const [animate, setAnimate] = useState(false);

  // Effect to trigger animation on scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const elementPosition = document.getElementById("cards").offsetTop;
      if (
        scrollPosition > 1.2 * elementPosition &&
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

  // Animation properties for card animations
  const slideRightOne = useSpring({
    from: animate && { opacity: 0, transform: "translateX(-100%)" },
    to: animate && { opacity: 1, transform: "translate(0)" },
    config: animate && { duration: 500 },
  });

  const slideRightTwo = useSpring({
    from: animate && { opacity: 0, transform: "translateX(-200%)" },
    to: animate && { opacity: 1, transform: "translate(0)" },
    config: animate && { duration: 500 },
    delay: animate && 300,
  });

  // Content for the second card
  const classement = ["CORE", "DGRSDT", "QUALIS"];
  const tabct = [];
  for (let i = 0; i < 3; i++) {
    tabct.push(
      <li key={i} className="flex flex-row items-center gap-[10px]">
        <p className="bg-main_yellow rounded-full h-[26px] w-[26px] text-center">
          {i + 1}
        </p>
        <p>
          nom de classement:
          <span className="text-main_blue font-medium">{classement[i]}</span>
        </p>
      </li>
    );
  }
  const contenuTwo = (
    <ul className="text-[20px] leading-[30px] text-[#7f7f7f] font-medium flex flex-col items-start">
      {tabct}
    </ul>
  );

  // Content for the cards
  const contenu = (
    <div className="flex flex-col gap-36 pt-[20px]">
      <p className="text-[25px] leading-[35.5px]">
        Le Laboratoire de Méthodes de Conception de Systèmes (LMCS) créé en
        1999 est rattaché à L&apos;Ecole nationale Supérieure
        d&apos;Informatique, Alger.Le Laboratoire des Méthodes de Conception de
        Systèmes (LMCS) de l&apos;ESI est une entité académique de premier plan
        qui se distingue par son engagement envers l&apos;innovation et
        l&apos;excellence dans le domaine de la conception de systèmes. Grâce à
        ses recherches de pointe et à ses collaborations multidisciplinaires,
        le LMCS joue un rôle crucial dans le développement de nouvelles méthodes,
        techniques et outils pour la conception et l&apos;optimisation des
        systèmes complexes en font un acteur majeur dans le paysage scientifique.
      </p>
      <div className="flex flex-row justify-center gap-10 items-center" id="cards">
        <animated.div>
          {<AboutCard contenu={<Line data={chartDataData} options={chartOptions} />} />}
        </animated.div>
        {windowWidth > 911 && (
          <animated.div style={slideRightOne}>
            {<AboutCard title="classement des pubs" contenu={contenuTwo} />}
          </animated.div>
        )}
        {windowWidth > 1351 && (
          <animated.div style={slideRightTwo}>
            {<AboutCard contenu={<div className="w-[360px] h-[200px]"><Doughnut data={DoughnutDataData} options={doughnutOptions} /></div>} num={true} title="Chercheurs experts" />}
          </animated.div>
        )}
      </div>
    </div>
  );

  // Rendering the AboutBlock component
  return (
    <Block
      title="À propos de nous"
      contenu={contenu}
      isButton={true}
      isPadding={undefined}
      isTop={true}
      bg="bg-pure_White"
      src="/AboutUs"
    />
  );
}
