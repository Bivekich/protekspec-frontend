import * as React from "react";

export function InfoField({ label, value, icon, isUppercase = false }) {
  return (
    <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
      <p className="text-base text-[#828282]">{label}</p>
      <div className="flex gap-2.5 items-center mt-2.5">
        <img
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain shrink-0 w-5 aspect-square"
        />
        <p
          className={`text-2xl font-bold ${
            isUppercase ? "uppercase" : ""
          } text-[#333333]`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
