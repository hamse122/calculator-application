import Decimal from 'decimal.js'

export interface CalculatorState {
  display: string
  previousValue: string | null
  operator: '+' | '-' | '×' | '÷' | null
  waitingForOperand: boolean
  hasDecimal: boolean
}

const MAX_DISPLAY_LENGTH = 16
const MAX_VALUE = new Decimal(10).pow(MAX_DISPLAY_LENGTH + 5)

/**
 * Formats a number for display, handling overflow with scientific notation
 */
export function formatDisplay(value: string): string {
  try {
    const num = new Decimal(value)
    
    if (num.isNaN() || !num.isFinite()) {
      return 'Error'
    }

    // Handle very large or very small numbers
    const abs = num.abs()
    if (abs.gte(MAX_VALUE) || (abs.gt(0) && abs.lt(new Decimal(1).div(MAX_VALUE)))) {
      const exp = num.toExponential(9)
      return exp.length > MAX_DISPLAY_LENGTH 
        ? exp.substring(0, MAX_DISPLAY_LENGTH) 
        : exp
    }

    // Format as regular number
    let formatted = num.toString()
    
    // Remove trailing zeros after decimal
    if (formatted.includes('.')) {
      formatted = formatted.replace(/\.?0+$/, '')
    }

    // Truncate if too long
    if (formatted.length > MAX_DISPLAY_LENGTH) {
      // Try to format with fewer decimal places
      const parts = formatted.split('.')
      if (parts.length === 2) {
        const integerPart = parts[0]
        const decimalPart = parts[1]
        if (integerPart.length >= MAX_DISPLAY_LENGTH) {
          // Use scientific notation for very long integers
          return num.toExponential(9).substring(0, MAX_DISPLAY_LENGTH)
        }
        const availableSpace = MAX_DISPLAY_LENGTH - integerPart.length - 1
        formatted = integerPart + '.' + decimalPart.substring(0, Math.max(0, availableSpace))
      } else {
        formatted = formatted.substring(0, MAX_DISPLAY_LENGTH)
      }
    }

    return formatted
  } catch {
    return 'Error'
  }
}

/**
 * Performs a calculation between two numbers
 */
export function calculate(
  a: string,
  b: string,
  operator: '+' | '-' | '×' | '÷'
): string {
  try {
    const numA = new Decimal(a)
    const numB = new Decimal(b)

    let result: Decimal

    switch (operator) {
      case '+':
        result = numA.plus(numB)
        break
      case '-':
        result = numA.minus(numB)
        break
      case '×':
        result = numA.times(numB)
        break
      case '÷':
        if (numB.isZero()) {
          return 'Error: Division by zero'
        }
        result = numA.div(numB)
        break
      default:
        return b
    }

    return formatDisplay(result.toString())
  } catch (error) {
    return 'Error'
  }
}

/**
 * Evaluates a scientific function
 */
export function evaluateFunction(value: string, func: string): string {
  try {
    const num = new Decimal(value)
    let result: Decimal

    switch (func) {
      case 'sin':
        result = Decimal.sin(num)
        break
      case 'cos':
        result = Decimal.cos(num)
        break
      case 'tan':
        result = Decimal.tan(num)
        break
      case 'ln':
        if (num.lte(0)) {
          return 'Error: Invalid input'
        }
        result = Decimal.ln(num)
        break
      case 'log':
        if (num.lte(0)) {
          return 'Error: Invalid input'
        }
        result = Decimal.log10(num)
        break
      case '√':
        if (num.lt(0)) {
          return 'Error: Invalid input'
        }
        result = num.sqrt()
        break
      case 'x²':
        result = num.pow(2)
        break
      case '1/x':
        if (num.isZero()) {
          return 'Error: Division by zero'
        }
        result = new Decimal(1).div(num)
        break
      default:
        return value
    }

    return formatDisplay(result.toString())
  } catch (error) {
    return 'Error'
  }
}

/**
 * Calculates power: base^exponent
 */
export function calculatePower(base: string, exponent: string): string {
  try {
    const baseNum = new Decimal(base)
    const expNum = new Decimal(exponent)
    const result = baseNum.pow(expNum)
    return formatDisplay(result.toString())
  } catch (error) {
    return 'Error'
  }
}

