/* eslint-disable react/prop-types */ // Désactivation des avertissements liés aux types des props

// Composant Bouton
export default function Bouton({ pushPage }) {
  // Rendu JSX du bouton
  return (
    <button
      type="button"
      className="my-8 bg-main_blue mr-16  border-none h-[50px] rounded-[35px] px-[32px] w-fit  py-1 ${color} text-xs font-semibold  shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-hover_yellow hover:scale-[1.02] hover:duration-300  active:scale-95 active:duration-300"
      onClick={() => {
        pushPage(); // Appel de la fonction pushPage lors du clic sur le bouton
      }}
    >
      <div className=" flex flex-row justify-center items-center gap-[1px] font-bold text-[13px]">
        Sauvegarder {/* Texte du bouton */}
      </div>
    </button>
  );
}
