# CryptoScout AI

A multi-agent cryptocurrency research and analysis platform built with Claude Code.

## Project Structure

- `agents/`: Contains agent implementations.
  - `marketScanner.js`: Market Scanner agent code that fetches new token listings from DexScreener and CoinGecko.

- `config/`: YAML configuration files for each Claude sub-agent. Example: `marketScannerAgent.yml`.

- `utils/`: Utility modules for API clients (Etherscan, BSCScan, etc.) used by agents.

- `coordinator.js`: Orchestrates the agents and triggers scanning.

- `setup_instructions.md`: Step-by-step instructions for installing dependencies, setting environment variables, and running the agents.

## Getting Started

1. Clone the repository in your codespace.
2. Run `npm init -y` and `npm install axios dotenv` to install dependencies.
3. Set API keys as environment variables (e.g., `ETHERSCAN_API_KEY`, `BSCSCAN_API_KEY`).
4. Run the coordinator script:
   ```bash
   node coordinator.js
   ```
5. Expand the project by adding additional agents for social sentiment, technical analysis, etc. using the template files.

## Contributing

Pull requests are welcome.
