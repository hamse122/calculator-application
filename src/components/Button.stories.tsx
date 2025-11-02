import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

/**
 * Button component stories for Storybook
 * Demonstrates all button types and states
 */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['digit', 'operator', 'function', 'memory', 'utility'],
    },
    disabled: {
      control: 'boolean',
    },
    span: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Digit: Story = {
  args: {
    label: '5',
    onClick: () => {},
    type: 'digit',
  },
}

export const Operator: Story = {
  args: {
    label: '+',
    onClick: () => {},
    type: 'operator',
  },
}

export const Function: Story = {
  args: {
    label: 'sin',
    onClick: () => {},
    type: 'function',
  },
}

export const Memory: Story = {
  args: {
    label: 'M+',
    onClick: () => {},
    type: 'memory',
  },
}

export const Utility: Story = {
  args: {
    label: 'AC',
    onClick: () => {},
    type: 'utility',
  },
}

export const Disabled: Story = {
  args: {
    label: 'MR',
    onClick: () => {},
    type: 'memory',
    disabled: true,
  },
}

export const WideButton: Story = {
  args: {
    label: '0',
    onClick: () => {},
    type: 'digit',
    span: 2,
  },
}

export const WithAriaLabel: Story = {
  args: {
    label: '+',
    onClick: () => {},
    type: 'operator',
    ariaLabel: 'Add numbers',
  },
}

