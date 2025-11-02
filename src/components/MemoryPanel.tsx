import React from 'react'
import { useMemory } from '../contexts/MemoryContext'
import Button from './Button'

interface MemoryPanelProps {
  className?: string
  onMemoryRecall?: () => string
  currentValue?: string
}

export default function MemoryPanel({ className = '', onMemoryRecall, currentValue }: MemoryPanelProps) {
  const { memory, memoryAdd, memorySubtract, memoryRecall, memoryClear } = useMemory()

  const handleMemoryAdd = () => {
    if (currentValue) {
      memoryAdd(currentValue)
    }
  }

  const handleMemorySubtract = () => {
    if (currentValue) {
      memorySubtract(currentValue)
    }
  }

  const handleMemoryRecall = () => {
    const value = memoryRecall()
    if (onMemoryRecall) {
      onMemoryRecall()
    }
    return value
  }

  return (
    <div className={`bg-gray-800 dark:bg-gray-900 rounded-2xl p-4 md:p-6 ${className}`.trim()}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-white">Memory</h2>
        {/* Memory value indicator with visual feedback */}
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
            memory.hasValue
              ? 'bg-green-500 text-white animate-pulse'
              : 'bg-gray-700 text-gray-400'
          }`}
          aria-live="polite"
          aria-label={`Memory: ${memory.hasValue ? memory.value : 'Empty'}`}
        >
          {memory.hasValue ? memory.value : 'Empty'}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        <Button
          label="M+"
          onClick={handleMemoryAdd}
          type="memory"
          ariaLabel="Memory Add"
          className="text-sm"
        />
        <Button
          label="M−"
          onClick={handleMemorySubtract}
          type="memory"
          ariaLabel="Memory Subtract"
          className="text-sm"
        />
        <Button
          label="MR"
          onClick={handleMemoryRecall}
          type="memory"
          ariaLabel="Memory Recall"
          className="text-sm"
          disabled={!memory.hasValue}
        />
        <Button
          label="MC"
          onClick={memoryClear}
          type="memory"
          ariaLabel="Memory Clear"
          className="text-sm"
          disabled={!memory.hasValue}
        />
      </div>
    </div>
  )
}

