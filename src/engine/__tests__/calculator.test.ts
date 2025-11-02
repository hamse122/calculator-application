/**
 * Comprehensive tests for calculator engine functions
 * Tests cover basic operations, edge cases, and error handling
 */
import { describe, it, expect } from 'vitest'
import {
  formatDisplay,
  calculate,
  evaluateFunction,
  calculatePower,
  calculatePercentage,
  negate,
  inputDigit,
  inputDecimal,
  inputOperator,
  performEquals,
  clearAll,
  clearEntry,
} from '../calculator'

describe('Calculator Engine', () => {
  describe('formatDisplay', () => {
    it('formats normal numbers correctly', () => {
      expect(formatDisplay('123')).toBe('123')
      expect(formatDisplay('123.456')).toBe('123.456')
    })

    it('removes trailing zeros', () => {
      expect(formatDisplay('123.45000')).toBe('123.45')
      expect(formatDisplay('100.00')).toBe('100')
    })

    it('handles very large numbers with scientific notation', () => {
      const large = '12345678901234567890'
      const result = formatDisplay(large)
      expect(result.length).toBeLessThanOrEqual(16)
    })

    it('handles very small numbers', () => {
      const small = '0.000000000001'
      const result = formatDisplay(small)
      expect(result).toBeTruthy()
    })
  })

  describe('calculate', () => {
    it('performs addition correctly', () => {
      expect(calculate('10', '5', '+')).toBe('15')
      expect(calculate('2.5', '3.7', '+')).toBe('6.2')
    })

    it('performs subtraction correctly', () => {
      expect(calculate('10', '5', '-')).toBe('5')
      expect(calculate('2.5', '1.3', '-')).toBe('1.2')
    })

    it('performs multiplication correctly', () => {
      expect(calculate('10', '5', '×')).toBe('50')
      expect(calculate('2.5', '4', '×')).toBe('10')
    })

    it('performs division correctly', () => {
      expect(calculate('10', '5', '÷')).toBe('2')
      expect(calculate('7', '2', '÷')).toBe('3.5')
    })

    it('handles division by zero', () => {
      expect(calculate('10', '0', '÷')).toBe('Error: Division by zero')
    })

    it('handles floating point precision issues', () => {
      const result = calculate('0.1', '0.2', '+')
      expect(result).toBe('0.3')
    })

    it('handles chained operations', () => {
      const step1 = calculate('10', '5', '+')
      expect(step1).toBe('15')
      const step2 = calculate(step1, '3', '×')
      expect(step2).toBe('45')
    })
  })

  describe('evaluateFunction', () => {
    it('calculates sine correctly', () => {
      const result = evaluateFunction('0', 'sin')
      expect(result).toBe('0')
    })

    it('calculates cosine correctly', () => {
      const result = evaluateFunction('0', 'cos')
      expect(result).toBe('1')
    })

    it('calculates square root correctly', () => {
      expect(evaluateFunction('4', '√')).toBe('2')
      expect(evaluateFunction('9', '√')).toBe('3')
    })

    it('handles invalid square root input', () => {
      expect(evaluateFunction('-4', '√')).toBe('Error: Invalid input')
    })

    it('calculates x² correctly', () => {
      expect(evaluateFunction('5', 'x²')).toBe('25')
      expect(evaluateFunction('3', 'x²')).toBe('9')
    })

    it('calculates 1/x correctly', () => {
      expect(evaluateFunction('2', '1/x')).toBe('0.5')
      expect(evaluateFunction('4', '1/x')).toBe('0.25')
    })

    it('handles division by zero in 1/x', () => {
      expect(evaluateFunction('0', '1/x')).toBe('Error: Division by zero')
    })

    it('calculates natural logarithm', () => {
      const result = evaluateFunction('1', 'ln')
      expect(result).toBe('0')
    })

    it('handles invalid ln input', () => {
      expect(evaluateFunction('-1', 'ln')).toBe('Error: Invalid input')
      expect(evaluateFunction('0', 'ln')).toBe('Error: Invalid input')
    })

    it('calculates base 10 logarithm', () => {
      const result = evaluateFunction('100', 'log')
      expect(result).toBe('2')
    })
  })

  describe('calculatePower', () => {
    it('calculates power correctly', () => {
      expect(calculatePower('2', '3')).toBe('8')
      expect(calculatePower('5', '2')).toBe('25')
    })

    it('handles fractional exponents', () => {
      const result = calculatePower('4', '0.5')
      expect(result).toBe('2')
    })
  })

  describe('calculatePercentage', () => {
    it('calculates percentage correctly', () => {
      expect(calculatePercentage('50')).toBe('0.5')
      expect(calculatePercentage('100')).toBe('1')
      expect(calculatePercentage('25')).toBe('0.25')
    })
  })

  describe('negate', () => {
    it('negates positive numbers', () => {
      expect(negate('5')).toBe('-5')
      expect(negate('10.5')).toBe('-10.5')
    })

    it('negates negative numbers', () => {
      expect(negate('-5')).toBe('5')
      expect(negate('-10.5')).toBe('10.5')
    })

    it('handles zero', () => {
      expect(negate('0')).toBe('0')
    })

    it('handles error state', () => {
      expect(negate('Error')).toBe('Error')
    })
  })

  describe('inputDigit', () => {
    it('inputs first digit', () => {
      const state = { display: '0', previousValue: null, operator: null, waitingForOperand: true, hasDecimal: false }
      const result = inputDigit(state, '5')
      expect(result.display).toBe('5')
      expect(result.waitingForOperand).toBe(false)
    })

    it('appends digits to existing number', () => {
      const state = { display: '5', previousValue: null, operator: null, waitingForOperand: false, hasDecimal: false }
      const result = inputDigit(state, '3')
      expect(result.display).toBe('53')
    })

    it('resets when waiting for operand', () => {
      const state = { display: '10', previousValue: '5', operator: '+', waitingForOperand: true, hasDecimal: false }
      const result = inputDigit(state, '7')
      expect(result.display).toBe('7')
      expect(result.waitingForOperand).toBe(false)
    })

    it('handles error state', () => {
      const state = { display: 'Error', previousValue: null, operator: null, waitingForOperand: true, hasDecimal: false }
      const result = inputDigit(state, '5')
      expect(result.display).toBe('5')
    })

    it('prevents overflow', () => {
      const longNumber = '123456789012345'
      const state = { display: longNumber, previousValue: null, operator: null, waitingForOperand: false, hasDecimal: false }
      const result = inputDigit(state, '6')
      expect(result.display).toBe(longNumber)
    })
  })

  describe('inputDecimal', () => {
    it('adds decimal point', () => {
      const state = { display: '5', previousValue: null, operator: null, waitingForOperand: false, hasDecimal: false }
      const result = inputDecimal(state)
      expect(result.display).toBe('5.')
      expect(result.hasDecimal).toBe(true)
    })

    it('prevents duplicate decimal points', () => {
      const state = { display: '5.5', previousValue: null, operator: null, waitingForOperand: false, hasDecimal: true }
      const result = inputDecimal(state)
      expect(result.display).toBe('5.5')
    })

    it('starts with 0. when waiting for operand', () => {
      const state = { display: '10', previousValue: '5', operator: '+', waitingForOperand: true, hasDecimal: false }
      const result = inputDecimal(state)
      expect(result.display).toBe('0.')
      expect(result.hasDecimal).toBe(true)
    })
  })

  describe('inputOperator', () => {
    it('stores operator when no previous value', () => {
      const state = { display: '10', previousValue: null, operator: null, waitingForOperand: false, hasDecimal: false }
      const result = inputOperator(state, '+')
      expect(result.previousValue).toBe('10')
      expect(result.operator).toBe('+')
      expect(result.waitingForOperand).toBe(true)
    })

    it('calculates and stores new operator', () => {
      const state = { display: '5', previousValue: '10', operator: '+', waitingForOperand: false, hasDecimal: false }
      const result = inputOperator(state, '-')
      expect(result.display).toBe('15')
      expect(result.previousValue).toBe('15')
      expect(result.operator).toBe('-')
    })
  })

  describe('performEquals', () => {
    it('calculates result correctly', () => {
      const state = { display: '5', previousValue: '10', operator: '+', waitingForOperand: false, hasDecimal: false }
      const result = performEquals(state)
      expect(result.display).toBe('15')
      expect(result.previousValue).toBe(null)
      expect(result.operator).toBe(null)
    })

    it('handles error state', () => {
      const state = { display: 'Error', previousValue: '10', operator: '+', waitingForOperand: false, hasDecimal: false }
      const result = performEquals(state)
      expect(result.previousValue).toBe(null)
      expect(result.operator).toBe(null)
    })
  })

  describe('clearAll', () => {
    it('resets calculator state', () => {
      const result = clearAll()
      expect(result.display).toBe('0')
      expect(result.previousValue).toBe(null)
      expect(result.operator).toBe(null)
      expect(result.waitingForOperand).toBe(true)
    })
  })

  describe('clearEntry', () => {
    it('clears current display', () => {
      const state = { display: '123', previousValue: '10', operator: '+', waitingForOperand: false, hasDecimal: false }
      const result = clearEntry(state)
      expect(result.display).toBe('0')
      expect(result.waitingForOperand).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('handles very large numbers', () => {
      const large = '9999999999999999'
      const result = calculate(large, '1', '+')
      expect(result).toBeTruthy()
    })

    it('handles chained decimal inputs', () => {
      let state = { display: '0', previousValue: null, operator: null, waitingForOperand: true, hasDecimal: false }
      state = inputDigit(state, '1')
      state = inputDecimal(state)
      state = inputDigit(state, '2')
      state = inputDecimal(state) // Should not add another decimal
      state = inputDigit(state, '3')
      expect(state.display).toBe('1.23')
    })

    it('handles multiple operator presses', () => {
      let state = { display: '10', previousValue: null, operator: null, waitingForOperand: false, hasDecimal: false }
      state = inputOperator(state, '+')
      state = inputOperator(state, '-')
      expect(state.operator).toBe('-')
    })

    it('handles operations with zero', () => {
      expect(calculate('0', '5', '+')).toBe('5')
      expect(calculate('5', '0', '-')).toBe('5')
      expect(calculate('0', '5', '×')).toBe('0')
    })
  })
})

