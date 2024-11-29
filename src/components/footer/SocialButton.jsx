const SocialButton = ({ icon }) => {
  return (
    <div className="flex overflow-hidden gap-2.5 justify-center items-center w-11 h-11 bg-[#1A1A1A] min-h-[44px] rounded-[200px] hover:scale-105 transition-transform duration-200">
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="object-contain self-stretch my-auto w-5 aspect-square"
      />
    </div>
  );
};

export default SocialButton;
