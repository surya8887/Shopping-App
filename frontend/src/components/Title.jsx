const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-gray-500 text-center lg:text-3xl sm:text-base ">
        {text1} <span className="text-gray-700  text-3xl font-semibold">{text2}</span>
      </p>
      <div className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700 rounded-full" />
    </div>
  );
};

export default Title;
