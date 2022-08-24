const { formatEther } = require("@ethersproject/units");

exports.parseNumber = (value) => parseFloat(formatEther(value));
