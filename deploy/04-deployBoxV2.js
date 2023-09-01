const { verify } = require("../utils/verify");
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const args = [];

  const Box = await ethers.getContractFactory("BoxV2");

  const boxV2 = await deploy("BoxV2", {
    from: deployer,
    log: true,
  });

  //  await verify(boxV2.address, args);
};

module.exports.tags = ["all", "BoxV2"];
