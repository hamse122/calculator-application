import React from 'react'
import { useHistory } from '../contexts/HistoryContext'
import Button from './Button'
import type { HistoryEntry } from '../types'

interface HistoryPanelProps {
  className?: string
  onSelectHistory: (value: string) => void
}

export default function HistoryPanel({ className = '', onSelectHistory }: HistoryPanelProps) {
  const { history, clearHistory } = useHistory()

  /**
   * Formats timestamp to readable time string
   * @param timestamp - Unix timestamp in milliseconds
   * @returns Formatted time string (HH:MM format)
   */
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={`bg-gray-800 dark:bg-gray-900 rounded-2xl p-4 md:p-6 ${className}`.trim()}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-white">History</h2>
        {history.length > 0 && (
          <Button
            label="Clear"
            onClick={clearHistory}
            type="utility"
            className="text-sm h-8 px-4"
            ariaLabel="Clear History"
          />
        )}
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {history.length === 0 ? (
          <p className="text-gray-500 text-center py-4" role="status">No history yet</p>
        ) : (
          history.map((entry: HistoryEntry, index: number) => (
            <button
              key={index}
              onClick={() => onSelectHistory(entry.result)}
              className="w-full text-left p-3 bg-gray-700 dark:bg-gray-800 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors group"
              aria-label={`Select result: ${entry.result}`}
            >
              <div className="text-sm text-gray-400 mb-1">{formatTime(entry.timestamp)}</div>
              <div className="text-white font-mono text-sm mb-1">{entry.expression}</div>
              <div className="text-calc-button-orange font-mono text-lg font-semibold">
                = {entry.result}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}

