import React, { useState, useEffect, useCallback } from 'react'
import Display from './Display'
import Keypad from './Keypad'
import MemoryPanel from './MemoryPanel'
import HistoryPanel from './HistoryPanel'
import { useMemory } from '../contexts/MemoryContext'
import { useHistory } from '../contexts/HistoryContext'
import {
  CalculatorState,
  inputDigit,
  inputDecimal,
  inputOperator,
  performEquals,
  clearAll,
  clearEntry,
  negate,
  calculatePercentage,
  evaluateFunction,
  calculatePower,
} from '../engine/calculator'

export default function Calculator() {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operator: null,
    waitingForOperand: true,
    hasDecimal: false,
  })

  // Scientific mode toggle state
  const [isScientificMode, setIsScientificMode] = useState(false)
  // Track last input for handling special cases (e.g., exponent operations)
  const [lastInput, setLastInput] = useState<string | null>(null)
  // Flag to indicate when waiting for exponent input in power operations
  const [expectingExponent, setExpectingExponent] = useState(false)

  const { memoryAdd, memorySubtract, memoryRecall } = useMemory()
  const { addHistory } = useHistory()

  const handleMemoryOperation = useCallback(
    (operation: 'M+' | 'M-' | 'MR') => {
      if (operation === 'MR') {
        const value = memoryRecall()
        setState(prev => ({
          ...prev,
          display: value,
          waitingForOperand: true,
          hasDecimal: value.includes('.'),
        }))
      } else if (operation === 'M+') {
        memoryAdd(state.display)
      } else if (operation === 'M-') {
        memorySubtract(state.display)
      }
    },
    [state.display, memoryAdd, memorySubtract, memoryRecall]
  )

  const handleButtonClick = useCallback(
    (value: string, type: string) => {
      setLastInput(value)

      if (type === 'digit') {
        setState(prev => inputDigit(prev, value))
        setExpectingExponent(false)
      } else if (value === '.') {
        setState(prev => inputDecimal(prev))
        setExpectingExponent(false)
      } else if (value === 'clear') {
        setState(clearAll())
        setExpectingExponent(false)
      } else if (value === 'C') {
        setState(prev => clearEntry(prev))
        setExpectingExponent(false)
      } else if (['+', '-', '×', '÷'].includes(value)) {
        if (expectingExponent && value === '-') {
          // Handle negative exponent
          setState(prev => inputDigit(prev, '-'))
          setExpectingExponent(false)
        } else {
          setState(prev => inputOperator(prev, value as '+' | '-' | '×' | '÷'))
          setExpectingExponent(false)
        }
      } else if (value === '=') {
        if (expectingExponent && state.previousValue && state.operator === '^') {
          // Calculate power
          const result = calculatePower(state.previousValue, state.display)
          const expression = `${state.previousValue} ^ ${state.display}`
          setState(prev => ({
            ...prev,
            display: result,
            previousValue: null,
            operator: null,
            waitingForOperand: true,
            hasDecimal: result.includes('.'),
          }))
          if (!result.startsWith('Error')) {
            addHistory(expression, result)
          }
          setExpectingExponent(false)
        } else if (state.previousValue && state.operator && state.operator !== '^') {
          const expression = `${state.previousValue} ${state.operator} ${state.display}`
          setState(prev => {
            const newState = performEquals(prev)
            if (!newState.display.startsWith('Error')) {
              addHistory(expression, newState.display)
            }
            return newState
          })
        }
        setExpectingExponent(false)
      } else if (value === 'negate') {
        setState(prev => ({
          ...prev,
          display: negate(prev.display),
        }))
        setExpectingExponent(false)
      } else if (value === 'percentage') {
        setState(prev => ({
          ...prev,
          display: calculatePercentage(prev.display),
          waitingForOperand: true,
        }))
        setExpectingExponent(false)
      } else if (['sin', 'cos', 'tan', 'ln', 'log', '√', 'x²', '1/x'].includes(value)) {
        setState(prev => ({
          ...prev,
          display: evaluateFunction(prev.display, value),
          waitingForOperand: true,
        }))
        setExpectingExponent(false)
      } else if (value === 'xⁿ' || value === '^') {
        // Store the base and wait for exponent
        setState(prev => ({
          ...prev,
          previousValue: prev.display,
          operator: '^' as any,
          waitingForOperand: true,
        }))
        setExpectingExponent(true)
      } else if (['M+', 'M-', 'MR', 'MC'].includes(value)) {
        if (value === 'MR') {
          handleMemoryOperation('MR')
        } else if (value === 'M+') {
          handleMemoryOperation('M+')
        } else if (value === 'M-') {
          handleMemoryOperation('M-')
        }
      }
    },
    [state.previousValue, state.operator, state.display, expectingExponent, addHistory, handleMemoryOperation]
  )

  const handleHistorySelect = useCallback(
    (value: string) => {
      setState(prev => ({
        ...prev,
        display: value,
        waitingForOperand: true,
        hasDecimal: value.includes('.'),
      }))
    },
    []
  )

  // Handle keyboard input for full keyboard support
  // This allows users to use the calculator without mouse interaction
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keyboard events when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      const key = e.key

      // Numbers
      if (/[0-9]/.test(key)) {
        handleButtonClick(key, 'digit')
        return
      }

      // Operators
      if (key === '+') {
        handleButtonClick('+', 'operator')
        return
      }
      if (key === '-') {
        handleButtonClick('-', 'operator')
        return
      }
      if (key === '*') {
        handleButtonClick('×', 'operator')
        return
      }
      if (key === '/') {
        e.preventDefault()
        handleButtonClick('÷', 'operator')
        return
      }

      // Decimal
      if (key === '.' || key === ',') {
        handleButtonClick('.', 'utility')
        return
      }

      // Equals
      if (key === '=' || key === 'Enter') {
        handleButtonClick('=', 'operator')
        return
      }

      // Clear
      if (key === 'Escape' || key === 'Delete') {
        handleButtonClick('clear', 'utility')
        return
      }

      // Copy result
      if ((e.ctrlKey || e.metaKey) && key === 'c') {
        navigator.clipboard.writeText(state.display)
        return
      }

      // Paste
      if ((e.ctrlKey || e.metaKey) && key === 'v') {
        e.preventDefault()
        navigator.clipboard.readText().then(text => {
          const num = parseFloat(text)
          if (!isNaN(num)) {
            setState(prev => ({
              ...prev,
              display: text,
              waitingForOperand: true,
              hasDecimal: text.includes('.'),
            }))
          }
        })
        return
      }

      // Memory operations
      if (key === 'm' || key === 'M') {
        if (e.shiftKey) {
          handleMemoryOperation('M-')
        } else {
          handleMemoryOperation('M+')
        }
        return
      }
      if (key === 'r' || key === 'R') {
        if (e.ctrlKey || e.metaKey) {
          handleMemoryOperation('MR')
        }
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleButtonClick, handleMemoryOperation, state.display])

  // Handle exponent calculation when equals is pressed
  // This ensures power operations (xⁿ) complete correctly
  useEffect(() => {
    if (
      expectingExponent &&
      state.previousValue &&
      state.operator === '^' &&
      !state.waitingForOperand &&
      lastInput !== 'xⁿ' &&
      lastInput !== '^'
    ) {
      // Auto-calculate when equals is pressed to complete the power operation
      if (lastInput === '=') {
        const result = calculatePower(state.previousValue, state.display)
        setState(prev => ({
          ...prev,
          display: result,
          previousValue: null,
          operator: null,
          waitingForOperand: true,
          hasDecimal: result.includes('.'),
        }))
        setExpectingExponent(false)
      }
    }
  }, [expectingExponent, lastInput, state.previousValue, state.operator, state.display, state.waitingForOperand])

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <div className="bg-black dark:bg-gray-950 rounded-3xl md:rounded-[3rem] p-4 md:p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl md:text-3xl font-light text-white">Calculator</h1>
              <button
                onClick={() => setIsScientificMode(!isScientificMode)}
                className="px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label={`Toggle ${isScientificMode ? 'basic' : 'scientific'} mode`}
                type="button"
              >
                {isScientificMode ? 'Basic' : 'Scientific'}
              </button>
            </div>
            <Display value={state.display} />
            <Keypad onButtonClick={handleButtonClick} isScientificMode={isScientificMode} />
          </div>
        </div>
        <div className="space-y-4 md:space-y-6">
          <MemoryPanel 
            currentValue={state.display}
            onMemoryRecall={() => {
              const value = memoryRecall()
              setState(prev => ({
                ...prev,
                display: value,
                waitingForOperand: true,
                hasDecimal: value.includes('.'),
              }))
            }}
          />
          <HistoryPanel onSelectHistory={handleHistorySelect} />
        </div>
      </div>
    </div>
  )
}

