import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Calculator from '../Calculator'
import ThemeProvider from '../../contexts/ThemeContext'
import MemoryProvider from '../../contexts/MemoryContext'
import HistoryProvider from '../../contexts/HistoryContext'

// Wrapper component with all necessary providers for testing
const CalculatorWithProviders = () => (
  <ThemeProvider>
    <MemoryProvider>
      <HistoryProvider>
        <Calculator />
      </HistoryProvider>
    </MemoryProvider>
  </ThemeProvider>
)

describe('Calculator Component', () => {
  it('renders calculator display', () => {
    render(<CalculatorWithProviders />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('displays digit input', () => {
    render(<CalculatorWithProviders />)
    fireEvent.click(screen.getByLabelText('5'))
    expect(screen.getByLabelText(/Calculator display/)).toHaveTextContent('5')
  })

  it('performs addition', () => {
    render(<CalculatorWithProviders />)
    fireEvent.click(screen.getByLabelText('5'))
    fireEvent.click(screen.getByLabelText('+'))
    fireEvent.click(screen.getByLabelText('3'))
    fireEvent.click(screen.getByLabelText('='))
    expect(screen.getByLabelText(/Calculator display/)).toHaveTextContent('8')
  })

  it('performs subtraction', () => {
    render(<CalculatorWithProviders />)
    fireEvent.click(screen.getByLabelText('9'))
    fireEvent.click(screen.getByLabelText('−'))
    fireEvent.click(screen.getByLabelText('4'))
    fireEvent.click(screen.getByLabelText('='))
    expect(screen.getByLabelText(/Calculator display/)).toHaveTextContent('5')
  })

  it('performs multiplication', () => {
    render(<CalculatorWithProviders />)
    fireEvent.click(screen.getByLabelText('6'))
    fireEvent.click(screen.getByLabelText('×'))
    fireEvent.click(screen.getByLabelText('7'))
    fireEvent.click(screen.getByLabelText('='))
    expect(screen.getByLabelText(/Calculator display/)).toHaveTextContent('42')
  })

  it('performs division', () => {
    render(<CalculatorWithProviders />)
    fireEvent.click(screen.getByLabelText('8'))
    fireEvent.click(screen.getByLabelText('÷'))
    fireEvent.click(screen.getByLabelText('2'))
    fireEvent.click(screen.getByLabelText('='))
    expect(screen.getByLabelText(/Calculator display/)).toHaveTextContent('4')
  })

  it('handles decimal input', () => {
    render(<CalculatorWithProviders />)
    fireEvent.click(screen.getByLabelText('5'))
    fireEvent.click(screen.getByLabelText('.'))
    fireEvent.click(screen.getByLabelText('5'))
    expect(screen.getByLabelText(/Calculator display/)).toHaveTextContent('5.5')
  })

  it('clears display with AC', () => {
    render(<CalculatorWithProviders />)
    fireEvent.click(screen.getByLabelText('9'))
    fireEvent.click(screen.getByLabelText('AC'))
    expect(screen.getByLabelText(/Calculator display/)).toHaveTextContent('0')
  })

  it('negates number', () => {
    render(<CalculatorWithProviders />)
    fireEvent.click(screen.getByLabelText('5'))
    fireEvent.click(screen.getByLabelText('±'))
    expect(screen.getByLabelText(/Calculator display/)).toHaveTextContent('-5')
  })

  it('calculates percentage', () => {
    render(<CalculatorWithProviders />)
    fireEvent.click(screen.getByLabelText('5'))
    fireEvent.click(screen.getByLabelText('0'))
    fireEvent.click(screen.getByLabelText('%'))
    expect(screen.getByLabelText(/Calculator display/)).toHaveTextContent('0.5')
  })

  it('handles division by zero', () => {
    render(<CalculatorWithProviders />)
    fireEvent.click(screen.getByLabelText('5'))
    fireEvent.click(screen.getByLabelText('÷'))
    fireEvent.click(screen.getByLabelText('0'))
    fireEvent.click(screen.getByLabelText('='))
    const display = screen.getByLabelText(/Calculator display/)
    expect(display.textContent).toContain('Error')
  })

  it('toggles scientific mode', () => {
    render(<CalculatorWithProviders />)
    const toggleButton = screen.getByLabelText(/Toggle scientific mode/i)
    fireEvent.click(toggleButton)
    expect(screen.getByLabelText('sin')).toBeInTheDocument()
    expect(screen.getByLabelText('cos')).toBeInTheDocument()
  })

  it('calculates square root in scientific mode', () => {
    render(<CalculatorWithProviders />)
    const toggleButton = screen.getByLabelText(/Toggle scientific mode/i)
    fireEvent.click(toggleButton)
    fireEvent.click(screen.getByLabelText('9'))
    fireEvent.click(screen.getByLabelText('√'))
    expect(screen.getByLabelText(/Calculator display/)).toHaveTextContent('3')
  })

  it('calculates x² in scientific mode', () => {
    render(<CalculatorWithProviders />)
    const toggleButton = screen.getByLabelText(/Toggle scientific mode/i)
    fireEvent.click(toggleButton)
    fireEvent.click(screen.getByLabelText('5'))
    fireEvent.click(screen.getByLabelText('x²'))
    expect(screen.getByLabelText(/Calculator display/)).toHaveTextContent('25')
  })
})

