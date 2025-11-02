import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../Button'

describe('Button Component', () => {
  it('renders button with label', () => {
    const onClick = vi.fn()
    render(<Button label="5" onClick={onClick} />)
    expect(screen.getByLabelText('5')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Button label="5" onClick={onClick} />)
    fireEvent.click(screen.getByLabelText('5'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('applies correct type classes', () => {
    const onClick = vi.fn()
    const { container } = render(<Button label="5" onClick={onClick} type="digit" />)
    const button = container.querySelector('button')
    expect(button?.className).toContain('bg-gray-800')
  })

  it('handles disabled state', () => {
    const onClick = vi.fn()
    render(<Button label="MR" onClick={onClick} disabled />)
    const button = screen.getByLabelText('MR')
    expect(button).toBeDisabled()
    fireEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('uses aria-label when provided', () => {
    const onClick = vi.fn()
    render(<Button label="+" onClick={onClick} ariaLabel="Add" />)
    expect(screen.getByLabelText('Add')).toBeInTheDocument()
  })
})

