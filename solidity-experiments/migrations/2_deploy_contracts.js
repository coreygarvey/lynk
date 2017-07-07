var ProofOfExistence2 = artifacts.require("./ProofOfExistence2.sol");
var Project = artifacts.require("./Project.sol");

module.exports = function(deployer) {
  deployer.deploy(ProofOfExistence2);
  deployer.deploy(Project);
};
