
import http from "./http";

const baseUrl = 'https://datapi.jup.ag/v1'
const baseUrl2 = 'https://datapi.jup.ag/v2'
const baseUrl3 = 'https://fe-api.jup.ag/api/v1'
// 获取 sol 价格以及 指定 token 价格
// https://fe-api.jup.ag/api/v1/prices?list_address=So11111111111111111111111111111111111111112,pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn
export const fetchSolPrice = (address) => {
  return http.get(`${baseUrl3}/prices?list_address=${address}`);
};

// 获取 holder
// https://datapi.jup.ag/v1/holders/pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn
export const fetchHolder = (address) => {
  return http.get(`${baseUrl}/holders/${address}`);
};
//
// https://datapi.jup.ag/v1/txs/pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn
export const fetchTxs = (address) => {
  return http.get(`${baseUrl}/txs/${address}`);
};
//获取价格以及其他基本信息
// https://datapi.jup.ag/v1/assets/search?query=pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn
export const fetchPriceAndCapInfo = (address) => {
  return http.get(`${baseUrl}/assets/search?query=${address}`);
};

// 获取交易历史
// https://datapi.jup.ag/v2/charts/pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn?interval=30_MINUTE&to=1757319721000&candles=300&type=price&quote=usd
export const fetchExchangeHistory = (address) => {
  return http.get(`${baseUrl2}/charts/pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn?interval=30_MINUTE&to=1757319721000&candles=300&type=price&quote=usd`);
};