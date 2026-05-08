const Input = ({ icon: Icon, transparent, ...props }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-primary" />
      </div>
      <input
        {...props}
        className={`w-full px-10 py-3 ${transparent ? "" : "bg-surface bg-opacity-50"} rounded-xl border-2 border-muted text-text placeholder-muted focus:outline-none focus:border-primary transition duration-200`}
      />
    </div>
  );
};

//className="w-full px-10 py-3 bg-gray-800 bg-opacity-50 rounded-xl border-2 border-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-red-300 transition duration-200"
export default Input;
