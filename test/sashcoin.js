const SashCoin = artifacts.require("SashCoin");

contract('SashCoin', (accounts) => {
  it('should put 10000 SashCoin in the first account', async () => {
    const sashCoinInstance = await SashCoin.deployed();
    const balance = await sashCoinInstance.getBalance.call(accounts[0]);

    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });
  it('should call a function that depends on a linked library', async () => {
    const sashCoinInstance = await SashCoin.deployed();
    const sashCoinBalance = (await sashCoinInstance.getBalance.call(accounts[0])).toNumber();
    const sashCoinEthBalance = (await sashCoinInstance.getBalanceInEth.call(accounts[0])).toNumber();

    assert.equal(sashCoinEthBalance, 2 * sashCoinBalance, 'Library function returned unexpected function, linkage may be broken');
  });
  it('should send coin correctly', async () => {
    const sashCoinInstance = await SashCoin.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await sashCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await sashCoinInstance.getBalance.call(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await sashCoinInstance.sendCoin(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await sashCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await sashCoinInstance.getBalance.call(accountTwo)).toNumber();


    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
