pragma solidity >=0.4.25 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SashCoin.sol";

contract TestSashCoin {

  function testInitialBalanceUsingDeployedContract() public {
    SashCoin meta = SashCoin(DeployedAddresses.SashCoin());

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 SashCoin initially");
  }

  function testInitialBalanceWithNewSashCoin() public {
    SashCoin meta = new SashCoin();

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 SashCoin initially");
  }

}
