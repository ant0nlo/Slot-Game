import config from "./configuration";
import { ReelGenerator } from "./core/ReelGenerator";
import { PayoutEvaluator } from "./core/PayoutEvaluator";
import { SlotMachine } from "./core/SlotMachine";
import { ErrorHandler } from "./utils/errorHandler";
import { ConfigSchema } from "./validation/configSchema";

try {
  ConfigSchema.parse(config);
  const reelGen = new ReelGenerator(config.rowsCount);
  const payoutEval = new PayoutEvaluator(config.symbols);
  const slot = new SlotMachine(config.reels, config.lines, reelGen, payoutEval);
  
  const result = slot.spin();

  function transpose<T>(matrix: T[][]): T[][] {
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
  }

  console.log("=== SLOT RESULT ===");
  //console.table(result.screen);
  console.table(transpose(result.screen));
  console.log("\n=== LINE RESULTS ===");
  console.table(result.linesResult);
  console.log(`\nTOTAL WIN: ${result.totalWin}`);
} catch (error) {
  ErrorHandler.handle(error);
  process.exit(1);
}