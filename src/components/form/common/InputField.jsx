import React from "react";

export default function InputField({ label, value, onChange, placeholder = "", unit = null, type = "text", error = null }) {
  return (
    <div className="mb-3">
      <label className="block mb-1 text-sm font-medium text-gray-100">{label}</label>
      <div className="flex items-center">
        <input
          className={`flex-1 p-2 rounded-md border bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition
            ${error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-600 focus:ring-violet-500'
            }`}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
        />
        {unit && <span className="ml-3 text-sm text-gray-300">{unit}</span>}
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
