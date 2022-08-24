const {
  getMagicCirculatingSupply,
  getMagicTotalSupply,
} = require("../services/magic");

exports.getTotalSupply = async () => {
  const data = await getMagicTotalSupply();
  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
};

exports.getCirculatingSupply = async (event) => {
  const showMore =
    event && event.queryStringParameters && event.queryStringParameters.more;
  const data = await getMagicCirculatingSupply();
  console.log(data);
  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(showMore ? data : data.circulatingSupply),
  };
};
