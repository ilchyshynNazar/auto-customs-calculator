import React from "react";

export default function SelectField({ label, value, onChange, options, placeholderOption = null, error = null }) {
  return (
    <div className="mb-3">
      <label className="block mb-1 text-sm font-medium text-gray-100">{label}</label>
      <select
        className={`w-full p-2 rounded-md border bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 transition
          ${error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-600 focus:ring-violet-500'
          }`}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {placeholderOption !== null && <option value="">{placeholderOption}</option>}
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
