# Generated commit for documentation improvement
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { HistoryEntry } from '../types'

interface HistoryContextType {
  history: HistoryEntry[]
  addHistory: (expression: string, result: string) => void
  clearHistory: () => void
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined)

// Maximum number of history entries to keep in memory and localStorage
const MAX_HISTORY_ENTRIES = 50

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const saved = localStorage.getItem('calculator-history')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return []
      }
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('calculator-history', JSON.stringify(history))
  }, [history])

  const addHistory = (expression: string, result: string) => {
    setHistory(prev => {
      const newEntry: HistoryEntry = {
        expression,
        result,
        timestamp: Date.now(),
      }
      const updated = [newEntry, ...prev].slice(0, MAX_HISTORY_ENTRIES)
      return updated
    })
  }

  const clearHistory = () => {
    setHistory([])
  }

  return (
    <HistoryContext.Provider value={{ history, addHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory() {
  const context = useContext(HistoryContext)
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider')
  }
  return context
}

