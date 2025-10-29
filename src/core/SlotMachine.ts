import { ISlotMachine } from "../interfaces/ISlotMachine";
import { IReelGenerator } from "../interfaces/IReelGenerator";
import { IPayoutEvaluator } from "../interfaces/IPayoutEvaluator";
import { SpinResult } from "../interfaces/types";

export class SlotMachine implements ISlotMachine {
  constructor(
    private readonly reels: number[][],
    private readonly lines: number[][],
    private readonly reelGenerator: IReelGenerator,
    private readonly evaluator: IPayoutEvaluator
  ) {}

  spin(): SpinResult {
    const screen = this.reelGenerator.spinAll(this.reels);
    const linesResult = this.evaluator.evaluateLines(screen, this.lines);
    const totalWin = linesResult.reduce((sum, l) => sum + l.win, 0);
    return { screen, linesResult, totalWin };
  }
}
