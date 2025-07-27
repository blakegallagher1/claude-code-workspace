# Setup Instructions for CryptoScout AI Market Scanner

This repository contains the initial Market Scanner agent and supporting modules.

## Prerequisites

- Node.js v18+ installed in your Codespace
- npm CLI

## Install dependencies

Run the following commands in your Codespace terminal:

```
npm init -y
npm install axios dotenv
```

## Environment Variables

Set the following environment variables for API keys (use GitHub Codespaces secrets or `.env` file):

- `ETHERSCAN_API_KEY`
- `BSCSCAN_API_KEY`
- `CRYPTOCOMPARE_API_KEY`
- `COINMARKETCAP_API_KEY`
- `MORALIS_API_KEY`

These keys are required for on-chain and market data queries.

## Run the Market Scanner

To execute the Market Scanner and print a report of newly launched tokens:

```
node coordinator.js
```

The script will output a JSON array of candidate tokens with metrics such as price, volume, liquidity, and launch time.

## Next Steps

- After verifying the Market Scanner output, integrate additional agents following the same design pattern.
- Use the configuration file under `config/marketScannerAgent.yml` as a template for new agents.
- Extend the `utils/apiClients.js` module with additional API wrappers as needed.
