const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const args = [];

  const create3Factory = await deploy("Create3Factory", {
    from: deployer,
    log: true,
  });

  // await verify(create3Factory.address, args);
};

module.exports.tags = ["all", "Create3Factory"];
