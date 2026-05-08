import { ChevronDown } from "lucide-react";

const Select = ({ value, onChange, options, placeholder }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="py-3 px-4 pr-10 appearance-none bg-surface bg-opacity-50 rounded-xl border-2 border-muted text-text focus:outline-none focus:border-primary hover:border-primary transition duration-200 hover:cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-3 top-[35%] text-text pointer-events-none"
        size={18}
      />
    </div>
  );
};

export default Select;
