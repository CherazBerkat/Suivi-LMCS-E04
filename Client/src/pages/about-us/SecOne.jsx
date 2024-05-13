// Importing necessary components, hooks, and libraries
import MainTitle from "./SecTitle";
import ParagraphCard from "./ParagraphCard";
import ChartCard from "./ChartCard";
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
  Filler,
} from "chart.js";
import axios from "axios";

// Exporting the SecOne component
export default function SecOne() {
  // State variables for doughnut and chart data
  const [doughnutData, setDoughnutData] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Effect hook to fetch data on component mount
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
        const res = await axios("http://127.0.0.1:8000/home/PublicationsByYear/");
        setChartData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getChartData();
    getDoughnutData();
  }, []);

  // Registering Chart.js components
  Chart.register({
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Filler,
  });

  // Array of background colors for doughnut chart
  const backgroundColors = ["#7C7C7C", "#3D80B3", "#E2FD52", "#B3DA08", "#F1FF96", "#31668F", "#94B9D5", "#16273B", "#234869", "#F3F3F3", "#234869"];

  // Extracting doughnut data
  const doughnutLabels = doughnutData.map((item) => item.nom);
  const doughnutDataValues = doughnutData.map((item) => item.nombre);
  const doughnutBackgrounds = backgroundColors.slice(0, doughnutDataValues.length);

  // Extracting chart data
  const chartLabels = chartData.map((item) => item.nom);
  const chartDataValues = chartData.map((item) => item.nombre);

  // Doughnut chart options
  const doughnutOptions = {
    responsive: true,
    hover: { mode: "index", intersect: true },
    cutout: "60%",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "left",
        labels: { pointStyle: "circle", usePointStyle: true },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) label += ": ";
            label += context.formattedValue + "%";
            return label;
          },
        },
      },
    },
    animation: false,
  };

  // Doughnut chart data
  const doughnutChartData = {
    labels: doughnutLabels,
    datasets: [
      {
        data: doughnutDataValues,
        backgroundColor: doughnutBackgrounds,
        borderWidth: 0.5,
        pointStyle: "circle",
        font: { size: "16", color: "black" },
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  // Line chart data
  const chartDataData = {
    labels: chartLabels,
    datasets: [
      {
        label: "",
        data: chartDataValues,
        fill: true,
        borderWidth: 1,
        backgroundColor: "rgba(226, 253, 82, 0.15)",
        borderColor: "#E2FD52",
        tension: 0.1,
      },
    ],
  };

  // Line chart options
  const chartOptions = {
    scales: {
      x: {
        title: { display: true, text: "Année" },
        ticks: { color: "white" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
      y: {
        title: { display: true, text: "Nombre de Publications" },
        beginAtZero: true,
        ticks: { color: "white" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
    },
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) label += ": ";
            label += context.parsed.y.toFixed(2) + "%";
            return label;
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    hover: { mode: "nearest", intersect: true },
    animation: false,
  };

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

  // State variable for animation trigger
  const [animate, setAnimate] = useState(false);

  // Effect hook to trigger animation on scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const elementPosition = document.getElementById("first").offsetTop;
      if (scrollPosition > elementPosition && windowWidth === window.screen.availWidth) {
        setAnimate(true);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [windowWidth]);

  // Animations
  const animationOne = useSpring({
    from: animate && { clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)" },
    to: animate && { clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)" },
    config: { duration: 800 },
    delay: 400,
  });

  const slideRight = useSpring({
    from: { transform: "translateX(-124%) " },
    to: { transform: "translateX(0)" },
    config: { duration: 700 },
    delay: 200,
  });

  const animationTwo = useSpring({
    from: animate && { opacity: 0 },
    to: animate && { opacity: 1 },
    config: { duration: 2500 },
    delay: 200,
  });

  // Rendering the component
  return (
    <div className="flex flex-col gap-8 ">
      {/* Main title */}
      <MainTitle text="Laboratoire Méthodes de Conception de Systèmes" textColor="text-pure_white" />
      <div className={`flex ${windowWidth > 1108 ? "flex-row" : "flex-col"} py-8  ${windowWidth > 1455 ? "gap-32 px-24" : "gap-16 px-8"} items-center`}>
        {/* Paragraph card */}
        <ParagraphCard
          contenu="          Laboratoire Méthodes de Conception de Systèmes affilié à l’Ecole nationale Supérieure d’Informatique est opérationnel depuis 2001. Il regroupe 38 enseignants-chercheurs et 102 doctorants D-LMD répartis sur 06 équipes activant dans la sécurité informatique, les systèmes embarqués, l’hyper-média, le traitement d’images, l’ingénierie des systèmes d’information et des systèmes de connaissances, l’aide à la décision stratégique, les méthodes de résolution de problème d’optimisation combinatoire." />
        {/* Animated Doughnut chart */}
        <animated.div style={slideRight}>
          <ChartCard
            contenu={<Doughnut data={doughnutChartData} options={doughnutOptions} />}
            title="Chercheurs experts"
            width="w-[519px]"
            height={` ${windowWidth > 1108 ? "h-[450px]" : "h-[250px]"} `}
          />
        </animated.div>
      </div>
      <div className={`flex ${windowWidth > 1108 ? "flex-row justify-between" : "flex-col gap-16"} py-8 ${windowWidth > 1455 ? " px-24" : " px-8"}   items-center`}>
        <animated.div style={animationOne} id="first">
          {/* Animated Line chart */}
          <ChartCard
            contenu={<Line data={chartDataData} options={chartOptions} />}
            width="w-[500px]"
            height="h-[300px]"
            title="Nombre de Publications"
          />
        </animated.div>
        <animated.div style={animationTwo}>
          {/* Paragraph card */}
          <ParagraphCard
            contenu="              Le laboratoire participe activement à la formation doctorale, à la formation des étudiants en master et à celle des ingénieurs. Les enseignants chercheurs du LMCS participent activement aux projets PRFU (projets Nationaux) et pour certains dans des projets de recherche internationaux (Projets internationaux). Le laboratoire s’investit, par ailleurs, depuis plusieurs années à mettre ses compétences à travers des partenariats actifs et des actions de recherche et développement au profit du secteur socio-économique. Chercheurs, enseignants et ingénieurs sont les bienvenus sur notre site." />
        </animated.div>
      </div>
    </div>
  );
}
