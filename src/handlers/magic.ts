import {
  getMagicCirculatingSupply,
  getMagicPrice,
  getMagicTotalSupply,
} from "../services/magic";
import { createJsonResponse } from "../utils/handler";

export const getTotalSupply = async () => {
  const totalSupply = await getMagicTotalSupply();
  return createJsonResponse(totalSupply);
};

export const getCirculatingSupply = async (event) => {
  const variant = event?.queryStringParameters?.variant ?? "default";
  const showMore = !!event?.queryStringParameters?.more;
  const data = await getMagicCirculatingSupply(variant);
  return createJsonResponse(showMore ? data : data.circulatingSupply);
};

export const getPrice = getMagicPrice;
