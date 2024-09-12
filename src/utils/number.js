const { formatUnits } = require("viem");

exports.parseNumber = (value, decimals = 18) =>
  parseFloat(formatUnits(value, decimals));
