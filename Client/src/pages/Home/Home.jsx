import Contacts from "./contactez-nous/Contacts";
import HomeNavBar from "./navbar/HomeNavBar";
import FirstSection from "./first-section/FirstSection";
import CollaborationBlock from "./collaboration/CollaborationBlock";
import TeamBlock from "./notre-equipe/TeamBlock";
import EventsBlock from "./events-block/EventsBlock";
import PubBlock from "./Publications/PubBlock";
import AboutBlock from "./about/AboutBlock";
export default function Home() {
  const tab2 = [];

  tab2.push({
    key: 1,
    name: "Algerian Doctoral Conference on Computer Science",
    place: "ESI ,Alger",
    start: "9:00 am",
    end: "5:00 pm",
    day: "16",
    month: "Mai",
    weekday: "Jeu",
    year: "2024",
  });

  tab2.push({
    key: 2,
    name: "Séminaire LMCS: Data Science as an economic development driver",
    place: "ESI ,Alger",
    start: "10:00 am",
    end: "12:00 pm",
    day: "07",
    month: "Fév",
    weekday: "Mer",
    year: "2024",
  });

  tab2.push({
    key: 3,
    name: "Séminaire LMCS: Storage in the Cloud, data placement issues and some (possible) solutions",
    place: "ESI ,Alger",
    start: "10:00 am",
    end: "12:00 pm",
    day: "30",
    month: "Oct",
    weekday: "Lun",
    year: "2024",
  });

  const tab3 = [];
  for (let i = 0; i < 6; i++) {
    tab3.push({
      key: 1,
      text: "PhD students and young researchers the opportunity to present and discuss their research work, and to exchange experiences and difficulties with peers ...",
      nbpages: "586",
      nom: "publication-n2",
      authors: "plusieurs chercheurs",
    });
  }
  localStorage.setItem("role", "visiteur");
  const role = localStorage.getItem("role");
  return (
    <>
      <HomeNavBar />
      <div id="home">
        <FirstSection />
      </div>
      <div id="about1">
        <AboutBlock />
      </div>
      <CollaborationBlock />
      <div id="public">
        <PubBlock list={tab3} />
      </div>
      <div id="equipes">
        <TeamBlock />
      </div>
      <div id="even">
        <EventsBlock list={tab2} />
      </div>
      <div id="foot">
        <Contacts />
      </div>
    </>
  );
}
