import React from "react";
import CustomFormBase from "./common/CustomFormBase.jsx";
import { FuelTypes, TruckCountries, TruckAges, TruckGrossMass } from "../../utils/constants.js";
import { validateTruckForm } from "../../utils/validators.js";
import posthog from 'posthog-js';
import * as Sentry from "@sentry/react";

export default function TruckForm({ onSubmit }) {
  const [data, setData] = React.useState({
    fuel: "Дизель",
    country: "Інші",
    age: "До 5 років",
    grossMass: "До 5 тонн",
    price: "",
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (field, value) => {
    try {
      setData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const validationErrors = validateTruckForm(data);
      setErrors(validationErrors);
      
      if (Object.values(validationErrors).every(err => err === null)) {
        posthog.capture('truck_form_submitted', {
          fuel: data.fuel,
          country: data.country,
          age: data.age,
          gross_mass: data.grossMass,
          price: data.price,
          is_authenticated: false, 
        });

        if (onSubmit) onSubmit(data);
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const sharedFields = [
    { type: "select", name: "fuel", label: "Тип палива", options: FuelTypes },
    { type: "select", name: "country", label: "Країна походження", options: TruckCountries },
    { type: "select", name: "age", label: "Вік вантажівки", options: TruckAges },
    { type: "select", name: "grossMass", label: "Валова маса", options: TruckGrossMass },
    {
      type: "input",
      name: "price",
      label: "Вартість за кордоном",
      props: { placeholder: "15000", unit: "EUR", type: "number" },
      error: errors.price,
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <CustomFormBase data={data} onChange={handleChange} sharedFields={sharedFields} />
      <button
        type="submit"
        className="mt-6 w-full px-6 py-3 bg-violet-600 rounded-lg text-white font-bold text-lg hover:bg-violet-700 transition"
      >
        Розрахувати
      </button>
    </form>
  );
}
