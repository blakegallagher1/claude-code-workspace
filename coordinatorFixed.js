const { scanNewTokens } = require('./agents/marketScannerFixed');

async function run() {
  try {
    const report = await scanNewTokens();
    console.log(JSON.stringify(report, null, 2));
  } catch (err) {
    console.error('Error running Market Scanner:', err);
  }
}

if (require.main === module) {
  run();
}

module.exports = {
  run
};
