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

import { calculateCarCustoms } from './calculations/calculateCar.js';
import { calculateMotoCustoms } from './calculations/calculateMoto.js';
import { calculateTruckCustoms } from './calculations/calculateTruck.js';
import { calculateBusCustoms } from './calculations/calculateBus.js';

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
