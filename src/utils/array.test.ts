import { sumArray } from "./array";

describe("array utils", () => {
  it("should sum numeric array", () => {
    expect(sumArray([0, 1, 2, 3, 4])).toBe(10);
  });
});
