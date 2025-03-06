import { getSmolCirculatingSupply, getSmolTotalSupply } from "../services/smol";
import { createJsonResponse } from "../utils/handler";

interface Event {
  queryStringParameters?: {
    more?: string;
  };
}

export const getTotalSupply = async (event: Event) => {
  const showMore = !!event?.queryStringParameters?.more;
  const data = await getSmolTotalSupply();
  return createJsonResponse(showMore ? data : data.totalSupply);
};

export const getCirculatingSupply = async (event: Event) => {
  const showMore = !!event?.queryStringParameters?.more;
  const data = await getSmolCirculatingSupply();
  return createJsonResponse(showMore ? data : data.circulatingSupply);
};
