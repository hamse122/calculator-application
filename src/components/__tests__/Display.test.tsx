import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Display from '../Display'

describe('Display Component', () => {
  it('renders display value', () => {
    render(<Display value="123" />)
    expect(screen.getByLabelText(/Calculator display/)).toHaveTextContent('123')
  })

  it('renders zero by default when value is empty', () => {
    render(<Display value="" />)
    expect(screen.getByLabelText(/Calculator display/)).toHaveTextContent('0')
  })

  it('has correct ARIA attributes', () => {
    render(<Display value="123" />)
    const display = screen.getByLabelText(/Calculator display/)
    expect(display).toHaveAttribute('role', 'textbox')
    expect(display).toHaveAttribute('aria-live', 'polite')
    expect(display).toHaveAttribute('aria-atomic', 'true')
  })

  it('displays error messages', () => {
    render(<Display value="Error: Division by zero" />)
    expect(screen.getByLabelText(/Calculator display/)).toHaveTextContent('Error: Division by zero')
  })

  it('handles large numbers', () => {
    render(<Display value="123456789012345" />)
    expect(screen.getByLabelText(/Calculator display/)).toHaveTextContent('123456789012345')
  })
})

