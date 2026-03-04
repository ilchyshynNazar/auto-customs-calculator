import { AGE_FACTOR } from './calculationConstants.js';

/**
 * Розрахунок мита для вантажівок
 * Мита: залежать від вантажопідйомності, Акциз: залежить від палива та маси
 */
export function calculateTruckCustoms(formData) {
  const { fuel, grossMass, age, price } = formData;

  if (!price) {
    return null;
  }

  const priceEUR = parseFloat(price);

  if (isNaN(priceEUR) || priceEUR <= 0) {
    return null;
  }

  const ageFactor = AGE_FACTOR[age] || 1.0;

  let importDutyRate = 0.05;

  if (grossMass.includes("5 до 20")) importDutyRate = 0.07;
  if (grossMass.includes("Понад 20")) importDutyRate = 0.10;

  const importDuty = priceEUR * importDutyRate;

  const basePrice = priceEUR + importDuty;

  const baseExciseRate = fuel === "Дизель" ? 40 : 50;
  const engineVolume = fuel === "Дизель" ? 3000 : 2500;
  const exciseTax = (engineVolume / 1000) * baseExciseRate * ageFactor;

  const baseForVAT = basePrice + exciseTax;
  const vat = baseForVAT * 0.20;

  const totalCost = priceEUR + importDuty + exciseTax + vat;

  return {
    importDuty: Math.round(importDuty * 100) / 100,
    exciseTax: Math.round(exciseTax * 100) / 100,
    vat: Math.round(vat * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    details: {
      importDutyRate: (importDutyRate * 100).toFixed(1),
      grossMass,
      ageFactor,
    }
  };
}