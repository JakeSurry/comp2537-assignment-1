const Select = ({ value, onChange, options, placeholder, disabled = false }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="py-3 px-4 pr-10 appearance-none bg-gray-800 bg-opacity-50 backdrop-blur-2xl rounded-xl border-2 border-gray-700 text-gray-300 focus:outline-none focus:border-red-300 transition duration-200 hover:cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%239ca3af%22%20stroke-width=%222%22><polyline%20points=%226%209%2012%2015%2018%209%22/></svg>')] bg-[length:16px] bg-[position:right_12px_center] bg-no-repeat"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
