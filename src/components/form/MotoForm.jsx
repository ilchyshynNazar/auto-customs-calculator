import React from "react";
import CustomFormBase from "./common/CustomFormBase.jsx";
import { FuelTypes, MotoCountries, MotoAges } from "../../utils/constants.js";
import { validateMotoForm } from "../../utils/validators.js";

export default function MotoForm({ onSubmit }) {
  const [data, setData] = React.useState({
    fuel: "Бензин",
    country: "Інші",
    age: "1-5 років",
    price: "",
    engineVolume: "",
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
    const validationErrors = validateMotoForm(data);
    setErrors(validationErrors);
    
    if (Object.values(validationErrors).every(err => err === null)) {
      if (onSubmit) {
        onSubmit(data);
      }
    }
  };

  const sharedFields = [
    { type: "select", name: "fuel", label: "Пальне", options: FuelTypes },
    { type: "select", name: "country", label: "Країна походження", options: MotoCountries },
    { type: "select", name: "age", label: "Вік мотоциклу", options: MotoAges },
    {
      type: "input",
      name: "price",
      label: "Вартість за кордоном",
      props: { placeholder: "2000", unit: "EUR", type: "number" },
      error: errors.price,
    },
    {
      type: "input",
      name: "engineVolume",
      label: "Об'єм двигуна",
      props: { placeholder: "600", unit: "см3", type: "number" },
      error: errors.engineVolume,
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <CustomFormBase data={data} onChange={handleChange} sharedFields={sharedFields} />
      <button type="submit" className="mt-6 w-full px-6 py-3 bg-violet-600 rounded-lg text-white font-bold text-lg hover:bg-violet-700 transition">Розрахувати</button>
    </form>
  );
}