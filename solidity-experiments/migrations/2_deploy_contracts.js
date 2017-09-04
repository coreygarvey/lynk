var project = artifacts.require("../contracts/project.sol");
var drm = artifacts.require("../contracts/Drm.sol");
var project2 = artifacts.require("../contracts/project2.sol");

module.exports = function(deployer) {
  deployer.deploy(project);
  deployer.deploy(drm);
  deployer.deploy(project2);
};
