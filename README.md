# Apple-Style Calculator

A beautiful, production-ready calculator web application built with React, TypeScript, and Vite. This calculator features a pixel-perfect Apple iOS Calculator-inspired UI with full functionality including basic operations, scientific functions, memory operations, and history tracking.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)

## Quick Start

Clone the repository and get started in minutes!

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

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome and greatly appreciated! This project follows a few simple guidelines to ensure consistency and quality.

### How to Contribute

1. **Fork the Repository**
   - Fork the repository to your GitHub account
   - Clone your fork locally: `git clone https://github.com/your-username/calculator-application.git`

2. **Create a Branch**
   - Create a new branch for your feature or bugfix: `git checkout -b feature/your-feature-name`
   - Use descriptive branch names that indicate the purpose

3. **Make Your Changes**
   - Write clean, readable code following the existing style
   - Add comments for complex logic
   - Ensure TypeScript types are properly defined
   - Follow the project's code style (Prettier and ESLint are configured)

4. **Write Tests**
   - Add tests for new features or bug fixes
   - Ensure all tests pass: `npm test`
   - Aim for good test coverage

5. **Commit Your Changes**
   - Write clear, descriptive commit messages
   - Use conventional commit format when possible:
     - `feat: add new feature`
     - `fix: fix bug description`
     - `docs: update documentation`
     - `style: format code`
     - `test: add tests`
     - `refactor: refactor code`

6. **Submit a Pull Request**
   - Push your branch: `git push origin feature/your-feature-name`
   - Open a Pull Request on GitHub
   - Provide a clear description of your changes
   - Reference any related issues

### Development Guidelines

- **Code Style**: Run `npm run format` before committing
- **Linting**: Ensure `npm run lint` passes without errors
- **Testing**: Write tests for new functionality
- **TypeScript**: Use proper types, avoid `any` when possible
- **Accessibility**: Maintain ARIA labels and keyboard navigation support
- **Performance**: Keep animations smooth and optimize calculations

### Reporting Issues

If you find a bug or have a suggestion:

1. Check existing issues to avoid duplicates
2. Create a new issue with:
   - Clear description of the problem or feature request
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Browser/OS information if relevant

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the project's coding standards

Thank you for contributing to this project! 🎉


<!-- Documentation improvement -->
<!-- Documentation improvement -->
<!-- Documentation improvement -->
<!-- Documentation improvement -->
<!-- Documentation improvement -->
<!-- Documentation improvement -->
<!-- Documentation improvement -->
<!-- Documentation improvement -->

<!-- Documentation updates -->















