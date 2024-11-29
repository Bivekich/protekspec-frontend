import React from "react";

const ContactInfo = ({ icon, text, href, noWrap }) => {
  const Content = (
    <div className="flex gap-2.5 items-center group cursor-pointer">
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="object-contain shrink-0 w-5 h-5 group-hover:scale-110 transition-transform"
      />
      <span
        className={`text-md font-medium text-[#1A1A1A] group-hover:text-[#FAC612] transition-colors ${
          noWrap ? "whitespace-nowrap" : ""
        }`}
      >
        {text}
      </span>
    </div>
  );

  return href ? (
    <a href={href} rel="noopener noreferrer">
      {Content}
    </a>
  ) : (
    Content
  );
};

export default ContactInfo;
