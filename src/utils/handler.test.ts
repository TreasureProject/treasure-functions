import { createJsonResponse } from "./handler";

describe("handler utils", () => {
  it("should create JSON response", () => {
    const result = createJsonResponse({ key: "value" });
    expect(result).toStrictEqual({
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ key: "value" }, null, 2),
    });
  });
});
