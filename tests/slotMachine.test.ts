import { SlotMachine } from "../src/core/SlotMachine";
import { IReelGenerator } from "../src/interfaces/IReelGenerator";
import { IPayoutEvaluator } from "../src/interfaces/IPayoutEvaluator";

describe("SlotMachine", () => {
  it("returns correct totalWin", () => {
    const reels = [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]];
    const lines = [[0, 0, 0, 0, 0]];

    const mockReelGen: IReelGenerator = {
      spinReel: () => [1, 1, 1],
      spinAll: () => Array(5).fill([1, 1, 1])
    };

    const mockEvaluator: IPayoutEvaluator = {
      evaluateLines: () => [
        { lineIndex: 0, symbol: 1, matchCount: 5, win: 50 }
      ]
    };

    const slot = new SlotMachine(reels, lines, mockReelGen, mockEvaluator);
    const result = slot.spin();

    expect(result.totalWin).toBe(50);
    expect(result.linesResult[0].symbol).toBe(1);
  });

  it("calls dependencies exactly once", () => {
    const mockReelGen = { spinAll: jest.fn().mockReturnValue([[1],[1],[1]]), spinReel: jest.fn() };
    const mockEval = { evaluateLines: jest.fn().mockReturnValue([{ win: 10 }]) };
    const slot = new SlotMachine([], [], mockReelGen, mockEval);
    slot.spin();
    expect(mockReelGen.spinAll).toHaveBeenCalledTimes(1);
    expect(mockEval.evaluateLines).toHaveBeenCalledTimes(1);
  });

  it("returns SpinResult with correct keys", () => {
    const mockReelGen = { spinAll: jest.fn().mockReturnValue([[1],[1],[1]]), spinReel: jest.fn() };
    const mockEval = { evaluateLines: jest.fn().mockReturnValue([{ lineIndex:0, symbol:1, matchCount:3, win:10 }]) };
    const slot = new SlotMachine([], [], mockReelGen, mockEval);
    const result = slot.spin();
    expect(result).toHaveProperty("screen");
    expect(result).toHaveProperty("linesResult");
    expect(result).toHaveProperty("totalWin");
  });

});
