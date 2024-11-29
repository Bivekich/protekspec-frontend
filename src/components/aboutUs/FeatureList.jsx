function FeatureList({ text }) {
  return (
    <div className="flex gap-2.5 items-start w-full py-1">
      <div className="flex flex-col justify-center w-5 h-6 shrink-0">
        <div className="w-5 h-2.5 bg-[#FAC612]" />
      </div>
      <p className="flex-1 text-base md:text-xl text-[#333]">{text}</p>
    </div>
  );
}

export default FeatureList;
