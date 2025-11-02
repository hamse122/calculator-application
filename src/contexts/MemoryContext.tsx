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

  const memoryAdd = (value: string) => {
    try {
      const current = new Decimal(memory.value)
      const addend = new Decimal(value)
      const newValue = current.plus(addend).toString()
      setMemory({ value: newValue, hasValue: true })
    } catch {
      // Ignore invalid operations
    }
  }

  const memorySubtract = (value: string) => {
    try {
      const current = new Decimal(memory.value)
      const subtrahend = new Decimal(value)
      const newValue = current.minus(subtrahend).toString()
      setMemory({ value: newValue, hasValue: true })
    } catch {
      // Ignore invalid operations
    }
  }

  const memoryRecall = (): string => {
    return memory.hasValue ? memory.value : '0'
  }

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

