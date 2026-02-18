import React from "react";
import InputField from "./InputField.jsx";
import SelectField from "./SelectField.jsx";

export default function CustomFormBase({ data, onChange, sharedFields }) {
  return (
    <>
      {sharedFields.map(field => {
        if (field.type === "input") {
          return (
            <InputField
              key={field.name}
              label={field.label}
              value={data[field.name]}
              onChange={val => onChange(field.name, val)}
              error={field.error}
              {...(field.props || {})}
            />
          );
        }
        if (field.type === "select") {
          return (
            <SelectField
              key={field.name}
              label={field.label}
              value={data[field.name]}
              onChange={val => onChange(field.name, val)}
              options={field.options}
              error={field.error}
              {...(field.props || {})}
            />
          );
        }
        return null;
      })}
    </>
  );
}
