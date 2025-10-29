import { SymbolId } from "./types";

export interface IReelGenerator {
  spinReel(reel: SymbolId[]): SymbolId[];
  spinAll(reels: SymbolId[][]): SymbolId[][];
}
