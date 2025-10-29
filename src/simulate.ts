import config from "./configuration";
import { ReelGenerator } from "./core/ReelGenerator";
import { PayoutEvaluator } from "./core/PayoutEvaluator";
import { SlotMachine } from "./core/SlotMachine";
import { ErrorHandler } from "./utils/errorHandler";
import { ConfigSchema } from "./validation/configSchema";

try {
  ConfigSchema.parse(config);
} catch (validationError) {
  ErrorHandler.handle(validationError);
  process.exit(1);
}

// Initialization of components
const reelGen = new ReelGenerator(config.rowsCount);
const payoutEval = new PayoutEvaluator(config.symbols);
const slot = new SlotMachine(config.reels, config.lines, reelGen, payoutEval);

// Simulation settings
const spins = 100000;
let totalWin = 0;
let failedSpins = 0;

const start = Date.now();

// Run N spins
try {
  for (let i = 0; i < spins; i++) {
    try {
      const result = slot.spin();
      totalWin += result.totalWin;
    } catch (err) {
      failedSpins++;
      ErrorHandler.handle(err);
    }
  }

  const duration = (Date.now() - start) / 1000;

  console.log("=== SIMULATION STATS ===");
  console.log(`Spins attempted: ${spins}`);
  console.log(`Successful spins: ${spins - failedSpins}`);
  console.log(`Failed spins: ${failedSpins}`);
  console.log(`Total Win: ${totalWin}`);
  console.log(`Average Win per Spin: ${(totalWin / spins).toFixed(2)}`);
  console.log(`Execution Time: ${duration.toFixed(3)}s`);
} catch (fatalError) {
  ErrorHandler.handle(fatalError);
  process.exit(1);
}