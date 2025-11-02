import React from 'react'
import type { ButtonType } from '../types'

/**
 * Button component props interface
 */
interface ButtonProps {
  label: string
  onClick: () => void
  type?: ButtonType
  className?: string
  ariaLabel?: string
  span?: number // Grid column span for wide buttons
  disabled?: boolean
}

export default function Button({
  label,
  onClick,
  type = 'utility',
  className = '',
  ariaLabel,
  span = 1,
  disabled = false,
}: ButtonProps) {
  // Base button classes for consistent styling across all button types
  const baseClasses = `
    h-16 md:h-20 rounded-full font-medium text-2xl md:text-3xl
    transition-all duration-150 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50
    disabled:opacity-50 disabled:cursor-not-allowed
  `.trim().replace(/\s+/g, ' ')

  const typeClasses: Record<ButtonType, string> = {
    digit: `
      bg-gray-800 dark:bg-calc-button-dark text-white
      hover:bg-gray-700 dark:hover:bg-gray-600
      focus:ring-gray-500
      shadow-button
    `,
    operator: `
      bg-calc-button-orange text-white
      hover:bg-orange-600
      focus:ring-orange-400
      shadow-button
    `,
    function: `
      bg-gray-600 dark:bg-gray-700 text-white
      hover:bg-gray-500 dark:hover:bg-gray-600
      focus:ring-gray-400
      shadow-button text-lg md:text-xl
    `,
    memory: `
      bg-gray-600 dark:bg-gray-700 text-white
      hover:bg-gray-500 dark:hover:bg-gray-600
      focus:ring-gray-400
      shadow-button text-base md:text-lg
    `,
    utility: `
      bg-gray-500 dark:bg-gray-600 text-black dark:text-white
      hover:bg-gray-400 dark:hover:bg-gray-500
      focus:ring-gray-300 dark:focus:ring-gray-400
      shadow-button
    `,
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${typeClasses[type]}
        ${className}
        ${span > 1 ? `col-span-${span}` : ''}
      `.trim().replace(/\s+/g, ' ')}
      aria-label={ariaLabel || label}
      type="button"
    >
      {label}
    </button>
  )
}

