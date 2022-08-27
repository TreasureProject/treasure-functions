const { createJsonResponse } = require("./handler");

describe("handler utils", () => {
  it("should create JSON response", () => {
    const result = createJsonResponse({ key: "value" });
    expect(result).toStrictEqual({
      statusCode: 200,
      headers: {
        "content-type": "application/json",
      },
      body: `{
  "key": "value"
}`,
    });
  });
});
