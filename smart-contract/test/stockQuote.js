const StockQuote = artifacts.require("StockQuote");

contract('StockQuote', (accounts) => {
  it('should return correct oracle owner', async () => {
    const instance = await StockQuote.new();
    console.log(instance);
    const owner = await instance.methods.oracleOwner.call();

    assert.equal(owner, accounts[0], "Oracle owner is not the same as contract creator");
  });
});
