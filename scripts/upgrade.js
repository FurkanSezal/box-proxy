const { deployments, getNamedAccounts } = require("hardhat");
require("dotenv").config();

async function main() {
  /* const provider = new ethers.providers.JsonRpcProvider(
    process.env.MUMBAI_RPC_URL
  ); */

  /*  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const wallet2 = new ethers.Wallet(
    "6451e85bc50299107e13e6249ac903a5b01540800af9a42cb907311b306fba66",
    provider
  ); */

  const [deployer, user] = await ethers.getSigners();
  /*  const BoxV2 = await ethers.getContractFactory("BoxV2");
  let box = await upgrades.upgradeProxy(
    "0x00008273be014F5FDC017ED7c8288543f1d77A08",
    BoxV2
  );
  // const box = BoxV2.attach("0xDf5494a4cc0Ad5fe706Ba02b9C3b9d1ec80c1182");
  console.log("Your upgraded proxy is done!", box.address);
  console.log((await box.getValue()).toString());

  const tx = await box.setup();
  await tx.wait(1);
  console.log((await box.getValue()).toString());  */

  console.log("Upgrading..");
  const proxyAdmin = await ethers.getContract("ProxyAdmin");
  const boxV2 = await ethers.getContract("BoxV2");
  const box = await ethers.getContract("Box");
  const imp = await ethers.getContractFactory("Box");

  // console.log((await box.retrieve()).toString());
  console.log("userAddress:", user.address);
  console.log("box contract address", await box.address);
  console.log("box contract owner", await box.owner());
  console.log("proxyAdmin address: ", await proxyAdmin.address);
  /*  console.log(
    "implementation contract address: ",
    await proxyAdmin.getProxyImplementation(box.address)
  ); */
  console.log("proxyAdmin owner: ", await proxyAdmin.owner());

  console.log("lets transfer ownership");

  await (await box.connect(deployer).transferOwnership(user.address)).wait(1);
  // console.log(imp.attach(await proxyAdmin.getProxyImplementation(box.address)));

  console.log((await box.retrieve()).toString());
  await (await box.connect(user).store(45)).wait(1);
  console.log((await box.retrieve()).toString());
  /*  const tx = await proxyAdmin.upgrade(box.address, boxV2.address);
  await tx.wait(1); */

  const boxNew = boxV2.attach((await deployments.get("Box")).address);
  /*  console.log((await boxNew.x()).toString());
  await (await boxNew.setup()).wait(1);
  console.log((await boxNew.x()).toString()); */
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
