const ContactInfo = ({ icon, text, isUpperCase }) => {
  return (
    <div className="flex gap-2.5 items-center self-start whitespace-nowrap group cursor-pointer">
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square group-hover:scale-110 transition-transform duration-200 [filter:brightness(0)]"
      />
      <div
        className={`self-stretch my-auto group-hover:text-[#FAC612] transition-colors duration-200 ${
          isUpperCase ? "uppercase" : ""
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ContactInfo;
