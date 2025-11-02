# Generated commit for documentation improvement
import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

/**
 * Theme toggle button component
 * Fixed position button in top-right corner to switch between light/dark themes
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 bg-gray-800 dark:bg-gray-700 text-white rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors shadow-lg z-50"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      type="button"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}

