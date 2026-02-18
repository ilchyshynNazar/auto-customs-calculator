/**
 * Розрахунок мита для тимчасового імпорту ТЗ в Україну
 * Станом на лютий 2026 року
 * 
 * Формула акцизу (за офіційним законодавством України):
 * Ставка = Ставка_базова × К_двигун × К_вік
 * 
 * де К_двигун = об'єм_см³ / 1000
 * К_вік = кількість повних років від року_випуску+1 до поточного року (max 15)
 */

/**
 * Базові ставки акцизу для легкових автомобілів (в EUR за 1 ТЗ)
 * Ставка базова залежить від типу двигуна:
 * 
 * Бензин: до 3000см³ = €50, понад 3000см³ = €100
 * Дизель: до 3500см³ = €75, понад 3500см³ = €150
 * Електро: 1 EUR за 1 kWh ємності батареї
 * Гібрид: 100 EUR за 1 штуку (фіксовано)
 */
const CAR_EXCISE_BASE_RATES = {
  "Бензин": {
    threshold: 3000,        
    below: 50,              
    above: 100,             
  },
  "Дизель": {
    threshold: 3500,
    below: 75,
    above: 150,
  },
  "Електро": {
    perKwh: 1,             
    duty: 0,               
    vat: 0,                
  },
  "Гібрид": {
    fixed: 100,             
  },
};

const AGE_FACTOR = {
  "1 рік": 1.0,
  "2 роки": 0.95,
  "3 роки": 0.90,
  "4 роки": 0.85,
  "5 років": 0.80,
  "6 років": 0.75,
  "7 років": 0.70,
  "8 років": 0.65,
  "9 років": 0.60,
  "10 років": 0.55,
  "11 років": 0.50,
  "12 років": 0.45,
  "13 років": 0.40,
  "14 років": 0.35,
  "Від 15 років": 0.25,
};

const COUNTRY_FACTOR = {
  "Німеччина": 1.0,
  "Франція": 1.0,
  "Японія": 1.05,
  "Південна Корея": 1.05,
  "США": 1.1,
  "Інші": 1.15,
};

/**
 * Розрахунок коефіцієнта віку (К_вік)
 * К_вік = повна кількість років від року_випуску+1 до поточного року
 * Для нових авто (до 1 року) = 1
 * Максимум 15 років
 */
function getAgeCoefficient(ageString) {
  const ageMap = {
    "1 рік": 1,
    "2 роки": 2,
    "3 роки": 3,
    "4 роки": 4,
    "5 років": 5,
    "6 років": 6,
    "7 років": 7,
    "8 років": 8,
    "9 років": 9,
    "10 років": 10,
    "11 років": 11,
    "12 років": 12,
    "13 років": 13,
    "14 років": 14,
    "Від 15 років": 15,
  };
  
  return ageMap[ageString] || 1;
}

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

/**
 * Розрахунок мита для вантажівок
 * Мита: залежать від вантажопідйомності, Акциз: залежить від палива та маси
 */
export function calculateTruckCustoms(formData) {
  const { fuel, country, grossMass, age, price } = formData;
  
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

export default function calculateCustoms(vehicleType, formData) {
  switch (vehicleType) {
    case "car":
      return calculateCarCustoms(formData);
    case "moto":
      return calculateMotoCustoms(formData);
    case "truck":
      return calculateTruckCustoms(formData);
    case "bus":
      return calculateBusCustoms(formData);
    default:
      return null;
  }
}
