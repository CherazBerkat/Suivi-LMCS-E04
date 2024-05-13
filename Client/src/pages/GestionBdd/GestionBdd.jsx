// Disabling eslint rule for prop types
/* eslint-disable react/prop-types */

// Importing necessary components
import SearchSideBar from "../../components/Search-side-bar/SearchSideBar";
import SearchNavBar from "../../components/nav-bars/SearchNavBar";
import Content from "./Content";

// Exporting the GestionBdd component
export default function GestionBdd() {
  // Rendering the component
  return (
    <>
      <div className="flex flex-row bg-bg_gris bg-opacity-60">
        <div className="w-[14.58%] h-screen shadow-[0_0_25px_rgba(0,0,0,0.25)] z-10 fixed top-0 min-w-[130px]">
          <SearchSideBar page={7} visiteur={0} />
        </div>

        <div className="flex-grow ml-[max(130px,14.58%)] bg-bg_yellow min-h-screen">
          <SearchNavBar text="Gestion De La Base De Données" visiteur={0} />

          <div className="w-full h-full bg-bg_yellow">
            <Content />
          </div>
        </div>
      </div>
    </>
  );
}
