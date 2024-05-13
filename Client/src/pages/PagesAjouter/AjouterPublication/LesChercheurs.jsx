// Composant ListChercheurs pour afficher une liste de chercheurs

export default function ListChercheurs({ ListChercheurs }) {
    return (
        <div>
            <div className="flex flex-row gap-[10px] flex-wrap py-2">
                {ListChercheurs.map((option, index) => (
                    <div className="bg-gris w-fit px-[16px] h-[40px] items-center rounded-[5px] justify-center flex flex-row gap-[5px] text-pure_white text-[18px] font-medium" key={index}>
                        <div>{option.NomDeChercheur}</div>
                        <div className="font-light px-3">|</div>
                        <div>{option.rang}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
