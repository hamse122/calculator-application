import type { Meta, StoryObj } from '@storybook/react'
import Display from './Display'

const meta: Meta<typeof Display> = {
  title: 'Components/Display',
  component: Display,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#000000',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Display>

export const Zero: Story = {
  args: {
    value: '0',
  },
}

export const Number: Story = {
  args: {
    value: '123',
  },
}

export const Decimal: Story = {
  args: {
    value: '123.456',
  },
}

export const LargeNumber: Story = {
  args: {
    value: '1234567890',
  },
}

export const Negative: Story = {
  args: {
    value: '-123.45',
  },
}

export const Error: Story = {
  args: {
    value: 'Error: Division by zero',
  },
}

export const ScientificNotation: Story = {
  args: {
    value: '1.234567e+10',
  },
}

export const VeryLongNumber: Story = {
  args: {
    value: '123456789012345',
  },
}

