// Disabling eslint rule for prop types
/* eslint-disable react/prop-types */

// Importing necessary modules and components
import ProblemeCard from "./ProblemeCard";
import Bouton from "./Bouton";
import iconAide from "../../assets/icons/aideblack.svg";
import React from "react";
import Popup from "./Popup";

import "./Content.css";

// Exporting the Content component
export default function Content({ isVisiteur }) {
  // State to manage the visibility of the popup
  const [isClicked, setIsClicked] = React.useState(false);

  // Function to toggle the visibility of the popup
  function clickHandler() {
    setIsClicked(!isClicked);
  }

  // Rendering the component
  return (
    <div className="relative h-full">
      {isClicked && (
        <div className="h-full absolute w-full flex justify-center items-center bg-bg_gris bg-opacity-60 ">
          <div className="z-20" id="content-pop-up">
            <Popup clickHandler={clickHandler} />
          </div>
        </div>
      )}
      <div className="flex flex-row w-full justify-between items-center" id="content-text-but">
        <div className="flex pt-[16px] pb-[16px]  ml-[50px] pl-[64px] font-regular text-[35px] h-full" id="content-text">
          Nous sommes là pour vous aider
        </div>
        <div>
          {!isVisiteur && (
            <Bouton
              text="Signaler un problème"
              icon={iconAide}
              color="bg-bg_yellow"
              strockcolor="border-pure_black"
              margin="mr-[160px]"
              clickHandler={clickHandler}
            />
          )}
        </div>
      </div>

      <div className="flex flex-row justify-center items-start h-fit" id="Contenu">
        <div className="flex flex-col h-fit">
          <ProblemeCard
            text="Mot de passe oublié"
            text_solution1="Il peut arriver que vous ayez oublié votre mot de passe, ce qui vous empêche d'accéder à votre compte."
            text_solution2="Pas de panique ! Sur la page de connexion, vous trouverez un lien Reset Password ? Cliquez dessus et suivez les instructions pour réinitialiser votre mot de passe."
          />

          <ProblemeCard
            text="Problèmes d'accès aux fonctionnalités"
            text_solution1="Vous rencontrez des difficultés à accéder à certaines fonctionnalités ou sections de notre site."
            text_solution2="Assurez-vous que vous êtes connecté à votre compte utilisateur. Certaines fonctionnalités peuvent nécessiter une connexion pour être accessibles. Si le problème persiste, contactez notre équipe d'assistance pour obtenir de l'aide."
          />

          <ProblemeCard
            text="Impossible de éffectué une recherche"
            text_solution1="Vous rencontrez des difficultés pour effectuer une recherche sur notre site, ce qui peut entraver votre capacité à trouver des informations pertinentes."
            text_solution2="Assurez-vous que vous avez saisi correctement les termes de recherche et que votre connexion Internet est stable. Essayez de rafraîchir la page ou de revenir à la page d'accueil et réessayez. Si le problème persiste, contactez notre équipe d'assistance technique pour obtenir de l'aide supplémentaire."
          />
        </div>

        <div className="flex flex-col h-fit">
          <ProblemeCard
            text="Résultats de recherche indisponibles"
            text_solution1="Vous ne trouvez pas de résultats correspondant à votre recherche sur notre site."
            text_solution2="Assurez-vous que les termes de votre recherche sont correctement orthographiés et pertinents. Essayez d'utiliser des termes de recherche alternatifs pour affiner vos résultats. Si vous ne trouvez toujours pas ce que vous cherchez, cela peut signifier que l'information que vous recherchez n'est pas disponible sur notre site. Vous pouvez également contacter notre équipe d'assistance clientèle pour obtenir de l'aide dans votre recherche."
          />

          <ProblemeCard
            text="Plus d'information sur le site"
            text_solution1="Vous rencontrez des difficultés à accéder à certaines fonctionnalités ou sections de notre site."
            text_solution2="On a préparé un guide d'utilisation complet qui explique chaque partie et chaque bouton associé avec leurs fonctionnalités."
            lien="https://drive.google.com/file/d/1li2dXur_aeWZ3IwLX2cE3ReIkQ7wGqXK/view?usp=sharing"
          />

          <ProblemeCard
            text="Suggestions ou commentaires"
            text_solution1="Si vous avez des suggestions pour améliorer notre site de recherche ou si vous souhaitez partager vos commentaires avec nous."
            text_solution2="N'hésitez pas à nous contacter via notre contact ou à envoyer un e-mail à suivilmcs@gmail.com. Vos commentaires sont précieux pour nous aider à améliorer notre service."
          />
        </div>
      </div>
    </div>
  );
}
