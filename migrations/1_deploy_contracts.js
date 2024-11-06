var Education = artifacts.require("./EducationContract.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Education);
};
