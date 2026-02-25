import { describe, it, expect } from 'vitest';
import { getAgeCoefficient, AGE_FACTOR, CAR_EXCISE_BASE_RATES, COUNTRY_FACTOR } from '../calculationConstants.js';

describe('calculationConstants', () => {
  describe('getAgeCoefficient', () => {
    it('should return correct age coefficient for each age string', () => {
      expect(getAgeCoefficient("1 рік")).toBe(1);
      expect(getAgeCoefficient("2 роки")).toBe(2);
      expect(getAgeCoefficient("5 років")).toBe(5);
      expect(getAgeCoefficient("10 років")).toBe(10);
      expect(getAgeCoefficient("Від 15 років")).toBe(15);
    });

    it('should return 1 for unknown age string', () => {
      expect(getAgeCoefficient("Невідомий")).toBe(1);
      expect(getAgeCoefficient("")).toBe(1);
    });
  });

  describe('AGE_FACTOR', () => {
    it('should have correct age factors', () => {
      expect(AGE_FACTOR["1 рік"]).toBe(1.0);
      expect(AGE_FACTOR["5 років"]).toBe(0.80);
      expect(AGE_FACTOR["Від 15 років"]).toBe(0.25);
    });
  });

  describe('CAR_EXCISE_BASE_RATES', () => {
    it('should have correct rates for gasoline', () => {
      expect(CAR_EXCISE_BASE_RATES["Бензин"]).toEqual({
        threshold: 3000,
        below: 50,
        above: 100,
      });
    });

    it('should have correct rates for diesel', () => {
      expect(CAR_EXCISE_BASE_RATES["Дизель"]).toEqual({
        threshold: 3500,
        below: 75,
        above: 150,
      });
    });

    it('should have correct rates for electric', () => {
      expect(CAR_EXCISE_BASE_RATES["Електро"]).toEqual({
        perKwh: 1,
        duty: 0,
        vat: 0,
      });
    });

    it('should have correct rates for hybrid', () => {
      expect(CAR_EXCISE_BASE_RATES["Гібрид"]).toEqual({
        fixed: 100,
      });
    });
  });

  describe('COUNTRY_FACTOR', () => {
    it('should have correct country factors', () => {
      expect(COUNTRY_FACTOR["Німеччина"]).toBe(1.0);
      expect(COUNTRY_FACTOR["США"]).toBe(1.1);
      expect(COUNTRY_FACTOR["Інші"]).toBe(1.15);
    });
  });
});