const { parseNumber } = require("./number");

describe("number utils", () => {
  it("should parse wei", () => {
    const result = parseNumber("1000000000000000000");
    expect(result).toBe(1);
  });

  it("should parse custom units", () => {
    const result = parseNumber("10000000", 6);
    expect(result).toBe(10);
  });
});
