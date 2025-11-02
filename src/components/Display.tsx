import React, { useEffect, useRef } from 'react'

interface DisplayProps {
  value: string
  className?: string
}

export default function Display({ value, className = '' }: DisplayProps) {
  const displayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (displayRef.current) {
      const element = displayRef.current
      // Auto-adjust font size if content is too long
      const maxWidth = element.offsetWidth
      const scrollWidth = element.scrollWidth
      if (scrollWidth > maxWidth) {
        const scale = maxWidth / scrollWidth
        element.style.transform = `scale(${Math.max(0.5, scale)})`
      } else {
        element.style.transform = 'scale(1)'
      }
    }
  }, [value])

  const displayValue = value || '0'

  return (
    <div
      className={`
        bg-calc-display dark:bg-gray-900 rounded-2xl md:rounded-3xl
        p-6 md:p-8 mb-4 md:mb-6
        shadow-inner
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <div
        ref={displayRef}
        className="text-right text-5xl md:text-7xl font-light text-white font-calc overflow-hidden"
        role="textbox"
        aria-label={`Calculator display: ${displayValue}`}
        aria-live="polite"
        aria-atomic="true"
        style={{
          transformOrigin: 'right center',
          transition: 'transform 0.2s ease-out',
        }}
      >
        {displayValue}
      </div>
    </div>
  )
}

