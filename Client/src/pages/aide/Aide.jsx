// Disabling eslint rule for prop types
/* eslint-disable react/prop-types */

// Importing necessary components
import SearchSideBar from "../../components/Search-side-bar/SearchSideBar";
import SearchNavBar from "../../components/nav-bars/SearchNavBar";
import Content from "./Content";

// Exporting the Aide component
export default function Aide({ isVisiteur }) {
  // Rendering the component
  return (
    <>
      <div className="flex flex-row bg-bg_gris bg-opacity-60">
        {/* Sidebar */}
        <div className="w-[14.58%] h-screen shadow-[0_0_25px_rgba(0,0,0,0.25)] z-10 fixed top-0 min-w-[130px]">
          <SearchSideBar page={6} visiteur={isVisiteur} />
        </div>

        {/* Main content */}
        <div className="flex-grow ml-[max(130px,14.58%)] bg-bg_yellow min-h-screen">
          {/* Search navbar */}
          <SearchNavBar text="Aide" visiteur={isVisiteur} />

          <div className="w-full h-full bg-bg_yellow">
            {/* Content component */}
            <Content isVisiteur={isVisiteur} />
          </div>
        </div>
      </div>
    </>
  );
}
