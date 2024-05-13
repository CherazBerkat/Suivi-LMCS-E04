// Importing MovingBg and Cart_Updatepassword components
import MovingBg from "../../components/login/MovingBg";
import Cart_Updatepassword from "../../components/login/Cart_Updatepassword.jsx";

// Updatepassword component definition
const Updatepassword = () => {
  // Rendering MovingBg and Cart_Updatepassword components
  return (
    <div className=" h-screen w-screen overflow-hidden">
      <MovingBg />
      <Cart_Updatepassword />
    </div>
  );
};

// Exporting Updatepassword component
export default Updatepassword;
