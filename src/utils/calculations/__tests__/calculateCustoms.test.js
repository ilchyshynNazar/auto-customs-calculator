import { describe, it, expect } from 'vitest';
import calculateCustoms from '../../calculateCustoms.js';

describe('calculateCustoms', () => {
  it('should return null for unknown vehicle type', () => {
    expect(calculateCustoms('unknown', {})).toBeNull();
  });

  it('should delegate to calculateCarCustoms for car', () => {
    const formData = {
      fuel: "Бензин",
      age: "1 рік",
      price: "10000",
      engineVolume: "2000"
    };
    const result = calculateCustoms('car', formData);
    expect(result).not.toBeNull();
    expect(result.importDuty).toBe(1000);
    expect(result.exciseTax).toBe(100);
  });

  it('should delegate to calculateMotoCustoms for moto', () => {
    const formData = {
      fuel: "Бензин",
      age: "1 рік",
      price: "5000",
      engineVolume: "600"
    };
    const result = calculateCustoms('moto', formData);
    expect(result).not.toBeNull();
    expect(result.importDuty).toBe(500);
    expect(result.exciseTax).toBe(18);
  });

  it('should delegate to calculateTruckCustoms for truck', () => {
    const formData = {
      fuel: "Дизель",
      grossMass: "До 5 тонн",
      age: "До 5 років",
      price: "10000"
    };
    const result = calculateCustoms('truck', formData);
    expect(result).not.toBeNull();
    expect(result.importDuty).toBe(500);
    expect(result.exciseTax).toBe(120);
  });

  it('should delegate to calculateBusCustoms for bus', () => {
    const formData = {
      fuel: "Дизель",
      price: "20000"
    };
    const result = calculateCustoms('bus', formData);
    expect(result).not.toBeNull();
    expect(result.importDuty).toBe(1000);
    expect(result.exciseTax).toBe(112.5);
  });
});