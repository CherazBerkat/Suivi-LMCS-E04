/* eslint-disable react/prop-types */
import Ellipse from "../../assets/icons/Ellipse.svg";
export default function ProfilePic({ src, width, height }) {
  return (
    <img
      src={src || Ellipse}
      className={`rounded-full ${width} ${height} shadow-[0_4px_12px_rgba(0,0,0,0.25)]`}
    />
  );
}
/*
used for: profile pictures execpt for the search pages nav bars
needs src alt width props
 */
