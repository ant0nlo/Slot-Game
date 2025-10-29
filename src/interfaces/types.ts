export type SymbolId = number;
export type Line = number[];

export interface SpinResult {
  screen: number[][];
  linesResult: LineResult[];
  totalWin: number;
}

export interface LineResult {
  lineIndex: number;
  symbol: SymbolId;
  matchCount: number;
  win: number;
}
