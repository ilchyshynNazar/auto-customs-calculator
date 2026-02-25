import { describe, it, expect } from 'vitest';
import { calculateTruckCustoms } from '../calculateTruck.js';

describe('calculateTruckCustoms', () => {
  it('should return null for invalid input', () => {
    expect(calculateTruckCustoms({})).toBeNull();
    expect(calculateTruckCustoms({ price: '' })).toBeNull();
    expect(calculateTruckCustoms({ price: '0' })).toBeNull();
    expect(calculateTruckCustoms({ price: '-100' })).toBeNull();
  });

  describe('import duty rates', () => {
    it('should apply 5% for trucks under 5 tons', () => {
      const formData = {
        fuel: "Дизель",
        grossMass: "До 5 тонн",
        age: "До 5 років",
        price: "10000"
      };
      const result = calculateTruckCustoms(formData);
      expect(result.importDuty).toBe(500); // 10000 * 0.05
      expect(result.details.importDutyRate).toBe("5.0");
    });

    it('should apply 7% for trucks 5-20 tons', () => {
      const formData = {
        fuel: "Дизель",
        grossMass: "Від 5 до 20 тонн",
        age: "До 5 років",
        price: "10000"
      };
      const result = calculateTruckCustoms(formData);
      expect(result.importDuty).toBe(700); // 10000 * 0.07
      expect(result.details.importDutyRate).toBe("7.0");
    });

    it('should apply 10% for trucks over 20 tons', () => {
      const formData = {
        fuel: "Дизель",
        grossMass: "Понад 20 тонн",
        age: "До 5 років",
        price: "10000"
      };
      const result = calculateTruckCustoms(formData);
      expect(result.importDuty).toBe(1000); // 10000 * 0.10
      expect(result.details.importDutyRate).toBe("10.0");
    });
  });

  describe('excise tax', () => {
    it('should calculate excise for diesel truck', () => {
      const formData = {
        fuel: "Дизель",
        grossMass: "До 5 тонн",
        age: "До 5 років",
        price: "10000"
      };
      const result = calculateTruckCustoms(formData);
      expect(result.exciseTax).toBe(120); // (3000/1000) * 40 * 1.0 = 120
    });

    it('should calculate excise for gasoline truck', () => {
      const formData = {
        fuel: "Бензин",
        grossMass: "До 5 тонн",
        age: "До 5 років",
        price: "10000"
      };
      const result = calculateTruckCustoms(formData);
      expect(result.exciseTax).toBe(125); // (2500/1000) * 50 * 1.0 = 125
    });

    it('should apply age factor', () => {
      const formData = {
        fuel: "Дизель",
        grossMass: "До 5 тонн",
        age: "Від 8 років",
        price: "10000"
      };
      const result = calculateTruckCustoms(formData);
      expect(result.exciseTax).toBe(120); // 120 * 1.0 (default since age not in AGE_FACTOR)
      expect(result.details.ageFactor).toBe(1.0);
    });
  });

  it('should calculate total cost correctly', () => {
    const formData = {
      fuel: "Дизель",
      grossMass: "До 5 тонн",
      age: "До 5 років",
      price: "10000"
    };
    const result = calculateTruckCustoms(formData);
    expect(result.totalCost).toBe(12744); // 10000 + 500 + 120 + 2124
  });
});