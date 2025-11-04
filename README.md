# Slot Machine Simulation

A modular, slot machine simulation built entirely in **TypeScript**.  
Implements clean architecture principles — separation of concerns, dependency injection, and interface-based abstractions for full testability and maintainability.


## Overview

This project simulates a classic 5-reel slot machine with configurable paylines, symbol payout tables, and randomized spins.  
It’s built around a clear architecture divided into three core components:
**ReelGenerator** - Handles random reel spins using RNG and returns visible symbols
**PayoutEvaluator** - Evaluates paylines and calculates winnings based on symbol combinations
**SlotMachine** - Coordinates the entire spin process (reel generation → payout evaluation → result aggregation)


## Architecture

The project is divided into three main layers:

### **Core (`src/core/`)**
Contains the main game logic:
- **`ReelGenerator.ts`** – generates visible symbols using RNG.  
- **`PayoutEvaluator.ts`** – calculates line payouts based on symbol matches.  
- **`SlotMachine.ts`** - orchestrates the spin process and aggregates results.

### **Interfaces (`src/interfaces/`)**
Defines abstraction contracts between modules for loose coupling and testability:
- **`IReelGenerator.ts`** – interface for reel spinning logic.  
- **`IPayoutEvaluator.ts`** – interface for payout calculation logic.  
- **`ISlotMachine.ts`** – interface for the slot machine controller.  
- **`types.ts`** – shared types (`Line`, `SpinResult`, `SymbolId`, etc.).
This layer ensures **abstraction, flexibility, and easy testing**.

### **Validation (`src/validation/`)**
- **`configSchema.ts`** – validates the game configuration at runtime using **Zod**.  
- Ensures all reels, lines, and symbol definitions are correctly structured before execution.

### **Utils (`src/utils/`)**
- **`errorHandler.ts`** – provides centralized error handling and formatted logging.  

### **Tests (`tests/`)**
Contains unit and integration tests for every Core class:
- Verifies RNG behavior, wrap-around logic, and payout calculations.  
- Uses Jest and mocks for deterministic, isolated testing.

### Additional Files
- **`configuration.ts`** – defines reels, symbols, paylines, and payouts.  
- **`index.ts`** – example of a single spin run.  
- **`simulate.ts`** – runs multiple spins to calculate average RTP (return to player).


## Requirements

- Node.js **v18+**
- TypeScript **v5+**
- Jest **v29+**
- ts-node **v10+**
- Zod **v3+**

## Configuration
The project uses standard TypeScript and Jest setup:

- **`package.json`** – defines build, test, and simulation scripts.
- **`tsconfig.json`** – compiler configuration (`ES2020`, `strict`, `commonjs`, `dist/` output).  
- **`jest.config.js`** – configures Jest to use `ts-jest` for TypeScript testing.  


## Installation

```bash
git clone https://github.com/ant0nlo/slot-game.git
cd slot-game
npm install
```


## Usage

### Run a single spin
```bash
npm start
```

**Output Example:**
```
=== SLOT RESULT ===
┌─────────┬───┬───┬───┬───┬───┐
│ (index) │ 0 │ 1 │ 2 │ 3 │ 4 │
├─────────┼───┼───┼───┼───┼───┤
│ 0       │ 1 │ 6 │ 4 │ 9 │ 2 │
│ 1       │ 1 │ 6 │ 3 │ 9 │ 7 │
│ 2       │ 6 │ 6 │ 3 │ 9 │ 7 │
└─────────┴───┴───┴───┴───┴───┘

=== LINE RESULTS ===
┌─────────┬───────────┬────────┬────────────┬─────┐
│ (index) │ lineIndex │ symbol │ matchCount │ win │
├─────────┼───────────┼────────┼────────────┼─────┤
│ 0       │ 0         │ 4      │ 1          │ 0   │
│ 1       │ 1         │ 9      │ 1          │ 0   │
│ 2       │ 2         │ 9      │ 1          │ 0   │
│ 3       │ 3         │ 4      │ 1          │ 0   │
│ 4       │ 4         │ 9      │ 1          │ 0   │
└─────────┴───────────┴────────┴────────────┴─────┘

TOTAL WIN: 0
```

### Run large-scale simulation
To test statistical fairness or average payout rate:
```bash
npm run simulate
```

**Example Output:**
```
Spins: 100000
Total win: 338650
Average win per spin: 3.39
Execution time: 0.036s
```

## Testing

The project uses **Jest** and **ts-jest** for full unit and integration test coverage.

### Run all tests
```bash
npm test
```

### Check coverage
```bash
npm test -- --coverage
```

**Example Coverage Report:**
```
File                        | % Stmts | % Branch | % Funcs | % Lines |
-----------------------------|---------|-----------|----------|---------|
src/core/ReelGenerator.ts    | 100     | 100       | 100      | 100     |
src/core/PayoutEvaluator.ts  | 95      | 90        | 100      | 95      |
src/core/SlotMachine.ts      | 100     | 100       | 100      | 100     |
All files                    | 98      | 96        | 100      | 98      |
```

## Continuous Integration (GitHub Actions)

The repository includes a CI pipeline located in `.github/workflows/test.yml`.
It automatically runs on every push or pull request to validate the project’s integrity.

