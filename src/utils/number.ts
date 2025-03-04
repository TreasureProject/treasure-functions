import { formatUnits } from "viem";

// Function overloads
export function parseNumber(value: bigint, decimals?: number): number;
export function parseNumber(value: string, decimals?: number): number;
export function parseNumber(value: bigint | string, decimals = 18): number {
  if (typeof value === "string") {
    try {
      return parseFloat(formatUnits(BigInt(value), decimals));
    } catch {
      throw new Error(`Invalid value for parseNumber: ${value}`);
    }
  }
  return parseFloat(formatUnits(value, decimals));
}
