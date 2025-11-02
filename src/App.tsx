/**
 * Main App component
 * Wraps the calculator with all necessary context providers
 */
import React from 'react'
import Calculator from './components/Calculator'
import { ThemeProvider } from './contexts/ThemeContext'
import { MemoryProvider } from './contexts/MemoryContext'
import { HistoryProvider } from './contexts/HistoryContext'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <ThemeProvider>
      <MemoryProvider>
        <HistoryProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-calc-bg transition-colors duration-200">
            <ThemeToggle />
            <Calculator />
          </div>
        </HistoryProvider>
      </MemoryProvider>
    </ThemeProvider>
  )
}

export default App

