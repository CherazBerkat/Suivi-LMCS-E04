import { useState, useEffect } from "react";
//import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { BiHide, BiShow } from "react-icons/bi";
import ButLogIn from "../buttons/ButLogIn";
import Or from "../../assets/images/or.svg";
import google from "../../assets/icons/google.svg";
import ButRest from "../buttons/ButRest";
import Butupdatepassword from "../buttons/Butupdatepassword";
import Butdigit from "../buttons/Butdigit";
import axios from "axios";
const Cart_resetpassword = () => {
  const [profile, setProfile] = useState({
    photo_url: "",
    nom_complet: "",
    qualite: "",
  });
  useEffect(() => {
    const photo_url = localStorage.getItem("photo") || "";
    const nom_complet = localStorage.getItem("nom") || "";
    const qualite = localStorage.getItem("qualite") || "";

    setProfile({ photo_url, nom_complet, qualite });
  }, []);
  //setProfile(localStorage.getItem('photo') , localStorage.getItem('nom') , localStorage.getItem('qualite'))
  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [password, setpassword] = useState(false);
  const showpassword = () => {
    setpassword(!password);
  };
  const [password2, setpassword2] = useState(false);
  const showpassword2 = () => {
    setpassword2(!password2);
  };
  function navigateToPage(pageUrl) {
    window.location.href = pageUrl;
  }
  const [data, setdata] = useState({});
  const handelchange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem("email");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/resetPassword/",
        {
          email: storedEmail,
          new_password: data.password,
          confirm_password: data.password2,
        }
      );

      setSuccess(response.data.message);
      setErreur("");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setSuccess("");
      setErreur("email or passwords are invalid");
    }
  };
  return (
    <div className=" w-screen h-screen flex justify-center items-center  ">
      <div className="  h-fit flex justify-center items-center w-fit ">
        <div className=" drop-shadow-md bg-white/95 rounded px-6 py-2 shadow-md">
          <div className=" flex flex-col">
            <div className=" flex justify-start items-center py-1  px-20">
              <IoArrowBackOutline
                className=" text-2xl  sm:text-xl cursor-pointer mx-2"
                onClick={() =>
                  navigate("/login/enter_digits", { replace: true })
                }
              />
              <h2 className=" font-bold  sm:text-xl text-md mx-2">
                METTRE À JOUR VOTRE MOT DE PASSE
              </h2>
            </div>
            <div className=" flex  justify-center items-center flex-col">
              <div className="">
                <img
                  src={profile.photo_url}
                  alt=""
                  width={100}
                  height={100}
                  className=" rounded-full my-4"
                />
              </div>
              <div className=" font-semibold  text-xl">
                {profile.nom_complet}
              </div>
              <div className=" font-light">{profile.qualite}</div>
            </div>
            <div className=" my-3">
              <form onSubmit={handelSubmit}>
                <div className=" flex flex-col gap-1 py-2">
                  <p className=" text-sm">Nouveau mot de passe</p>
                  <div className=" flex relative">
                    <FiLock className=" absolute top-1/2 transform -translate-y-1/2 left-3  text-[#808080]" />
                    <input
                      type={password ? "text" : "password"}
                      name="password"
                      id=""
                      className="border border-[#99C0E0] rounded py-2 pl-10 pr-10 w-full"
                      placeholder="  *********************"
                      onChange={handelchange}
                    />
                    {password ? (
                      <BiShow
                        className=" absolute top-1/2 transform -translate-y-1/2 right-4 text-[#808080] cursor-pointer"
                        onClick={showpassword}
                      />
                    ) : (
                      <BiHide
                        className=" absolute top-1/2 transform -translate-y-1/2 right-4 text-[#808080] cursor-pointer"
                        onClick={showpassword}
                      />
                    )}
                  </div>
                  {/* <Link to="/password">Forgot you password ?</Link> */}
                  {/* <div onClick= {()=> {navigate("/reset_password")}}>

                                     </div> */}
                </div>
                <div className=" flex flex-col gap-1 py-2">
                  <p className=" text-sm">Répétez le nouveau mot de passe</p>
                  <div className=" flex relative">
                    <FiLock className=" absolute top-1/2 transform -translate-y-1/2 left-3  text-[#808080]" />
                    <input
                      type={password2 ? "text" : "password"}
                      name="password2"
                      id=""
                      className="border border-[#99C0E0] rounded py-2 pl-10 pr-10 w-full"
                      placeholder="  *********************"
                      onChange={handelchange}
                    />
                    {password2 ? (
                      <BiShow
                        className=" absolute top-1/2 transform -translate-y-1/2 right-4 text-[#808080] cursor-pointer"
                        onClick={showpassword2}
                      />
                    ) : (
                      <BiHide
                        className=" absolute top-1/2 transform -translate-y-1/2 right-4 text-[#808080] cursor-pointer"
                        onClick={showpassword2}
                      />
                    )}
                  </div>
                  {/* <Link to="/password">Forgot you password ?</Link> */}
                  {/* <div onClick= {()=> {navigate("/reset_password")}}>

                                     </div> */}
                </div>
                <div className=" text-md text-red-600 m-1">{erreur}</div>
                <div className=" text-md text-green-600 m-1">{success}</div>
                <div className=" w-full">
                  <div className=" flex  items-center justify-end my-4">
                    <Butdigit
                      type="submit"
                      text="Mettre à jour le mot de passe"
                      width="  w-1/2"
                    />
                  </div>
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

export default Cart_resetpassword;
