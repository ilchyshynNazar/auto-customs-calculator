import { describe, it, expect } from 'vitest';
import { calculateCarCustoms } from '../calculateCar.js';

describe('calculateCarCustoms', () => {
  it('should return null for invalid input', () => {
    expect(calculateCarCustoms({})).toBeNull();
    expect(calculateCarCustoms({ price: '', engineVolume: '' })).toBeNull();
    expect(calculateCarCustoms({ price: '0', engineVolume: '0' })).toBeNull();
    expect(calculateCarCustoms({ price: '-100', engineVolume: '1000' })).toBeNull();
  });

  describe('gasoline car', () => {
    it('should calculate customs for gasoline car under 3000cc', () => {
      const formData = {
        fuel: "Бензин",  
        age: "1 рік",
        price: "10000",
        engineVolume: "2000"
      };
      const result = calculateCarCustoms(formData);
      expect(result).not.toBeNull();
      expect(result.importDuty).toBe(1000); // 10000 * 0.10
      expect(result.exciseTax).toBe(100); // 50 * (2000/1000) * 1 = 100
      expect(result.vat).toBe(2220); // (10000 + 1000 + 100) * 0.20
      expect(result.totalCost).toBe(13320);
    });

    it('should calculate customs for gasoline car over 3000cc', () => {
      const formData = {
        fuel: "Бензин",
        age: "1 рік",
        price: "10000",
        engineVolume: "3500"
      };
      const result = calculateCarCustoms(formData);
      expect(result).not.toBeNull();
      expect(result.importDuty).toBe(1000);
      expect(result.exciseTax).toBe(350); // 100 * (3500/1000) * 1 = 350
      expect(result.vat).toBe(2270); // (10000 + 1000 + 350) * 0.20
      expect(result.totalCost).toBe(13620);
    });

    it('should apply age coefficient', () => {
      const formData = {
        fuel: "Бензин",
        age: "5 років",
        price: "10000",
        engineVolume: "2000"
      };
      const result = calculateCarCustoms(formData);
      expect(result.exciseTax).toBe(500); // 50 * 2 * 5 = 500
    });
  });

  describe('diesel car', () => {
    it('should calculate customs for diesel car under 3500cc', () => {
      const formData = {
        fuel: "Дизель",
        age: "1 рік",
        price: "10000",
        engineVolume: "3000"
      };
      const result = calculateCarCustoms(formData);
      expect(result.exciseTax).toBe(225); // 75 * (3000/1000) * 1 = 225
    });

    it('should calculate customs for diesel car over 3500cc', () => {
      const formData = {
        fuel: "Дизель",
        age: "1 рік",
        price: "10000",
        engineVolume: "4000"
      };
      const result = calculateCarCustoms(formData);
      expect(result.exciseTax).toBe(600); // 150 * (4000/1000) * 1 = 600
    });
  });

  describe('electric car', () => {
    it('should calculate customs for electric car', () => {
      const formData = {
        fuel: "Електро",
        age: "1 рік",
        price: "20000",
        engineVolume: "1"
      };
      const result = calculateCarCustoms(formData);
      expect(result.importDuty).toBe(0);
      expect(result.exciseTax).toBe(60); // 60 kWh * 1
      expect(result.vat).toBe(0);
      expect(result.totalCost).toBe(20060);
      expect(result.details.fuelType).toBe("Електро");
      expect(result.details.batteryCapacity).toBe(60);
    });
  });

  describe('hybrid car', () => {
    it('should calculate customs for hybrid car', () => {
      const formData = {
        fuel: "Гібрид",
        age: "3 роки",
        price: "15000",
        engineVolume: "2000"
      };
      const result = calculateCarCustoms(formData);
      expect(result.importDuty).toBe(1500);
      expect(result.exciseTax).toBe(300); // 100 * 3
      expect(result.vat).toBe(3360); // (15000 + 1500 + 300) * 0.20
      expect(result.totalCost).toBe(20160);
      expect(result.details.exciseFormula).toBe("100 EUR × 3");
    });
  });

  it('should handle unknown fuel type', () => {
    const formData = {
      fuel: "Невідомий",
      age: "1 рік",
      price: "10000",
      engineVolume: "2000"
    };
    const result = calculateCarCustoms(formData);
    expect(result.exciseTax).toBe(0);
  });
});