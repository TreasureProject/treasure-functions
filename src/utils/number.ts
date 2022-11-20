import { formatUnits } from "@ethersproject/units";

export const parseNumber = (value, decimals = 18) =>
  parseFloat(formatUnits(value, decimals));
