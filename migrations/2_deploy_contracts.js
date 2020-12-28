const router = artifacts.require("ServiceRouter");

module.exports = function(deployer) {
  deployer.deploy(router, 'Robby');
};
