// Disabling eslint rule for prop types
/* eslint-disable react/prop-types */

// Exporting the selectf component
export default function selectf({ text }) {
  // Rendering the component
  return (
    <div className="bg-pure_white w-full h-[67px] rounded-[3px] my-[2px] ">
      <div className="px-[5px]">
        {text} <span className="text-error">*</span>
      </div>

      <div className="w-full p-[5px] border border-main_blue rounded-[12px]">
        <select
          type="text"
          className="w-full px-[5px] rounded-[3px] my-[2px] border-none"
          placeholder="entrez votre information"
        >
          <option value="techeninque">techeninque</option>
          <option value="labo">laboratoire</option>
        </select>
      </div>
    </div>
  );
}
