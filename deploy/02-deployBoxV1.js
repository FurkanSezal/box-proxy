module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const args = [];

  const Box = await hre.ethers.getContractFactory("Box");
  const Create3Factory = await hre.deployments.get("Create3Factory");
  const create3Factory = await hre.ethers.getContractAt(
    "Create3Factory",
    Create3Factory.address
  );

  const ProxyAdmin = await hre.deployments.get("ProxyAdmin");
  const proxyAdmin = await hre.ethers.getContractAt(
    "ProxyAdmin",
    ProxyAdmin.address
  );

  const box = await Box.deploy();
  await box.deployed();
  console.log("box address: ", box.address); // implementation contract address

  const functionData = box.interface.encodeFunctionData("initialize", [
    42,
    deployer,
  ]);

  const TransparentProxyCreationCode = await getCreationCode({
    contractName: "TransparentProxy",
    constructorArgs: {
      types: ["address", "address", "bytes"],
      values: [box.address, proxyAdmin.address, functionData],
    },
  });

  const argsProxy = [box.address, proxyAdmin.address, functionData];
  const tx2 = await deploy("TransparentProxy", {
    from: deployer,
    log: true,
    args: argsProxy,
  });

  /* const tx2 = await create3Factory.deploy(
    "0x43f379c0214535bb128fca03870dd998b303c983a3d40d49c0ab85fc3f8c0fdf",
    TransparentProxyCreationCode
  ); */

  const receipt = tx2.address;
  // console.log(receipt);
  /*   const parsedEvents = receipt.events?.map((event) => {
    return {
      name: event.event,
      args: event.args,
    };
  });

  if (!parsedEvents) {
    throw new Error("No events found");
  }

  const { contractAddress } = parsedEvents.find(
    (event) => event.name === "Deployed"
  )?.args; */

  console.log("proxyAddress: ", receipt);
  await hre.deployments.save("Box", {
    address: receipt,
    abi: JSON.parse(Box.interface.format("json")),
  });
};
const getCreationCode = async ({ contractName, constructorArgs }) => {
  const bytecode = (await ethers.getContractFactory(contractName)).bytecode;

  return `${bytecode}${ethers.utils.defaultAbiCoder
    .encode(constructorArgs.types, constructorArgs.values)
    .slice(2)}`;
};

module.exports.tags = ["all", "proxy"];
