const { formatUnits } = require("@ethersproject/units");

exports.parseNumber = (value, decimals = 18) =>
  parseFloat(formatUnits(value, decimals));
