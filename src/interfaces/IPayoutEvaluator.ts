import { Line, LineResult, SymbolId } from "./types";

export interface IPayoutEvaluator {
  evaluateLines(screen: SymbolId[][], lines: Line[]): LineResult[];
}
