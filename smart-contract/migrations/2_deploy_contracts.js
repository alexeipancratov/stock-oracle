const StockQuote = artifacts.require("StockQuote");

module.exports = function(deployer) {
  deployer.deploy(StockQuote);
};
