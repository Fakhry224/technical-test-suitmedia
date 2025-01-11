import React from "react";

const SelectButton = ({ options, handler }) => {
  return (
    <div className="min-w-[100px]">
      <div className="relative">
        <select
          className="w-full rounded-full drop-shadow-lg bg-transparent placeholder:text-black text-black text-sm border border-slate-500 pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-700 hover:border-slate-700 shadow-sm focus:shadow-md appearance-none cursor-pointer"
          onChange={(e) => handler(e.target.value)}
        >
          {options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
          s
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700 pointer-events-none"
        >
          <path d="M12 16l-6-8h12l-6 8z" />
        </svg>
      </div>
    </div>
  );
};

export default SelectButton;
