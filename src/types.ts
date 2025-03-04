import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export type APIGatewayEvent = APIGatewayProxyEvent;
export type APIGatewayResponse = APIGatewayProxyResult;

export interface JsonResponse {
  statusCode: number;
  headers: {
    "Content-Type": string;
    "Access-Control-Allow-Origin": string;
    "Access-Control-Allow-Credentials": boolean;
  };
  body: string;
}

export interface TotalSupplyResult {
  totalSupply: number;
  totalSupplyTreasure?: number;
  totalSupplyEth?: number;
  excludedBalances?: {
    name: string;
    addresses: string[];
    balance: number;
  }[];
}

export interface CirculatingSupplyResult {
  totalSupply: number;
  totalExcluded: number;
  circulatingSupply: number;
  excludedBalances?: {
    name: string;
    addresses: string[];
    balance: number;
  }[];
}

export interface PriceResult {
  ethUsd: number;
  magicEth: number;
  magicUsd: number;
}

export interface SlpPriceResult {
  magic: number;
  eth: number;
}

export interface ExchangeInfoItem {
  symbol: string;
  provider: string;
  lastUpdatedTimestamp: number;
  currencyCode: string;
  price: number;
  marketCap: number;
  accTradePrice24h: number;
  circulatingSupply: number;
  maxSupply: number;
}
