import config from "./configuration";
import { ReelGenerator } from "./core/ReelGenerator";
import { PayoutEvaluator } from "./core/PayoutEvaluator";
import { SlotMachine } from "./core/SlotMachine";

// Initialization of components
const reelGen = new ReelGenerator(config.rowsCount);
const payoutEval = new PayoutEvaluator(config.symbols);
const slot = new SlotMachine(config.reels, config.lines, reelGen, payoutEval);

// Simulation settings
const spins = 100000;
let totalWin = 0;

const start = Date.now();

// Run N spins
for (let i = 0; i < spins; i++) {
  const result = slot.spin();
  totalWin += result.totalWin;
}

const duration = (Date.now() - start) / 1000;

console.log("=== SIMULATION STATS ===");
console.log(`Spins: ${spins}`);
console.log(`Total Win: ${totalWin}`);
console.log(`Average Win per Spin: ${(totalWin / spins).toFixed(2)}`);
console.log(`Execution Time: ${duration.toFixed(3)}s`);