/**
 * Calculates percentage
 */
export function calculatePercentage(value: string): string {
  try {
    const num = new Decimal(value)
    const result = num.div(100)
    return formatDisplay(result.toString())
  } catch (error) {
    return 'Error'
  }
}

/**
 * Negates a number
 */
export function negate(value: string): string {
  try {
    if (value === '0' || value === 'Error' || value.startsWith('Error')) {
      return value
    }
    const num = new Decimal(value)
    const result = num.negated()
    return formatDisplay(result.toString())
  } catch (error) {
    return value
  }
}

/**
 * Handles digit input
 */
export function inputDigit(state: CalculatorState, digit: string): CalculatorState {
  if (state.waitingForOperand) {
    return {
      ...state,
      display: digit,
      waitingForOperand: false,
      hasDecimal: false,
    }
  }

  if (state.display === '0' && digit !== '0') {
    return {
      ...state,
      display: digit,
    }
  }

  if (state.display === 'Error' || state.display.startsWith('Error')) {
    return {
      ...state,
      display: digit,
      waitingForOperand: false,
      hasDecimal: false,
    }
  }

  // Prevent overflow
  if (state.display.length >= MAX_DISPLAY_LENGTH) {
    return state
  }

  return {
    ...state,
    display: state.display + digit,
  }
}

/**
 * Handles decimal point input
 */
export function inputDecimal(state: CalculatorState): CalculatorState {
  if (state.waitingForOperand) {
    return {
      ...state,
      display: '0.',
      waitingForOperand: false,
      hasDecimal: true,
    }
  }

  if (state.hasDecimal) {
    return state
  }

  if (state.display === 'Error' || state.display.startsWith('Error')) {
    return {
      ...state,
      display: '0.',
      hasDecimal: true,
      waitingForOperand: false,
    }
  }

  return {
    ...state,
    display: state.display + '.',
    hasDecimal: true,
  }
}

/**
 * Handles operator input
 */
export function inputOperator(
  state: CalculatorState,
  nextOperator: '+' | '-' | '×' | '÷'
): CalculatorState {
  if (state.display === 'Error' || state.display.startsWith('Error')) {
    return {
      ...state,
      display: '0',
      previousValue: null,
      operator: null,
      waitingForOperand: true,
      hasDecimal: false,
    }
  }

  const inputValue = state.display

  if (state.previousValue === null) {
    return {
      ...state,
      previousValue: inputValue,
      operator: nextOperator,
      waitingForOperand: true,
      hasDecimal: false,
    }
  }

  if (!state.waitingForOperand) {
    const currentValue = state.previousValue
    const newValue = calculate(currentValue, inputValue, state.operator!)

    return {
      display: newValue,
      previousValue: newValue,
      operator: nextOperator,
      waitingForOperand: true,
      hasDecimal: false,
    }
  }

  return {
    ...state,
    operator: nextOperator,
  }
}

/**
 * Handles equals operation
 */
export function performEquals(state: CalculatorState): CalculatorState {
  if (
    state.display === 'Error' ||
    state.display.startsWith('Error') ||
    state.previousValue === null ||
    state.operator === null
  ) {
    return {
      ...state,
      previousValue: null,
      operator: null,
      waitingForOperand: true,
      hasDecimal: false,
    }
  }

  const inputValue = state.display
  const newValue = calculate(state.previousValue, inputValue, state.operator)

  return {
    display: newValue,
    previousValue: null,
    operator: null,
    waitingForOperand: true,
    hasDecimal: newValue.includes('.'),
  }
}

/**
 * Clears the calculator (AC)
 */
export function clearAll(): CalculatorState {
  return {
    display: '0',
    previousValue: null,
    operator: null,
    waitingForOperand: true,
    hasDecimal: false,
  }
}

/**
 * Clears current entry (C)
 */
export function clearEntry(state: CalculatorState): CalculatorState {
  return {
    ...state,
    display: '0',
    waitingForOperand: true,
    hasDecimal: false,
  }
}

