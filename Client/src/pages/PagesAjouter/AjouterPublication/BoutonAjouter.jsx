// Composant BoutonAjouter utilisé comme un bouton pour ajouter un chercheur

export default function BoutonAjouter({ clickHandler, ToggleHandler }) {
  return (
    <button
      type="button"
      className="bg-main_yellow mr-16 mt-[5px] border-none h-[40px] reounded-[4px] px-[16px] w-[225px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-hover_yellow hover:scale-[1.02] hover:duration-300 focus:bg-pressed_yellow focus:shadow-none active:scale-95 active:duration-300"
      onClick={() => {
        clickHandler(); // Appel de la fonction de gestion du clic
        ToggleHandler && ToggleHandler(); // Appel de la fonction de basculement si elle existe
      }}
    >
      <div className="flex flex-row justify-center items-center gap-[1px] font-bold text-[16px] text-pure_black">
        Ajouter Chercheur
      </div>
    </button>
  );
}
