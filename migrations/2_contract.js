const FundFactory = artifacts.require("FundFactory");

module.exports = function(deployer) {
    deployer.deploy(FundFactory);
};