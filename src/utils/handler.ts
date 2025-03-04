import { JsonResponse } from "../types";

export const createJsonResponse = (body: unknown): JsonResponse => ({
  statusCode: 200,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  body: JSON.stringify(body, null, 2),
});
