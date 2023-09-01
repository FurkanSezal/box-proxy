const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const args = [];
  const proxyAdmin = await deploy("ProxyAdmin", {
    from: deployer,
    log: true,
  });

  // await verify(proxyAdmin.address, args);
};

module.exports.tags = ["all", "proxyAdmin"];
