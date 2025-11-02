import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import Decimal from 'decimal.js'
import type { MemoryState } from '../types'

interface MemoryContextType {
  memory: MemoryState
  memoryAdd: (value: string) => void
  memorySubtract: (value: string) => void
  memoryRecall: () => string
  memoryClear: () => void
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined)

export function MemoryProvider({ children }: { children: ReactNode }) {
  const [memory, setMemory] = useState<MemoryState>(() => {
    const saved = localStorage.getItem('calculator-memory')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        return {
          value: parsed.value || '0',
          hasValue: parsed.hasValue || false,
        }
      } catch {
        return { value: '0', hasValue: false }
      }
    }
    return { value: '0', hasValue: false }
  })

  useEffect(() => {
    localStorage.setItem('calculator-memory', JSON.stringify(memory))
  }, [memory])

  /**
   * Adds a value to the current memory
   * @param value - The value to add to memory
   */
  const memoryAdd = (value: string) => {
    try {
      const current = new Decimal(memory.value)
      const addend = new Decimal(value)
      const newValue = current.plus(addend).toString()
      setMemory({ value: newValue, hasValue: true })
    } catch {
      // Silently ignore invalid operations to prevent errors
    }
  }

  /**
   * Subtracts a value from the current memory
   * @param value - The value to subtract from memory
   */
  const memorySubtract = (value: string) => {
    try {
      const current = new Decimal(memory.value)
      const subtrahend = new Decimal(value)
      const newValue = current.minus(subtrahend).toString()
      setMemory({ value: newValue, hasValue: true })
    } catch {
      // Silently ignore invalid operations to prevent errors
    }
  }

  /**
   * Recalls the current memory value
   * @returns Memory value as string, or '0' if memory is empty
   */
  const memoryRecall = (): string => {
    return memory.hasValue ? memory.value : '0'
  }

  /**
   * Clears the memory, resetting it to empty state
   */
  const memoryClear = () => {
    setMemory({ value: '0', hasValue: false })
  }

  return (
    <MemoryContext.Provider
      value={{
        memory,
        memoryAdd,
        memorySubtract,
        memoryRecall,
        memoryClear,
      }}
    >
      {children}
    </MemoryContext.Provider>
  )
}

export function useMemory() {
  const context = useContext(MemoryContext)
  if (context === undefined) {
    throw new Error('useMemory must be used within a MemoryProvider')
  }
  return context
}

