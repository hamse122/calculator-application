# Generated commit for documentation improvement
import React from 'react'
import Button from './Button'

interface KeypadProps {
  onButtonClick: (value: string, type: string) => void
  isScientificMode: boolean
  className?: string
}

export default function Keypad({ onButtonClick, isScientificMode, className = '' }: KeypadProps) {
  const handleClick = (value: string, type: string) => {
    onButtonClick(value, type)
  }

  interface ButtonDef {
    label: string
    value: string
    type: string
    span?: number
  }

  const basicButtons: ButtonDef[][] = [
    [
      { label: 'AC', value: 'clear', type: 'utility' },
      { label: '±', value: 'negate', type: 'utility' },
      { label: '%', value: 'percentage', type: 'utility' },
      { label: '÷', value: '÷', type: 'operator' },
    ],
    [
      { label: '7', value: '7', type: 'digit' },
      { label: '8', value: '8', type: 'digit' },
      { label: '9', value: '9', type: 'digit' },
      { label: '×', value: '×', type: 'operator' },
    ],
    [
      { label: '4', value: '4', type: 'digit' },
      { label: '5', value: '5', type: 'digit' },
      { label: '6', value: '6', type: 'digit' },
      { label: '−', value: '-', type: 'operator' },
    ],
    [
      { label: '1', value: '1', type: 'digit' },
      { label: '2', value: '2', type: 'digit' },
      { label: '3', value: '3', type: 'digit' },
      { label: '+', value: '+', type: 'operator' },
    ],
    [
      { label: '0', value: '0', type: 'digit', span: 2 },
      { label: '.', value: '.', type: 'utility' },
      { label: '=', value: '=', type: 'operator' },
    ],
  ]

  // Scientific mode buttons for advanced mathematical operations
  const scientificButtons: ButtonDef[][] = [
    [
      { label: 'sin', value: 'sin', type: 'function' },
      { label: 'cos', value: 'cos', type: 'function' },
      { label: 'tan', value: 'tan', type: 'function' },
      { label: 'ln', value: 'ln', type: 'function' },
    ],
    [
      { label: 'log', value: 'log', type: 'function' },
      { label: '√', value: '√', type: 'function' },
      { label: 'x²', value: 'x²', type: 'function' },
      { label: 'xⁿ', value: 'xⁿ', type: 'function' },
    ],
    [
      { label: '1/x', value: '1/x', type: 'function' },
      { label: '(', value: '(', type: 'utility' },
      { label: ')', value: ')', type: 'utility' },
      { label: '^', value: '^', type: 'operator' },
    ],
  ]


  return (
    <div className={`grid grid-cols-4 gap-3 md:gap-4 ${className}`.trim()}>
      {isScientificMode && (
        <>
          {scientificButtons.map((row, rowIndex) => (
            <React.Fragment key={`scientific-row-${rowIndex}`}>
              {row.map((btn) => (
                <Button
                  key={btn.value}
                  label={btn.label}
                  onClick={() => handleClick(btn.value, btn.type)}
                  type={btn.type as any}
                  span={btn.span}
                  ariaLabel={btn.label}
                />
              ))}
            </React.Fragment>
          ))}
        </>
      )}
      {basicButtons.map((row, rowIndex) => (
        <React.Fragment key={`basic-row-${rowIndex}`}>
          {row.map((btn) => (
            <Button
              key={btn.value}
              label={btn.label}
              onClick={() => handleClick(btn.value, btn.type)}
              type={btn.type as any}
              span={btn.span || 1}
              ariaLabel={btn.label}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}

