import {
  getMagicExchangeInfo as getExchangeInfoService,
  getMagicCirculatingSupply,
  getMagicTotalSupply,
  getMagicPrice as getPriceService,
  getMagicWethSlpPrice as getSlpPriceService,
} from "../services/magic";
import { APIGatewayEvent, APIGatewayResponse } from "../types";
import { createJsonResponse } from "../utils/handler";

export const getTotalSupply = async (
  event: APIGatewayEvent
): Promise<APIGatewayResponse> => {
  const showMore = !!event?.queryStringParameters?.more;
  const data = await getMagicTotalSupply();
  return createJsonResponse(showMore ? data : data.totalSupply);
};

export const getCirculatingSupply = async (
  event: APIGatewayEvent
): Promise<APIGatewayResponse> => {
  const variant = event?.queryStringParameters?.variant ?? "default";
  const showMore = !!event?.queryStringParameters?.more;
  const data = await getMagicCirculatingSupply(variant);
  return createJsonResponse(showMore ? data : data.circulatingSupply);
};

export const getPrice = getPriceService;

export const getMagicExchangeInfo = getExchangeInfoService;

export const getMagicWethSlpPrice = getSlpPriceService;
