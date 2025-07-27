const axios = require('axios');

/**
 * Etherscan API wrapper
 * @param {string} module 
 * @param {string} action 
 * @param {Object} params 
 * @returns {Promise<any>}
 */
async function etherscanRequest(module, action, params = {}) {
  const baseURL = `https://api.etherscan.io/api`;
  const apiKey = process.env.ETHERSCAN_API_KEY || '';
  const resp = await axios.get(baseURL, { params: { module, action, ...params, apikey: apiKey } });
  return resp.data;
}

/**
 * BSCScan API wrapper
 */
async function bscscanRequest(module, action, params = {}) {
  const baseURL = `https://api.bscscan.com/api`;
  const apiKey = process.env.BSCSCAN_API_KEY || '';
  const resp = await axios.get(baseURL, { params: { module, action, ...params, apikey: apiKey } });
  return resp.data;
}

/**
 * CryptoCompare API wrapper
 * @param {string} endpoint 
 * @param {Object} params 
 */
async function cryptoCompareRequest(endpoint, params = {}) {
  const baseURL = `https://min-api.cryptocompare.com/data/${endpoint}`;
  const apiKey = process.env.CRYPTOCOMPARE_API_KEY || '';
  const headers = apiKey ? { authorization: `Apikey ${apiKey}` } : {};
  const resp = await axios.get(baseURL, { params, headers });
  return resp.data;
}

/**
 * CoinMarketCap API wrapper
 */
async function coinMarketCapRequest(endpoint, params = {}) {
  const baseURL = `https://pro-api.coinmarketcap.com/v1/${endpoint}`;
  const apiKey = process.env.COINMARKETCAP_API_KEY || '';
  const headers = apiKey ? { 'X-CMC_PRO_API_KEY': apiKey } : {};
  const resp = await axios.get(baseURL, { params, headers });
  return resp.data;
}

/**
 * Moralis API wrapper
 */
async function moralisRequest(endpoint, params = {}) {
  const baseURL = `https://deep-index.moralis.io/api/v2/${endpoint}`;
  const apiKey = process.env.MORALIS_API_KEY || '';
  const headers = apiKey ? { 'X-API-Key': apiKey } : {};
  const resp = await axios.get(baseURL, { params, headers });
  return resp.data;
}

module.exports = {
  etherscanRequest,
  bscscanRequest,
  cryptoCompareRequest,
  coinMarketCapRequest,
  moralisRequest
};
