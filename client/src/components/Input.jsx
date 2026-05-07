const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative my-2">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-red-300" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-2  rounded-lg outline-none border border-gray-700 focus:border-red-300 focus:ring-2 focus:ring-red-300 text-white placeholder-gray-400 transition duration-200"
      />
    </div>
  );
};

export default Input;
