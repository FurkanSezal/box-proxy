// scripts/prepare_upgrade.js
async function main() {
  const proxyAddress = await deployments.get("Box").address;
  const BoxV2 = await ethers.getContractFactory("BoxV2");

  const box = await BoxV2.attach(proxyAddress);
  console.log((await box.getValue()).toString());

  console.log("owner: ", await box.owner());

  console.log((await box.getValue()).toString());
  console.log("value: ", (await box.retrieve()).toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
