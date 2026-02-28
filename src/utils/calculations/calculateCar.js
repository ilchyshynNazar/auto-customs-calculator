import { CAR_EXCISE_BASE_RATES, getAgeCoefficient } from './calculationConstants.js';

/**
 * Отримати акциз для легкового автомобіля
 * Формула: Ставка = Ставка_базова × К_двигун × К_вік
 * де К_двигун = об'єм_см³ / 1000
 */
function getCarExciseTax(fuel, engineVolume, ageCoefficient) {
  if (fuel === "Електро") {
    return 0;
  }

  if (fuel === "Гібрид") {
    return 100 * ageCoefficient;
  }

  const rates = CAR_EXCISE_BASE_RATES[fuel];

  if (!rates) {
    return 0;
  }

  const baseRate = engineVolume > rates.threshold ? rates.above : rates.below;

  const engineCoefficient = engineVolume / 1000;

  return baseRate * engineCoefficient * ageCoefficient;
}

/**
 * Розрахунок мита та акцизу для легкового автомобіля
 */
export function calculateCarCustoms(formData) {
  const { fuel, country, age, price, engineVolume } = formData;

  if (!price || !engineVolume) {
    return null;
  }

  const priceEUR = parseFloat(price);
  const engineVol = parseFloat(engineVolume);

  if (isNaN(priceEUR) || isNaN(engineVol) || priceEUR <= 0 || engineVol <= 0) {
    return null;
  }

  const ageCoeff = getAgeCoefficient(age);

  if (fuel === "Електро") {
    const importDuty = 0;

    const batteryCapacity = 60;
    const exciseTax = batteryCapacity * 1;

    const vat = 0;

    const totalCost = priceEUR + importDuty + exciseTax + vat;

    return {
      importDuty: Math.round(importDuty * 100) / 100,
      exciseTax: Math.round(exciseTax * 100) / 100,
      vat: Math.round(vat * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      details: {
        engineVolume: engineVol,
        ageCoefficient: ageCoeff,
        fuelType: "Електро",
        batteryCapacity: batteryCapacity,
        exciseFormula: `${batteryCapacity} kWh × 1 EUR/kWh`,
        note: "ПДВ звільнено до 01.01.2026",
      }
    };
  }

  const importDutyRate = 0.10;
  const importDuty = priceEUR * importDutyRate;

  const exciseTax = getCarExciseTax(fuel, engineVol, ageCoeff);

  const baseForVAT = priceEUR + importDuty + exciseTax;
  const vat = baseForVAT * 0.20;

  const totalCost = priceEUR + importDuty + exciseTax + vat;

  return {
    importDuty: Math.round(importDuty * 100) / 100,
    exciseTax: Math.round(exciseTax * 100) / 100,
    vat: Math.round(vat * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    details: {
      engineVolume: engineVol,
      ageCoefficient: ageCoeff,
      fuelType: fuel,
      exciseFormula: fuel === "Гібрид"
        ? `100 EUR × ${ageCoeff}`
        : `Ставка_базова × ${(engineVol / 1000).toFixed(2)} × ${ageCoeff}`,
    }
  };
}