const axios = require('axios');

// Wrapper for CoinGecko (no key required)
async function getMarketData(ids, vsCurrency = 'usd') {
  const url = `https://api.coingecko.com/api/v3/simple/price`;
  const params = { ids: ids.join(','), vs_currencies: vsCurrency, include_24hr_vol: true, include_last_updated_at: true };
  const resp = await axios.get(url, { params });
  return resp.data;
}

// Wrapper for DexScreener (open API for latest pairs on Uniswap)
async function getLatestPairs() {
  const url = `https://api.dexscreener.com/latest/dex/pairs/uniswap`;
  const resp = await axios.get(url);
  return resp.data.pairs || [];
}

// Filter new tokens based on heuristics: age < 7 days, liquidity & volume thresholds
function filterCandidates(pairs) {
  const now = Date.now();
  return pairs.filter((p) => {
    const ageDays = (now - new Date(p.pairCreatedAt).getTime()) / (24 * 3600 * 1000);
    return (
      ageDays < 7 &&
      Number(p.liquidity?.usd || 0) > 50000 &&
      Number(p.volume?.h24 || 0) > 20000
    );
  });
}

// Assemble a report for each candidate
async function generateReport(candidates) {
  const ids = candidates.map((c) => c.baseToken?.address).filter(Boolean);
  const marketData = await getMarketData(ids);

  return candidates.map((c) => {
    const id = c.baseToken?.address;
    const md = marketData[id] || {};
    return {
      name: c.baseToken?.name,
      symbol: c.baseToken?.symbol,
      address: id,
      dex: c.dexId,
      priceUSD: md.usd || null,
      volume24h: Number(c.volume?.h24 || 0),
      liquidityUSD: Number(c.liquidity?.usd || 0),
      launchedAt: c.pairCreatedAt,
      url: `https://dexscreener.com/${c.chainId}/${c.pairAddress}`
    };
  });
}

// Main scanning function invoked by your Claude sub-agent
async function scanNewTokens() {
  const pairs = await getLatestPairs();
  const candidates = filterCandidates(pairs);
  const report = await generateReport(candidates);
  return report;
}

module.exports = {
  scanNewTokens,
  filterCandidates,
  generateReport
};
