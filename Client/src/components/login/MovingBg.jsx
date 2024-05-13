import mov from "../../assets/images/login_bg.svg";
import "./animation.css";
const MovingBg = () => {
  return (
    <div className=" absolute h-screen w-screen overflow-hidden">
      <img
        src={mov}
        alt="bg"
        className=" absolute aniamte_top_to_bottom"
        width={700}
        height={700}
      />
      <img
        src={mov}
        alt="bg"
        className=" absolute aniamte_bottom_to_top"
        width={700}
        height={700}
      />
    </div>
  );
};

export default MovingBg;
