import { PayoutEvaluator } from "../src/core/PayoutEvaluator";

describe("PayoutEvaluator", () => {
  const symbols = {
    1: [0, 0, 10, 20, 50],
    2: [0, 0, 20, 40, 100],
  };
  const evaluator = new PayoutEvaluator(symbols);

  it("gives a payout for 3 consecutive identical symbols", () => {
    const screen = [
      [2, 0, 0],
      [2, 0, 0],
      [2, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
    ];
    const lines = [[0, 0, 0, 0, 0]];
    const result = evaluator.evaluateLines(screen, lines);
    expect(result[0].win).toBe(20);
  });

  it("returns 0 for different symbols", () => {
    const screen = [
      [1, 0, 0],
      [2, 0, 0],
      [1, 0, 0],
      [2, 0, 0],
      [1, 0, 0],
    ];
    const lines = [[0, 0, 0, 0, 0]];
    const result = evaluator.evaluateLines(screen, lines);
    expect(result[0].win).toBe(0);
  });

  it("returns 0 when payout symbol is missing", () => {
    const evaluator = new PayoutEvaluator({ 1: [0, 0, 10] });
    const screen = [[10, 0, 0], [10, 0, 0], [10, 0, 0]];
    const lines = [[0, 0, 0]];
    const res = evaluator.evaluateLines(screen, lines);
    expect(res[0].win).toBe(0);
  });

  it("stops counting when a different symbol appears in the middle", () => {
    const symbols = { 2: [0, 0, 20, 40, 100] };
    const evaluator = new PayoutEvaluator(symbols);
    const screen = [
        [2,0,0],
        [2,0,0],
        [3,0,0],
        [2,0,0],
        [2,0,0]
    ];
    const lines = [[0,0,0,0,0]];
    const res = evaluator.evaluateLines(screen, lines);
    expect(res[0].matchCount).toBe(2);
    expect(res[0].win).toBe(0);
  });

  it("correctly reads a diagonal line", () => {
    const evaluator = new PayoutEvaluator({ 8: [0, 0, 100] });
    const screen = [
        [8,0,0],
        [0,8,0],
        [0,0,8]
    ];
    const lines = [[0,1,2]];
    const res = evaluator.evaluateLines(screen, lines);
    expect(res[0].win).toBe(100);
  });

});
