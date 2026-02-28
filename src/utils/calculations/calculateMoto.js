import { AGE_FACTOR } from './calculationConstants.js';

/**
 * Розрахунок мита для мотоциклів
 * Мита: 10%, Акциз залежить від об'єму двигуна
 */
export function calculateMotoCustoms(formData) {
  const { fuel, country, age, price, engineVolume } = formData;

  if (!price || !engineVolume) {
    return null;
  }

  const priceEUR = parseFloat(price);
  const engineVol = parseFloat(engineVolume);

  if (isNaN(priceEUR) || isNaN(engineVol) || priceEUR <= 0 || engineVol <= 0) {
    return null;
  }

  const ageFactor = AGE_FACTOR[age] || 1.0;

  const importDutyRate = 0.10;
  const importDuty = priceEUR * importDutyRate;

  const basePrice = priceEUR + importDuty;

  const baseExciseRate = 30;
  const exciseTax = (engineVol / 1000) * baseExciseRate * ageFactor;

  const baseForVAT = basePrice + exciseTax;
  const vat = baseForVAT * 0.20;

  const totalCost = priceEUR + importDuty + exciseTax + vat;

  return {
    importDuty: Math.round(importDuty * 100) / 100,
    exciseTax: Math.round(exciseTax * 100) / 100,
    vat: Math.round(vat * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    details: {
      engineVolume: engineVol,
      ageFactor,
      exciseFormula: `(${engineVol / 1000}л × €30) × ${ageFactor}`,
    }
  };
}