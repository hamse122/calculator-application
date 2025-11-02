# Apple-Style Calculator

A beautiful, production-ready calculator web application built with React, TypeScript, and Vite. This calculator features a pixel-perfect Apple iOS Calculator-inspired UI with full functionality including basic operations, scientific functions, memory operations, and history tracking.

## Features

### 🎨 Visual & UX
- **Apple-inspired Design**: Pixel-perfect UI with rounded buttons, glass/shadow effects, and iOS-style aesthetics
- **Responsive Design**: Works seamlessly on both mobile and desktop devices
- **Dark/Light Themes**: Toggle between light and dark themes with smooth transitions
- **Smooth Animations**: Button press animations and microinteractions for a polished feel
- **Scientific Mode**: Toggle between basic and scientific calculator modes

### 🔢 Functionality
- **Basic Operations**: Addition, subtraction, multiplication, division
- **Advanced Operations**: Parentheses support, exponentiation (xⁿ), square root (√)
- **Scientific Functions**: sin, cos, tan, ln, log, x², 1/x, eⁿ
- **Memory Functions**: M+ (Memory Add), M- (Memory Subtract), MR (Memory Recall), MC (Memory Clear)
- **Utility Functions**: Percentage (%), Negate (±), Clear (AC/C)
- **Precise Calculations**: Uses decimal.js library for floating-point precision
- **Keyboard Support**: Full keyboard input support
- **Clipboard Operations**: Copy (Ctrl/Cmd+C) and paste (Ctrl/Cmd+V) values

### ♿ Accessibility
- Full keyboard navigation support
- ARIA labels and roles for screen readers
- Adequate color contrast ratios
- Focus indicators for keyboard users
- Screen-reader-friendly announcements for results and errors

### 🧪 Testing
- Comprehensive unit tests using Vitest and React Testing Library
- 10+ edge case tests covering:
  - Large numbers and overflow
  - Division by zero
  - Chained decimal inputs
  - Floating-point precision
  - Error handling
  - Operator precedence

### 💾 Data Persistence
- Memory values persisted in localStorage
- Calculation history persisted in localStorage
- Theme preference persisted in localStorage

## Project Structure

```
src/
├── components/          # React components
│   ├── Calculator.tsx  # Main calculator component
│   ├── Display.tsx     # Display component
│   ├── Button.tsx      # Reusable button component
│   ├── Keypad.tsx      # Keypad layout component
│   ├── MemoryPanel.tsx # Memory operations panel
│   ├── HistoryPanel.tsx # Calculation history panel
│   ├── ThemeToggle.tsx # Theme toggle button
│   └── __tests__/      # Component tests
├── contexts/           # React Context providers
│   ├── ThemeContext.tsx    # Theme state management
│   ├── MemoryContext.tsx   # Memory state management
│   └── HistoryContext.tsx  # History state management
├── engine/             # Calculator logic (pure functions)
│   ├── calculator.ts   # Core calculator engine
│   └── __tests__/      # Engine tests
├── types/              # TypeScript type definitions
│   └── index.ts
├── test/               # Test setup files
├── App.tsx             # Root component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Calculator Logic

The calculator engine (`src/engine/calculator.ts`) contains pure functions that handle all calculation logic:
- `formatDisplay()`: Formats numbers for display with overflow handling
- `calculate()`: Performs basic arithmetic operations
- `evaluateFunction()`: Evaluates scientific functions
- `calculatePower()`: Calculates exponentiation
- `inputDigit()`, `inputDecimal()`, `inputOperator()`: Handle user input
- `performEquals()`: Performs calculations
- `clearAll()`, `clearEntry()`: Clear operations

All functions are pure and easily testable, with proper error handling and edge case management.

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd apple-calculator
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run tests with UI:
```bash
npm run test:ui
```

### Code Quality

Lint the code:
```bash
npm run lint
```

Format the code:
```bash
npm run format
```

### Storybook

View component stories:
```bash
npm run storybook
```

Build Storybook:
```bash
npm run build-storybook
```

## Usage

### Basic Operations

1. Enter a number using the number pad
2. Press an operator (+, -, ×, ÷)
3. Enter another number
4. Press = to calculate

### Scientific Functions

1. Toggle "Scientific" mode
2. Enter a number
3. Press a scientific function button (sin, cos, tan, ln, log, √, x², 1/x)
4. The result is calculated immediately

### Memory Operations

- **M+**: Add current display value to memory
- **M-**: Subtract current display value from memory
- **MR**: Recall memory value to display
- **MC**: Clear memory

### Keyboard Shortcuts

- **Numbers**: 0-9 keys
- **Operators**: +, -, *, / keys
- **Decimal**: . or , keys
- **Equals**: = or Enter
- **Clear**: Escape or Delete
- **Copy**: Ctrl/Cmd + C
- **Paste**: Ctrl/Cmd + V
- **Memory Add**: M
- **Memory Subtract**: Shift + M
- **Memory Recall**: Ctrl/Cmd + R

## Technology Stack

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **decimal.js**: Precise decimal arithmetic
- **Vitest**: Testing framework
- **React Testing Library**: Component testing
- **Storybook**: Component documentation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

