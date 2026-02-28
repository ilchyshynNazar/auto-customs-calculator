import { describe, it, expect } from 'vitest';
import { calculateMotoCustoms } from '../calculateMoto.js';

describe('calculateMotoCustoms', () => {
  it('should return null for invalid input', () => {
    expect(calculateMotoCustoms({})).toBeNull();
    expect(calculateMotoCustoms({ price: '', engineVolume: '' })).toBeNull();
    expect(calculateMotoCustoms({ price: '0', engineVolume: '0' })).toBeNull();
    expect(calculateMotoCustoms({ price: '-100', engineVolume: '500' })).toBeNull();
  });

  it('should calculate customs for motorcycle', () => {
    const formData = {
      fuel: "Бензин",
      age: "1 рік",
      price: "5000",
      engineVolume: "600"
    };
    const result = calculateMotoCustoms(formData);
    expect(result).not.toBeNull();
    expect(result.importDuty).toBe(500); // 5000 * 0.10
    expect(result.exciseTax).toBe(18); // (600/1000) * 30 * 1.0 = 18
    expect(result.vat).toBe(1103.6); // (5000 + 500 + 18) * 0.20
    expect(result.totalCost).toBe(6621.6);
    expect(result.details.exciseFormula).toBe("(0.6л × €30) × 1");
  });

  it('should apply age factor', () => {
    const formData = {
      fuel: "Бензин",
      age: "5 років",
      price: "5000",
      engineVolume: "600"
    };
    const result = calculateMotoCustoms(formData);
    expect(result.exciseTax).toBe(14.4); // 18 * 0.80
    expect(result.details.ageFactor).toBe(0.80);
  });

  it('should handle different age categories', () => {
    const testCases = [
      { age: "1 рік", factor: 1.0 },
      { age: "Від 15 років", factor: 0.25 },
    ];

    testCases.forEach(({ age, factor }) => {
      const formData = {
        fuel: "Бензин",
        age,
        price: "5000",
        engineVolume: "1000"
      };
      const result = calculateMotoCustoms(formData);
      expect(result.details.ageFactor).toBe(factor);
      expect(result.exciseTax).toBe(30 * factor); // (1000/1000) * 30 * factor
    });
  });
});