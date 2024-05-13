
/* eslint-disable react/prop-types */
export default function TeamMemberCard({ list }) {
  return (
    <div className="bg-pure_black p-4 rounded-[3px] shadow-[0_0_5px_0_rgba(255,255,255,0.25)] w-[378px] flex flex-col gap-10">
      {list}
    </div>
  );
}
