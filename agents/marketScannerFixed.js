const axios = require('axios');

// Wrapper for CoinGecko (no key required)
async function getMarketData(ids, vsCurrency = 'usd') {
  const url = 'https://api.coingecko.com/api/v3/simple/price';
  const params = {
    ids: ids.join(','),
    vs_currencies: vsCurrency,
    include_24hr_vol: true,
    include_last_updated_at: true,
  };
  const resp = await axios.get(url, { params });
  return resp.data;
}

// Fetch pairs from DexScreener search endpoint
async function getSearchPairs(query = 'pepe') {
  const url = 'https://api.dexscreener.com/latest/dex/search';
  const params = { q: query };
  try {
    const resp = await axios.get(url, { params });
    return resp.data?.pairs || [];
  } catch (err) {
    console.error('Error fetching pairs from DexScreener:', err.message);
    return [];
  }
}

// Filter new pairs based on heuristics: age < 7 days, liquidity & volume thresholds
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
  const reports = [];
  for (const c of candidates) {
    const symbol = c.baseToken?.symbol?.toLowerCase();
    let marketData = {};
    try {
      if (symbol) {
        marketData = await getMarketData([symbol]);
      }
    } catch (err) {
      console.error('Error getting market data:', err.message);
    }
    const md = marketData[symbol] || {};
    reports.push({
      name: c.baseToken?.name,
      symbol: c.baseToken?.symbol,
      address: c.baseToken?.address,
      dex: c.dexId,
      priceUSD: md.usd || null,
      volume24h: Number(c.volume?.h24 || 0),
      liquidityUSD: Number(c.liquidity?.usd || 0),
      launchedAt: c.pairCreatedAt,
      url: `https://dexscreener.com/${c.chainId}/${c.pairAddress}`,
    });
  }
  return reports;
}

// Main scanning function invoked by your Claude sub-agent
async function scanNewTokens() {
  const pairs = await getSearchPairs('pepe'); // default search query, can change to 'eth' or others
  const candidates = filterCandidates(pairs);
  const report = await generateReport(candidates);
  return report;
}

module.exports = {
  scanNewTokens,
  filterCandidates,
  generateReport,
}
