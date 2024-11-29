import * as React from "react";

function FormInput({ label, placeholder, required }) {
  return (
    <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px] ">
      <label className="text-base font-bold text-white">
        {label}
        {required && <span className="text-yellow-400">*</span>}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        required={required}
        className="overflow-hidden gap-2.5 self-stretch px-3.5 py-4 mt-2.5 w-full text-sm font-light border-b border-solid border-b-[#FAC612] min-h-[50px] text-[#828282] bg-[#1A1A1A] placeholder:text-[#828282]"
      />
    </div>
  );
}
export default FormInput;
