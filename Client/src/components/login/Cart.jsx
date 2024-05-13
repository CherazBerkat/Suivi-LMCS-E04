import { useState } from "react";
//import { Link } from 'react-router-dom'
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { BiHide, BiShow } from "react-icons/bi";
import ButLogIn from "../buttons/ButLogIn";
import Or from "../../assets/images/or.svg";
import google from "../../assets/icons/google.svg";
import axios from "axios";
const Cart = () => {
  const REACT_APP_GOOGLE_CLIENT_ID =
    "474826740593-43ampoaedr3rqlfuuv86iefnkffohmgs.apps.googleusercontent.com";
  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");
  const [password, setpassword] = useState(false);
  const showpassword = () => {
    setpassword(!password);
  };
  function navigateToPage(pageUrl) {
    window.location.href = pageUrl;
  }
  const [data, setdata] = useState({});
  const handelchange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const handleGoogleLoginSuccess = async (response) => {
    try {
      const { tokenId } = response;
      const response = await axios.post("http://127.0.0.1:8000/google_auth/", {
        tokenId: tokenId,
      });
      console.log(response.data);
      // Handle the response from your backend as needed
    } catch (error) {
      console.log("error");
      console.error(error);

      // Handle error
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        email: data.email,
        password: data.password,
      });
      setSuccess("user registered successfully");
      setErreur("");
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("user_id", response.data.user_id);

      const user_id = response.data.user_id;
      const response2 = await axios.post(
        "http://127.0.0.1:8000/Get_user_by_id/",
        {
          user_id: user_id,
        }
      );
      localStorage.setItem("matricule", response2.data[0].chercheur_id);
      //localStorage.setItem('visiteur' , false)
      const bool = false;
      setTimeout(() => {
        localStorage.setItem("visiteur", bool.toString());
        navigate(`/Recherche/Utilisateur`, { replace: true });
      }, 2000);
    } catch (error) {
      setErreur("incorrect email or password");
      setSuccess("");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  const navigate = useNavigate();
  return (
    <div className=" w-screen h-screen flex justify-center items-center ">
      <div className=" w-fit  h-fit flex justify-center items-center">
        <div className=" drop-shadow-md bg-white/95 rounded px-6 py-4 shadow-md">
          <div className=" flex flex-col">
            <div className=" flex justify-start items-center py-1  ">
              <IoArrowBackOutline
                className="  text-2xl cursor-pointer"
                onClick={() => navigate("/", { replace: true })}
              />
              <h2 className=" font-bold sm:text-xl text-md mx-2">
                SE CONNECTER
              </h2>
            </div>
            <div className=" my-3">
              <form onSubmit={handelSubmit}>
                <div className=" flex flex-col gap-1 py-2">
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
                <div className=" flex flex-col gap-1 py-2">
                  <p className=" text-sm">Mot de passe</p>
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
                  <div className=" text-sm my-1  text-red-600">{erreur}</div>
                  <div className=" text-sm my-1  text-green-600">{success}</div>
                  <div className=" my-2">
                    <p
                      onClick={() => navigateToPage("/login/update_password")}
                      className="  text-xs  underline cursor-pointer text-[#3D80B3]"
                    >
                      Mot de passe oublié ?
                    </p>
                  </div>
                  {/* <Link to="/password">Forgot you password ?</Link> */}
                  {/* <div onClick= {()=> {navigate("/reset_password")}}>

                                     </div> */}
                </div>

                <div className=" flex items-center justify-center flex-col">
                  <ButLogIn type="submit" text="Log in" width="  w-1/2" />
                </div>
              </form>
            </div>
            <div>
              <img src={Or} alt="or" width="300px" className=" my-4 ml-2" />
            </div>
            <div className="flex justify-center items-center">
              <GoogleLogin
                clientId={REACT_APP_GOOGLE_CLIENT_ID}
                onSuccess={handleGoogleLoginSuccess}
                onFailure={(error) => console.error(error)}
                cookiePolicy={"single_host_origin"}
                render={(renderProps) => (
                  <button
                    className="flex justify-center items-center border rounded border-[#646464]"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <div className="flex justify-between items-center gap-2 mx-2">
                      <img src={google} alt="google" width="50px" />
                      <p className="text-sm">Connectez-vous avec Google</p>
                    </div>
                  </button>
                )}
              />
              {/* <button className=' flex justify-center items-center  border rounded border-[#646464] '>
                                <div  className=' flex justify-between items-center gap-2 mx-2'>
                                  <img src={google} alt="google" width="50px" />
                                <p className='text-sm'>Log in with Google</p>   
                                </div>
                        </button>   */}
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

export default Cart;
