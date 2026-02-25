/**
 * Розрахунок мита для автобусів
 * Мита: 5% (нижча ставка для громадського транспорту), Акциз: залежить від палива
 */
export function calculateBusCustoms(formData) {
  const { fuel, price } = formData;

  if (!price) {
    return null;
  }

  const priceEUR = parseFloat(price);

  if (isNaN(priceEUR) || priceEUR <= 0) {
    return null;
  }

  const importDutyRate = 0.05;
  const importDuty = priceEUR * importDutyRate;

  const basePrice = priceEUR + importDuty;

  const baseExciseRate = fuel === "Дизель" ? 25 : 30;
  const engineVolume = fuel === "Дизель" ? 4500 : 4000;
  const exciseTax = (engineVolume / 1000) * baseExciseRate;

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
    }
  };
}