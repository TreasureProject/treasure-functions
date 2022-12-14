const {
  getMagicCirculatingSupply,
  getMagicTotalSupply,
  getMagicPrice,
} = require("../services/magic");
const { createJsonResponse } = require("../utils/handler");

exports.getTotalSupply = async () => {
  const totalSupply = await getMagicTotalSupply();
  return createJsonResponse(totalSupply);
};

exports.getCirculatingSupply = async (event) => {
  const variant = event?.queryStringParameters?.variant ?? "default";
  const showMore = !!event?.queryStringParameters?.more;
  const data = await getMagicCirculatingSupply(variant);
  return createJsonResponse(showMore ? data : data.circulatingSupply);
};

exports.getPrice = getMagicPrice;
