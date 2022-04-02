const ConvertLib = artifacts.require("ConvertLib");
const SashCoin = artifacts.require("SashCoin");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, SashCoin);
  deployer.deploy(SashCoin);
};
