export type ButtonType = 'digit' | 'operator' | 'function' | 'memory' | 'utility'

export type Operator = '+' | '-' | '×' | '÷' | '='

export type ScientificFunction = 'sin' | 'cos' | 'tan' | 'ln' | 'log' | '√' | 'x²' | 'xⁿ' | '1/x' | 'eⁿ'

export interface ButtonConfig {
  label: string
  value: string
  type: ButtonType
  className?: string
  ariaLabel?: string
  span?: number // grid column span
}

export interface MemoryState {
  value: string
  hasValue: boolean
}

export interface HistoryEntry {
  expression: string
  result: string
  timestamp: number
}

export interface CalculatorState {
  display: string
  previousValue: string | null
  operator: Operator | null
  waitingForOperand: boolean
  hasDecimal: boolean
}

