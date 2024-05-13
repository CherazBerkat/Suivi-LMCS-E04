import CollabMoving from "./CollabMoving";
import MainTitle from "../../../components/titles/MainTitle";

// Component for displaying collaboration block
export default function CollaborationBlock() {
  return (
    <div className="bg-pure_white px-[64px]">
      {/* Title for the collaboration block */}
      <MainTitle text="collaborations" />
      {/* Component for moving collaboration logos */}
      <div className="my-[80px] ">
        <CollabMoving />
      </div>
    </div>
  );
}
