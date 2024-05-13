// Importing MovingBg and Cart components
import MovingBg from "../../components/login/MovingBg";
import Cart from "../../components/login/Cart";

// Login component definition
const Login = () => {
  // Rendering MovingBg and Cart components
  return (
    <div className=" h-screen w-screen overflow-hidden">
      <MovingBg />
      <Cart />
    </div>
  );
};

// Exporting Login component
export default Login;
