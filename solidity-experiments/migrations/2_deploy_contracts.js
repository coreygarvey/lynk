var project = artifacts.require("../contracts/project.sol");

module.exports = function(deployer) {
  deployer.deploy(project);
};
