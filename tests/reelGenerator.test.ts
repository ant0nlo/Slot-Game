import { ReelGenerator } from "../src/core/ReelGenerator";

describe("ReelGenerator", () => {
  const reel = [1, 2, 3, 4, 5];

  it("returns exact number of symbols (rows)", () => {
    const generator = new ReelGenerator(3);
    const result = generator.spinReel(reel);
    expect(result).toHaveLength(3);
  });

  it("returns [] for empty reel", () => {
    const gen = new ReelGenerator(3);
    expect(gen.spinReel([])).toEqual([]);
  });

  it("calls Math.random for non-empty reel", () => {
    const gen = new ReelGenerator(3);
    const spy = jest.spyOn(global.Math, "random");
    gen.spinReel([1, 2, 3, 4, 5]);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("wraps correctly when rows > reel.length", () => {
    const gen = new ReelGenerator(7);
    const result = gen.spinReel([1, 2, 3]);
    expect(result).toHaveLength(7);
  });

  it("wraps correctly when start is near the end", () => {
    const generator = new ReelGenerator(3);
    // force the start position by mocking Math.random
    jest.spyOn(global.Math, "random").mockReturnValue(0.8);
    const result = generator.spinReel(reel);
    expect(result).toEqual([5, 1, 2]);
    jest.spyOn(global.Math, "random").mockRestore();
  });
});
