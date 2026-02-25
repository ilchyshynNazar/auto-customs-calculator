import { describe, it, expect } from 'vitest';
import { calculateBusCustoms } from '../calculateBus.js';

describe('calculateBusCustoms', () => {
  it('should return null for invalid input', () => {
    expect(calculateBusCustoms({})).toBeNull();
    expect(calculateBusCustoms({ price: '' })).toBeNull();
    expect(calculateBusCustoms({ price: '0' })).toBeNull();
    expect(calculateBusCustoms({ price: '-100' })).toBeNull();
  });

  it('should calculate customs for diesel bus', () => {
    const formData = {
      fuel: "Дизель",
      price: "20000"
    };
    const result = calculateBusCustoms(formData);
    expect(result).not.toBeNull();
    expect(result.importDuty).toBe(1000); // 20000 * 0.05
    expect(result.exciseTax).toBe(112.5); // (4500/1000) * 25 = 112.5
    expect(result.vat).toBe(4222.5); // (20000 + 1000 + 112.5) * 0.20
    expect(result.totalCost).toBe(25335);
    expect(result.details.importDutyRate).toBe("5.0");
  });

  it('should calculate customs for gasoline bus', () => {
    const formData = {
      fuel: "Бензин",
      price: "20000"
    };
    const result = calculateBusCustoms(formData);
    expect(result.importDuty).toBe(1000);
    expect(result.exciseTax).toBe(120); // (4000/1000) * 30 = 120
    expect(result.vat).toBe(4224); // (20000 + 1000 + 120) * 0.20
    expect(result.totalCost).toBe(25344);
  });

  it('should handle unknown fuel type', () => {
    const formData = {
      fuel: "Невідомий",
      price: "20000"
    };
    const result = calculateBusCustoms(formData);
    expect(result.exciseTax).toBe(120); // defaults to gasoline
  });
});