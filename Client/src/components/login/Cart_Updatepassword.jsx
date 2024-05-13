import { useState } from "react";
//import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import Butupdatepassword from "../buttons/Butupdatepassword.jsx";
import axios from "axios";
const Cart_Updatepassword = () => {
  const navigate = useNavigate();
  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");
  function navigateToPage(pageUrl) {
    window.location.href = pageUrl;
  }
  const [data, setdata] = useState({});
  const handelchange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    console.log(data.email);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/Send_verification_code/",
        { email: data.email }
      );
      localStorage.setItem("code", response.data.code);
      setSuccess(response.data.message);
      setErreur("");
      localStorage.setItem("email", data.email);
      setTimeout(() => {
        navigate("/login/enter_digits", { replace: true });
      }, 1000);
    } catch (error) {
      console.log(error);
      setErreur("email not found");
      setSuccess("");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      navigate("/login/update_password", { replace: true });
    }
  };
  return (
    <div className=" w-screen h-screen flex justify-center items-center ">
      <div className=" w-fit  h-fit flex justify-center items-center">
        <div className=" drop-shadow-md bg-white/80 rounded px-8 py-8 shadow-md">
          <div className=" flex flex-col">
            <div className=" flex justify-start items-center py-6">
              <IoArrowBackOutline
                className=" text-xl cursor-pointer ml-2"
                onClick={() => navigate("/login", { replace: true })}
              />
              <h2 className=" font-bold sm:text-xl text-md  mx-2">
                METTRE À JOUR VOTRE MOT DE PASSE
              </h2>
            </div>
            <div className=" my-3 mx-3">
              <div>
                <p className=" text-md  text-gray-400">
                  Veuillez entrer l'e-mail où nous pouvons vous envoyer un code
                </p>
              </div>
              <form onSubmit={handelSubmit}>
                <div className=" flex flex-col gap-1 py-4">
                  <p className="text-sm">Email</p>
                  <div className=" flex relative ">
                    <MdOutlineMailOutline className=" absolute top-1/2 transform -translate-y-1/2 left-3 text-[#808080] " />
                    <input
                      type="email"
                      name="email"
                      id=""
                      className=" border border-[#99C0E0] rounded py-2 pl-10 pr-10 w-full"
                      placeholder=" example@gmail.com"
                      onChange={handelchange}
                    />
                  </div>
                </div>
                <div className=" text-md text-red-600 m-1">{erreur}</div>
                <div className=" text-md text-green-600 m-1">{success}</div>
                <div className=" flex  items-end justify-center flex-col">
                  <Butupdatepassword
                    type="submit"
                    text="send an email"
                    erreur={erreur}
                    nav_suc="/login/enter_digits"
                    nav_fail="/login/update_password"
                    width=" w-1/3"
                  />
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

export default Cart_Updatepassword;
