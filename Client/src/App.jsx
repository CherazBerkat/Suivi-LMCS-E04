// Importation des composants de route
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Updatepassword from "./pages/login/Updatepassword";
import Enter_digits from "./pages/login/Enter_digits";
import Reset_password from "./pages/login/Reset_password";
import Home from "./pages/Home/Home";
import Recherche from "./pages/recherche/Recherche";
import OurTeams from "./pages/our-teams/OurTeams";
import AboutUs from "./pages/about-us/AboutUs";
import Status from "./pages/MAJ_Status/Status";
import StatistiqueForm from "./pages/statistiques/Form/StatistiqueForm";
import StatistiqueResult from "./pages/statistiques/Affichage/StatistiqueResult";
import MAJ_Role from "./pages/MAJ_DroitAcces/MAJ_Role";
import Modifier_Pub from "./pages/Modifier_Pub/Modifier_Pub";
import Aide from "./pages/aide/Aide";
import AjouterProjet from "./pages/PagesAjouter/AjouterProjet/AjouterProjet";
import AjouterPublication from "./pages/PagesAjouter/AjouterPublication/AjouterPublication";
import Parametres from "./pages/parametres/Parametres";
import ProfileChercheur from "./pages/profile/ProfileChercheur";
import MonProfileAss from "./pages/profile/MonProfileAss";
import MonProfileChercheur from "./pages/profile/MonProfileChercheur";
import AjouterEncadrement from "./pages/PagesAjouter/ajouterEncadrement/AjouterEncadrement";
import AjoutChercheur from "./pages/ajouter_chercheur/AjoutChercheur";
import AjouterConfJour from "./pages/PagesAjouter/AjouterConfJour/AjouterConfJour";
import Publication from "./pages/Publication/Publication";
import MiseAJour from "./pages/MiseAJour/MiseAJour";
import MiseAjour_assisstant from "./pages/MiseAJour/MiseAjour_assisstant";
import GestionBdd from "./pages/GestionBdd/GestionBdd";
export default function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/OurTeams" element={<OurTeams />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/update_password" element={<Updatepassword />} />
      <Route path="/login/enter_digits" element={<Enter_digits />} />
      <Route path="/login/reset_password" element={<Reset_password />} />
      <Route path="/MiseAJour/status" element={<Status />} />
      <Route path="/Profile" element={<ProfileChercheur />} />
      <Route path="/MonProfile" element={<MonProfileChercheur />} />
      <Route path="/MonProfileAssistante" element={<MonProfileAss />} />
      <Route path="/GestionBdd" element={<GestionBdd />} />
      <Route path="/Publication" element={<Publication />} />
      <Route path="/Aide/utilisateur" element={<Aide isVisiteur={false} />} />
      <Route path="/Aide/visiteur" element={<Aide isVisiteur={true} />} />
      <Route
        path="/Parametres/Utilisateur"
        element={<Parametres isAssitant={false} />}
      />
      <Route
        path="/Parametres/Assistant"
        element={<Parametres isAssitant={true} />}
      />

      <Route path="/MiseAJour/AjouterProjet" element={<AjouterProjet />} />

      <Route
        path="/MiseAJour/AjouterPublication"
        element={<AjouterPublication />}
      />
      <Route path="/MiseAJour/Assisstant" element={<MiseAjour_assisstant />} />
      <Route
        path="/Statistique/Visiteur"
        element={<StatistiqueForm visiteur={true} />}
      />
      <Route
        path="/Statistique/Utilisateur"
        element={<StatistiqueForm visiteur={false} />}
      />
      <Route
        path="/Statistique/Affichage/Utilisateur/Nombre_De_Publication_Par_Date/:startDate/:endDate"
        element={
          <StatistiqueResult
            visiteur={false}
            critere="Nombre_De_Publication_Par_Date"
          />
        }
      />
      <Route
        path="/Statistique/Affichage/Utilisateur/Nombre_De_Chercheur_Par_Equipe"
        element={
          <StatistiqueResult
            visiteur={false}
            critere="Nombre_De_Chercheur_Par_Equipe"
          />
        }
      />
      <Route
        path="/Statistique/Affichage/Utilisateur/Nombre_De_Chercheur_Par_Grade_De_Recherche"
        element={
          <StatistiqueResult
            visiteur={false}
            critere="Nombre_De_Chercheur_Par_Grade_De_Recherche"
          />
        }
      />
      <Route
        path="/Statistique/Affichage/Utilisateur/Nombre_De_Chercheur_Par_Grade_Enseignant"
        element={
          <StatistiqueResult
            visiteur={false}
            critere="Nombre_De_Chercheur_Par_Grade_Enseignant"
          />
        }
      />
      <Route
        path="/Statistique/Affichage/Utilisateur/Nombre_de_Revue_Par_Type"
        element={
          <StatistiqueResult
            visiteur={false}
            critere="Nombre_de_Revue_Par_Type"
          />
        }
      />
      <Route
        path="/Statistique/Affichage/Utilisateur/Nombre_De_Revue_Par_Periodicite"
        element={
          <StatistiqueResult
            visiteur={false}
            critere="Nombre_De_Revue_Par_Periodicite"
          />
        }
      />
      <Route
        path="/Statistique/Affichage/Visiteur/Nombre_De_Publication_Par_Date/:startDate/:endDate"
        element={
          <StatistiqueResult
            visiteur={true}
            critere="Nombre_De_Publication_Par_Date"
          />
        }
      />
      <Route
        path="/Statistique/Affichage/Visiteur/Nombre_De_Chercheur_Par_Equipe"
        element={
          <StatistiqueResult
            visiteur={true}
            critere="Nombre_De_Chercheur_Par_Equipe"
          />
        }
      />
      <Route
        path="/Statistique/Affichage/Visiteur/Nombre_De_Chercheur_Par_Grade_De_Recherche"
        element={
          <StatistiqueResult
            visiteur={true}
            critere="Nombre_De_Chercheur_Par_Grade_De_Recherche"
          />
        }
      />
      <Route
        path="/Statistique/Affichage/Visiteur/Nombre_De_Chercheur_Par_Grade_Enseignant"
        element={
          <StatistiqueResult
            visiteur={true}
            critere="Nombre_De_Chercheur_Par_Grade_Enseignant"
          />
        }
      />
      <Route
        path="/Statistique/Affichage/Visiteur/Nombre_de_Revue_Par_Type"
        element={
          <StatistiqueResult
            visiteur={true}
            critere="Nombre_de_Revue_Par_Type"
          />
        }
      />
      <Route
        path="/Statistique/Affichage/Visiteur/Nombre_De_Revue_Par_Periodicite"
        element={
          <StatistiqueResult
            visiteur={true}
            critere="Nombre_De_Revue_Par_Periodicite"
          />
        }
      />
      <Route path="/maj/status" element={<Status />} />
      <Route path="/maj/role" element={<MAJ_Role />} />
      <Route path="/pub/modifier_pub" element={<Modifier_Pub />} />
      <Route
        path="/Recherche/Visiteur"
        element={<Recherche visiteur={true} />}
      />
      <Route
        path="/Recherche/Utilisateur"
        element={<Recherche visiteur={false} />}
      />
      <Route path="/ajouter/chercheur" element={<AjoutChercheur />} />
      <Route path="/maj/chercheur" element={<MiseAJour />} />
      <Route path="/ajouter/encadrement" element={<AjouterEncadrement />} />
      <Route path="/ajouter/conf_jour" element={<AjouterConfJour />} />
    </Routes>
  );
}
