import React from "react";
import CustomFormBase from "./common/CustomFormBase.jsx";
import { FuelTypes, BusCountries, BusAges } from "../../utils/constants.js";
import { validateBusForm } from "../../utils/validators.js";

export default function BusForm({ onSubmit }) {
  const [data, setData] = React.useState({
    fuel: "Дизель",
    country: "Інші",
    age: "До 8 років",
    price: "",
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateBusForm(data);
    setErrors(validationErrors);
    
    if (Object.values(validationErrors).every(err => err === null)) {
      if (onSubmit) {
        onSubmit(data);
      }
    }
  };

  const sharedFields = [
    { type: "select", name: "fuel", label: "Тип палива", options: FuelTypes },
    { type: "select", name: "country", label: "Країна походження", options: BusCountries },
    { type: "select", name: "age", label: "Вік автобуса", options: BusAges },
    {
      type: "input",
      name: "price",
      label: "Вартість за кордоном",
      props: { placeholder: "25000", unit: "EUR", type: "number" },
      error: errors.price,
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <CustomFormBase data={data} onChange={handleChange} sharedFields={sharedFields} />
      <button type="submit" className="mt-6 w-full px-6 py-3 bg-violet-600 rounded-lg text-white font-bold text-lg hover:bg-violet-700 transition">Розрахувати</button>
    </form>
  );
}