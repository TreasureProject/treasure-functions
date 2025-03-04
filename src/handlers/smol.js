const {
  getSmolCirculatingSupply,
  getSmolTotalSupply,
} = require("../services/smol");
const { createJsonResponse } = require("../utils/handler");

exports.getTotalSupply = async (event) => {
  const showMore = !!event?.queryStringParameters?.more;
  const data = await getSmolTotalSupply();
  return createJsonResponse(showMore ? data : data.totalSupply);
};

exports.getCirculatingSupply = async (event) => {
  const showMore = !!event?.queryStringParameters?.more;
  const data = await getSmolCirculatingSupply();
  return createJsonResponse(showMore ? data : data.circulatingSupply);
};
