/* eslint-disable react/prop-types */
import "./SearchSideBar.css";
import LOGOWhite from "../../assets/images/LOGOWhite.svg";
import aideblack from "../../assets/icons/aideblack.svg";
import searchwhite from "../../assets/icons/searchwhite.svg";
import parametreswhite from "../../assets/icons/parametreswhite.svg";
import dashboardwhite from "../../assets/icons/dashboardwhite.svg";
import profilewhite from "../../assets/icons/profilewhite.svg";
import aidewhite from "../../assets/icons/aidewhite.svg";
import searchblack from "../../assets/icons/searchblack.svg";
import parametresblack from "../../assets/icons/parametresblack.svg";
import dashboardblack from "../../assets/icons/dashboardblack.svg";
import profileblack from "../../assets/icons/profileblack.svg";
import misajrWhite from "../../assets/icons/misajrWhite.svg";
import misairBlack from "../../assets/icons/misajrBlack.svg";
import { useNavigate } from "react-router-dom";

export default function SearchSideBar({ page, visiteur }) {
  const visiteurString = visiteur ? "Visiteur" : "Utilisateur";
  const role = localStorage.getItem("role");
  const user_id = localStorage.getItem("user_id");
  const Matricule = localStorage.getItem("matricule");
  const navigate1 = useNavigate();
  const handleClickProfile = () => {
    role == "assistant"
      ? navigate1("/MonProfileAssistante", {
          state: { User_id: user_id },
        })
      : navigate1("/MonProfile", {
          state: { User_id: user_id, Matricule: Matricule },
        });
  };

  const navigate = useNavigate();
  const hanfellogoclick = () => {
    navigate("/");
  };
  return (
    <div className="bg-dark_blue w-full h-full text-bg_yellow text-[15px] font-normal leading-[22.5px]">
      <div className="h-[20%] relative" onClick={hanfellogoclick}>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <img
            src={LOGOWhite}
            alt="LMCS logo"
            className="absolute top-0 left-0 right-0 bottom-0 m-auto hover:scale-[1.02] hover:duration-300 active: duration-500  active:scale-[0.97]"
          />
        </a>
      </div>
      <div className="flex flex-col justify-between p-[15px] items-start w-full h-[80%] ">
        <div className="w-full flex flex-col gap-4">
          <hr />
          <ul>
            <li
              className={
                page == 1
                  ? "bg-main_yellow text-bg_black font-semibold pointer-events-none"
                  : "hover:scale-[1.02] hover:duration-300 active: duration-500  active:scale-[0.97]"
              }
            >
              <a
                href={`/Recherche/${visiteurString}`}
                className={page == 1 ? "gap-0 px-[10px]" : " "}
              >
                <img src={page != 1 ? searchwhite : searchblack} />
                <h4>Recherche</h4>
              </a>
            </li>

            <li
              className={
                page == 2
                  ? "bg-main_yellow text-bg_black font-semibold pointer-events-none"
                  : "hover:scale-[1.02] hover:duration-300 active: duration-500  active:scale-[0.97]"
              }
            >
              <a
                href={`/Statistique/${visiteurString}`}
                className={page == 2 ? "gap-0 px-[10px]" : ""}
              >
                <img src={page != 2 ? dashboardwhite : dashboardblack} />
                <h4>Statistiques</h4>
              </a>
            </li>

            {!visiteur && (
              <li
                className={
                  page == 3
                    ? "bg-main_yellow text-bg_black font-semibold pointer-events-none"
                    : "hover:scale-[1.02] hover:duration-300 active: duration-500  active:scale-[0.97]"
                }
              >
                <a
                  href={
                    role === "directeur"
                      ? "/maj/status"
                      : role === "chercheur"
                        ? "/maj/chercheur"
                        : role === "admin"
                          ? "/maj/role"
                          : "/MiseAJour/Assisstant"
                  }
                  className={page === 3 ? "gap-0 px-[10px]" : ""}
                >
                  <img src={page !== 3 ? misajrWhite : misairBlack} />
                  <h4 className="whitespace-nowrap">Mise à jour</h4>
                </a>
              </li>
            )}

            {!visiteur && role != "admin" && (
              <li
                className={
                  page == 4
                    ? "bg-main_yellow text-bg_black font-semibold pointer-events-none"
                    : "hover:scale-[1.02] hover:duration-300 active: duration-500  active:scale-[0.97] "
                }
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    handleClickProfile();
                  }}
                  className={page == 4 ? "gap-0 px-[10px]" : ""}
                >
                  <img src={page != 4 ? profilewhite : profileblack} />
                  <h4>Profile</h4>
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="w-full flex flex-col gap-4">
          <hr />
          <ul>
            {!visiteur && role != "admin" && (
              <li
                className={
                  page == 5
                    ? "bg-main_yellow text-bg_black font-semibold pointer-events-none"
                    : "hover:scale-[1.02] hover:duration-300 active: duration-500  active:scale-[0.97]"
                }
              >
                <a
                  href={
                    role == "assistant"
                      ? "/Parametres/Assistant"
                      : "/Parametres/Utilisateur"
                  }
                  className={page == 5 ? "gap-0 px-[10px]" : ""}
                >
                  <img src={page != 5 ? parametreswhite : parametresblack} />
                  <h4>Parametres</h4>
                </a>
              </li>
            )}
            <li
              className={
                page == 6
                  ? "bg-main_yellow text-bg_black font-semibold pointer-events-none"
                  : "hover:scale-[1.02] hover:duration-300 active: duration-500  active:scale-[0.97]"
              }
            >
              <a
                href={visiteur ? "/Aide/visiteur" : "/Aide/utilisateur"}
                className={page == 6 ? "gap-0 px-[10px]" : ""}
              >
                <img src={page != 6 ? aidewhite : aideblack} />
                <h4>Aide</h4>
              </a>
            </li>
            {!visiteur && role != "chercheur" && (
              <li
                className={
                  page == 7
                    ? "bg-main_yellow text-bg_black font-semibold pointer-events-none"
                    : "hover:scale-[1.02] hover:duration-300 active: duration-500  active:scale-[0.97]"
                }
              >
                <a
                  href="/GestionBdd"
                  className={page == 7 ? "gap-0 px-[10px]" : ""}
                >
                  <img src={page != 7 ? parametreswhite : parametresblack} />
                  <h4>Gestion Bdd</h4>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
