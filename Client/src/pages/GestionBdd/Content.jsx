// Importing necessary dependencies
import misairBlack from "../../assets/icons/misairBlack.svg";
import power from "../../assets/icons/power.svg";
import axios from "axios";

// Defining the Content component
export default function Content() {
  // Function to update the database
  function majBdd() {
    console.log("Mise à jour de la BDD");
  }

  // Function to initialize the database
  function iniBdd() {
    axios
      .get("http://localhost:8000/bdd/populate_data/")
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Rendering the component
  return (
    <div>
      <div className="w-full bg-bg_yellow">
        <div className="flex flex-col h-screen">
          <div className="w-full flex justify-center items-center flex-grow xl:gap-[65px] lg:gap-[45px] md:gap-[25px]">
            <div
              onClick={majBdd}
              className="flex flex-col justify-start items-center h-[219.09px] w-[213px] relative gap-2 p-4 rounded-xl bg-white focus:bg-bg_yellow focus:shadow-none hover:bg-slate-100 hover:scale-[1.02] hover:duration-300 active:scale-95 active:duration-300"
              style={{ boxShadow: "0px 0px 25px 0 rgba(0,0,0,0.125)" }}
            >
              <p className="w-[181px] text-[20px] font-semibold text-center text-[#1d1d1d]">
                Mise à jour de la BDD
              </p>
              <img src={misairBlack} alt="mise à jour " />
            </div>
            <div
              onClick={iniBdd}
              className="flex flex-col justify-start items-center h-[219.09px] w-[213px] relative gap-2 p-4 rounded-xl bg-white focus:bg-bg_yellow focus:shadow-none hover:bg-slate-100 hover:scale-[1.02] hover:duration-300 active:scale-95 active:duration-300"
              style={{ boxShadow: "0px 0px 25px 0 rgba(0,0,0,0.125)" }}
            >
              <p className="w-[181px] text-[20px] font-semibold text-center text-[#1d1d1d]">
                Initialiser La BDD
              </p>
              <img src={power} alt="Initialiser" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
