// Disabling eslint rule for prop types
/* eslint-disable react/prop-types */

// Exporting the Inputf component
export default function Inputf({ text }) {
  // Rendering the component
  return (
    <div className="bg-pure_white w-full h-[67px] rounded-[3px] my-[2px] cursor-pointer">
      <div className="px-[5px]">
        {/* Displaying the input field label */}
        {text} <span className="text-error">*</span>
      </div>
      {/* Input field */}
      <div className="w-full p-[5px] border border-main_blue rounded-[12px]">
        <input
          type="text"
          className="w-full px-[5px] rounded-[3px] my-[2px] onClick:border-none border-none"
          placeholder="entrez votre information"
        />
      </div>
    </div>
  );
}
