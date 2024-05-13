/* eslint-disable react/prop-types */ // Désactivation de la vérification des types des props

export default function BoutonAjouter({ clickHandler, ToggleHandler, text }) {
  return (
    <button
      type="button"
      className="bg-main_yellow mr-16 mt-[5px]  border-none h-[40px] reounded-[4px]  px-[16px] w-[225px]  ${color}   shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-hover_yellow hover:scale-[1.02] hover:duration-300   active:scale-95 active:duration-300"
      onClick={() => {
        clickHandler(); // Appel de la fonction clickHandler
        ToggleHandler && ToggleHandler(); // Appel de la fonction ToggleHandler si elle est définie
      }}
    >
      {/* Contenu du bouton */}
      <div className=" flex flex-row justify-center items-center gap-[1px] font-bold text-[16px] text-pure_black">
        {text} {/* Affichage du texte */}
      </div>
    </button>
  );
}
