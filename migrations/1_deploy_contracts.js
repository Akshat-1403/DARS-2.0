var Education = artifacts.require("EducationContract");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Education);
};
