import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import Butupdatepassword from "../buttons/Butupdatepassword.jsx";
import Butdigit from "../buttons/Butdigit.jsx";
import axios from "axios";
const Cart_degits = () => {
  const navigate = useNavigate();
  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");
  function navigateToPage(pageUrl) {
    window.location.href = pageUrl;
  }
  const [digits, setdigits] = useState(Array(6).fill(""));
  const handleChange = (index, value) => {
    digits[index] = value;
  };
  useEffect(() => {
    const fetchdata = async () => {
      const storedEmail = localStorage.getItem("email");
      const response = await axios.post(`http://127.0.0.1:8000/Get_user/`, {
        email: storedEmail,
      });
      const photo = response.data[0].photo_url;
      const nom = response.data[0].nom_complet;
      const qualite = response.data[0].chercheur.qualite;
      localStorage.setItem("photo", photo);
      localStorage.setItem("nom", nom);
      localStorage.setItem("qualite", qualite);
    };
    fetchdata();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const number = digits.join("");
    const storedEmail = localStorage.getItem("email");
    const code = localStorage.getItem("code");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/reset_password_verification_code/",
        { verification_code: number, code: code }
      );
      setSuccess(response.data);
      setErreur("");

      setTimeout(() => {
        navigate("/login/reset_password");
      }, 1000);
    } catch (error) {
      console.log(error);
      setErreur("wrong number");
      setSuccess("");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  return (
    <div className=" w-screen h-screen flex justify-center items-center ">
      <div className=" w-fit  h-fit flex justify-center items-center">
        <div className=" drop-shadow-md bg-white/95 rounded px-8 py-8 shadow-md">
          <div className=" flex flex-col">
            <div className=" flex justify-start items-center py-6">
              <IoArrowBackOutline
                className=" text-xl cursor-pointer ml-2"
                onClick={() =>
                  navigate("/login/update_password", { replace: true })
                }
              />
              <h2 className=" font-bold sm:text-xl text-md  mx-2">
                MISE A JOUR DU MOT DE PASSE
              </h2>
            </div>
            <div className=" my-3 mx-3">
              <div>
                <p className=" text-md  text-gray-400">
                  Veuillez entrer le code envoyé à l'adresse example@gmail.com
                </p>
              </div>
              <form onSubmit={handleSubmit} className=" flex flex-col">
                <div className="flex justify-between items-center w-fit my-4">
                  {digits.map((digit, index) => (
                    <input
                      className=" border-2 mx-2 w-10 h-10 text-center rounded border-steel_blue"
                      key={index}
                      type="text"
                      onChange={(e) => handleChange(index, e.target.value)}
                      min="0"
                      max="9"
                      maxLength="1"
                    />
                  ))}
                </div>
                <div className=" text-md text-red-600 m-1">{erreur}</div>
                <div className=" text-md text-green-600 m-1">{success}</div>
                <div className=" flex  items-end justify-center flex-col my-2">
                  <Butdigit type="submit" text="suivant" width="  w-1/3" />
                </div>
              </form>
            </div>
            {/* <div className=''>
                            <img src={Or} alt="or" width='350px' className=' my-4' /> 
                            <button className=' flex justify-center items-center'>
                                <div  className=' flex justify-between items-center'>
                                  <img src={google} alt="google" />
                                <p>Log in with Google</p>   
                                </div>

                            </button>  
                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart_degits;
