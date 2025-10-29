import { IReelGenerator } from "../interfaces/IReelGenerator";
import { SymbolId } from "../interfaces/types";

export class ReelGenerator implements IReelGenerator {
  constructor(private readonly rows: number) {}

  spinReel(reel: SymbolId[]): SymbolId[] {
    if (reel.length === 0) return [];
    const start = Math.floor(Math.random() * reel.length);
    const result: SymbolId[] = [];
    for (let i = 0; i < this.rows; i++) {
      result.push(reel[(start + i) % reel.length]);
    }
    return result;
  }

  spinAll(reels: SymbolId[][]): SymbolId[][] {
    return reels.map(r => this.spinReel(r));
  }
}
