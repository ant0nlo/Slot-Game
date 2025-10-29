import { IPayoutEvaluator } from "../interfaces/IPayoutEvaluator";
import { Line, LineResult, SymbolId } from "../interfaces/types";

export class PayoutEvaluator implements IPayoutEvaluator {
  constructor(private readonly symbols: Record<SymbolId, number[]>) {}

  evaluateLines(screen: SymbolId[][], lines: Line[]): LineResult[] {
    const results: LineResult[] = [];

    for (const [lineIndex, line] of lines.entries()) {
      const symbolsOnLine = line.map((rowIndex, reelIndex) => screen[reelIndex][rowIndex]);
      const firstSymbol = symbolsOnLine[0];
      let matchCount = 1;

      for (let i = 1; i < symbolsOnLine.length; i++) {
        if (symbolsOnLine[i] === firstSymbol) matchCount++;
        else break;
      }

      const payout = this.symbols[firstSymbol];
      const win = payout?.[matchCount - 1] || 0;

      results.push({ lineIndex, symbol: firstSymbol, matchCount, win });
    }

    return results;
  }
}
