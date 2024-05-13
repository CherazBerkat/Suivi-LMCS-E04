/* eslint-disable react/prop-types */
import * as XLSX from "xlsx";
import SearchSideBar from "../../../components/Search-side-bar/SearchSideBar";
import SearchNavBar from "../../../components/nav-bars/SearchNavBar";
import CardGraphique from "./CardGraphique";
import arrowSmallLeft from "../../../assets/icons/arrowSmallLeft.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import download from "../../../assets/icons/download.svg";
import back from "../../../assets/icons/chevron-left.svg";
import CardNum from "./CardNum";

export default function StatistiqueResult({ visiteur, critere }) {
  const visiteurString = visiteur ? "Visiteur" : "Utilisateur";
  const [data, setData] = useState([]);
  const { startDate, endDate } = useParams();
  useEffect(() => {
    const postdata = {
      critere: critere,
      date_debut: startDate,
      date_fin: endDate,
    };
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/Statistique/Stat/",
          postdata
        );
        setData(response.data.result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [critere, startDate, endDate]);

  function replaceUnderscores(str) {
    return str.replace(/_/g, " ");
  }

  function exportToExcel(data, fileName) {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  const mot1 = () =>
    critere.includes("Publication")
      ? "Publications"
      : critere.includes("Chercheur")
        ? "Chercheurs"
        : "Revues";

  const mot2 = () =>
    critere.includes("Date")
      ? "année"
      : critere.includes("Grade_Enseignant")
        ? "Grade Enseignant"
        : critere.includes("Grade_De_Recherche")
          ? "Grade de Recherche"
          : critere.includes("Equipe")
            ? "Équipe"
            : critere.includes("Type")
              ? "Type"
              : "Periodicité";

  Chart.register({
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
  });

  const backgroundColors = [
    "#7C7C7C",
    "#3D80B3",
    "#E2FD52",
    "#B3DA08",
    "#F1FF96",
    "#31668F",
    "#94B9D5",
    "#16273B",
    "#234869",
    "#F3F3F3",
    "#234869",
  ];

  const Labels = data.map((item) => item.nom);
  const dataData = data.map((item) => item.nombre);
  const DoughnutBgs = backgroundColors.slice(0, dataData.length);
  const doughnutOptions = {
    responsive: true,
    hover: {
      mode: "index",
      intersect: true,
    },
    cutout: "70%",
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

  const DoughnutData = {
    labels: Labels,
    datasets: [
      {
        data: dataData,
        backgroundColor: DoughnutBgs,
        borderWidth: 0.5,
        pointStyle: "circle",
        font: {
          size: "16",
          color: "black",
        },
      },
    ],
  };

  const barsData = {
    labels: Labels,
    datasets: [
      {
        label: "Nombre de " + mot1() + " Par " + mot2(),
        data: dataData,
        backgroundColor: "#53680C",
        borderColor: "#53680C",
        borderWidth: 2,
      },
    ],
  };
  const barsOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: `${mot2()}`,
        },
      },
      y: {
        title: {
          display: true,
          text: `Nombre de ${mot1()}`,
        },
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    hover: {
      mode: "nearest",
      intersect: true,
    },
    animation: {
      duration: 800,
      easing: "easeInOutQuart",
    },
    barThickness: 5,
  };

  const chartData = {
    labels: Labels,
    datasets: [
      {
        label: "Nombre de " + mot1() + " Par " + mot2(),
        data: dataData,
        fill: false,
        borderColor: "#31668F",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: `${mot2()}`,
        },
      },
      y: {
        title: {
          display: true,
          text: `Nombre de ${mot1()}`,
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
      duration: 800,
      easing: "easeInOutQuart",
    },
  };

  const contenu = data.map((item, index) => (
    <CardNum
      key={index}
      text={`${mot1()} Par ${mot2()} ${item.nom}`}
      num={item.nombre}
    />
  ));

  const contenuRows = [];
  for (let i = 0; i < data.length; ) {
    contenuRows.push(
      <div className="flex flex-row gap-12" key={i}>
        {contenu[i]} {windowWidth > 930 && contenu[i + 1]}
        {windowWidth > 1350 && contenu[i + 2]}
      </div>
    );
    windowWidth > 1350 ? (i += 3) : windowWidth > 930 ? (i += 2) : i++;
  }

  const [num, setNum] = useState(true);
  const [graph, setGraph] = useState(false);

  return (
    <div className="flex flex-row">
      <div className="w-[14.58%] min-w-[133px] h-screen shadow-[0_0_25px_rgba(0,0,0,0.25)] z-10 fixed top-0 ">
        <SearchSideBar page={2} visiteur={visiteur} />
      </div>
      <div className="flex-grow ml-[max(133px,14.58%)] bg-bg_yellow min-h-screen ">
        <SearchNavBar
          text="Statistiques"
          visiteur={visiteur}
          icon={arrowSmallLeft}
          href={`/Statistique/${visiteur ? "Visiteur" : "Utilisateur"}`}
        />
        <div
          className={` ${num ? (windowWidth > 960 ? "px-[120px]" : windowWidth > 937 ? "px-[20px]" : "px-0 ") : ""} ${graph ? (windowWidth > 1523 ? "px-[120px]" : windowWidth > 770 ? "px-[50px]" : windowWidth > 511 ? "px-[10px]" : "px-0") : ""} my-8 flex flex-col gap-8`}
        >
          <div className="flex flex-row justify-center items-center h-[48px]">
            <h3
              className={` h-full text-center w-[50%] text-[20px] leading-[30px] ${num ? "text-main_blue font-semibold border-b-[3px] border-main_blue" : "border-b-[1px] border-[#DCDCDC] border-r-[1px]"} cursor-pointer hover:scale-[1.02] hover:duration-300  active:scale-95 active:duration-300`}
              onClick={() => {
                setGraph(false);
                setNum(true);
              }}
            >
              Numerique
            </h3>
            <h3
              className={`h-full text-center w-[50%] text-[20px] leading-[30px] ${graph ? "text-main_blue font-semibold border-b-[3px] border-main_blue" : "border-b-[1px] border-[#DCDCDC] border-l-[1px]"} cursor-pointer hover:scale-[1.02] hover:duration-300  active:scale-95 active:duration-300 `}
              onClick={() => {
                setGraph(true);
                setNum(false);
              }}
            >
              Graphique
            </h3>
          </div>
          <h4 className="text-[25px] leading-[37.5px] ">
            {replaceUnderscores(critere)}
          </h4>
          {graph && (
            <div
              className={`flex ${windowWidth > 1330 ? "flex-row" : "flex-col"}  items-center justify-center gap-8`}
            >
              <CardGraphique
                contenu={
                  mot1() == "Publications" ? (
                    <Line data={chartData} options={chartOptions} />
                  ) : (
                    <Doughnut data={DoughnutData} options={doughnutOptions} />
                  )
                }
              />

              <CardGraphique
                contenu={<Bar data={barsData} options={barsOptions} />}
              />
            </div>
          )}
          {num && (
            <div className="flex flex-col items-center gap-12">
              {contenuRows}
            </div>
          )}
          <div
            className={`flex ${windowWidth > 590 ? "flex-row" : "flex-col"} ${windowWidth > 1350 ? "justify-start" : "justify-center"}  gap-6 text-[20px] leading-[30px] font-medium text-bg_yellow items-center`}
          >
            <button
              className={` bg-main_blue rounded-[20px]  flex flex-row items-center ${windowWidth > 674 ? "gap-[20px] px-8 py-[5px]" : "gap-[10px] px-4 py-[3px]"}  ${windowWidth > 590 ? "" : "w-[265.6px] justify-center"} cursor-pointer hover:scale-[1.02] hover:duration-300 active:scale-95 active:duration-300`}
              onClick={() =>
                (window.location.href = `/Statistique/${visiteurString}`)
              }
            >
              <img src={back} className="w-[19px] h-[19px]" />
              Retour
            </button>
            <button
              className={` bg-[#656565] rounded-[20px]  flex flex-row items-center ${windowWidth > 674 ? "gap-[20px] px-8 py-[5px]" : "gap-[10px] px-4 py-[3px]"} cursor-pointer hover:scale-[1.02] hover:duration-300  active:scale-95 active:duration-300`}
              onClick={() => {
                exportToExcel(data, `LMCS ${critere} Statistiques`);
              }}
            >
              <img src={download} className="w-[19px] h-[19px]" />
              Exporter fichier Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
