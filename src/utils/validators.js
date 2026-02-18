
export const fieldLabels = {
  fuel: "Тип палива",
  country: "Країна походження",
  age: "Вік",
  price: "Вартість",
  engineVolume: "Об'єм двигуна",
  grossMass: "Валова маса",
};

export function validatePrice(value, label = "Ціна") {
  if (!value) {
    return `${label} обов'язкова`;
  }
  
  const numValue = parseFloat(value);
  
  if (isNaN(numValue)) {
    return `${label} має бути числом`;
  }
  
  if (numValue <= 0) {
    return `${label} повинна бути більше за 0`;
  }
  
  return null;
}

export function validateEngineVolume(value, label = "Об'єм двигуна") {
  if (!value) {
    return `${label} обов'язковий`;
  }
  
  const numValue = parseFloat(value);
  
  if (isNaN(numValue)) {
    return `${label} має бути числом`;
  }
  
  if (numValue <= 0) {
    return `${label} повинен бути більше за 0`;
  }
  
  if (numValue > 10000) {
    return `${label} не может перевищувати 10000 см³`;
  }
  
  return null;
}

export function validateSelect(value, label) {
  if (!value) {
    return `${label} обов'язкова`;
  }
  
  return null;
}

export function validateCarForm(formData) {
  const errors = {};
  
  const fuelError = validateSelect(formData.fuel, fieldLabels.fuel);
  if (fuelError) errors.fuel = fuelError;
  
  const countryError = validateSelect(formData.country, fieldLabels.country);
  if (countryError) errors.country = countryError;
  
  const ageError = validateSelect(formData.age, fieldLabels.age);
  if (ageError) errors.age = ageError;
  
  const priceError = validatePrice(formData.price, fieldLabels.price);
  if (priceError) errors.price = priceError;
  
  const engineError = validateEngineVolume(formData.engineVolume, fieldLabels.engineVolume);
  if (engineError) errors.engineVolume = engineError;
  
  return errors;
}

export function validateMotoForm(formData) {
  const errors = {};
  
  const fuelError = validateSelect(formData.fuel, fieldLabels.fuel);
  if (fuelError) errors.fuel = fuelError;
  
  const countryError = validateSelect(formData.country, fieldLabels.country);
  if (countryError) errors.country = countryError;
  
  const ageError = validateSelect(formData.age, fieldLabels.age);
  if (ageError) errors.age = ageError;
  
  const priceError = validatePrice(formData.price, fieldLabels.price);
  if (priceError) errors.price = priceError;
  
  const engineError = validateEngineVolume(formData.engineVolume, fieldLabels.engineVolume);
  if (engineError) errors.engineVolume = engineError;
  
  return errors;
}

export function validateTruckForm(formData) {
  const errors = {};
  
  const fuelError = validateSelect(formData.fuel, fieldLabels.fuel);
  if (fuelError) errors.fuel = fuelError;
  
  const countryError = validateSelect(formData.country, fieldLabels.country);
  if (countryError) errors.country = countryError;
  
  const ageError = validateSelect(formData.age, fieldLabels.age);
  if (ageError) errors.age = ageError;
  
  const massError = validateSelect(formData.grossMass, fieldLabels.grossMass);
  if (massError) errors.grossMass = massError;
  
  const priceError = validatePrice(formData.price, fieldLabels.price);
  if (priceError) errors.price = priceError;
  
  return errors;
}

export function validateBusForm(formData) {
  const errors = {};
  
  const fuelError = validateSelect(formData.fuel, fieldLabels.fuel);
  if (fuelError) errors.fuel = fuelError;
  
  const countryError = validateSelect(formData.country, fieldLabels.country);
  if (countryError) errors.country = countryError;
  
  const ageError = validateSelect(formData.age, fieldLabels.age);
  if (ageError) errors.age = ageError;
  
  const priceError = validatePrice(formData.price, fieldLabels.price);
  if (priceError) errors.price = priceError;
  
  return errors;
}

export function getValidator(vehicleType) {
  const validators = {
    car: validateCarForm,
    moto: validateMotoForm,
    truck: validateTruckForm,
    bus: validateBusForm,
  };
  
  return validators[vehicleType] || validateCarForm;
}
