import collab1 from "../../../assets/icons/collab1.svg";
import collab2 from "../../../assets/icons/collab2.svg";
import collab3 from "../../../assets/icons/collab3.svg";
import collab4 from "../../../assets/icons/collab4.svg";
import collab5 from "../../../assets/icons/collab5.svg";
import collab6 from "../../../assets/icons/collab6.svg";
import collab7 from "../../../assets/icons/collab7.svg";
import "./CollabMoving.css";

// Component for displaying moving collaboration logos
export default function CollabMoving() {
  let tab = [];
  let j = 1;
  
  // Generating array of images dynamically
  for (let i = 1; i <= 30; i++) {
    tab.push(<img src={getImageSource(j)} alt="logo" key={i} />);
    j++;
    if (j === 8) {
      j = 1;
    }
  }

  // Rendering moving collaboration logos
  return (
    <div className="px-[70px]">
      <div className="overflow-hidden">
        <div className="flex flex-row gap-[167px] bg-white custom-animation w-[5000px]">
          {tab}
        </div>
      </div>
    </div>
  );
}

// Helper function to get image source dynamically based on index
function getImageSource(index) {
  switch (index) {
    case 1:
      return collab1;
    case 2:
      return collab2;
    case 3:
      return collab3;
    case 4:
      return collab4;
    case 5:
      return collab5;
    case 6:
      return collab6;
    case 7:
      return collab7;
    default:
      return collab1;
  }
}
