const { ethers } = require("hardhat");

async function main() {
  const [deployer, user, user1] = await ethers.getSigners();

  const Box = await ethers.getContractFactory("Box");
  const box = Box.attach((await deployments.get("Box")).address);

  // console.log(await Box.owner());

  // await (await box.connect(deployer).transferOwnership(user.address)).wait(1);

  console.log(await box.owner());

  // await (await boxV2.connect(deployer).setX(15)).wait(1);

  /*  await (await boxV2.connect(user).setX(10)).wait(1); */

  //  console.log((await boxV2.x()).toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
