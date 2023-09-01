const { ethers } = require("hardhat");
const create3Abi = require("../create3abi");
require("dotenv").config();

module.exports = async ({ getNamedAccounts, deployments }) => {
const { deploy, log } = deployments;
const { deployer } = await getNamedAccounts();
const args = [];

const Box = await hre.ethers.getContractFactory("Box");
/_ const Create3Factory = await hre.deployments.get("Create3Factory");
const create3Factory = await hre.ethers.getContractAt(
"Create3Factory",
Create3Factory.address
); _/

const provider = new ethers.providers.JsonRpcProvider(
process.env.MUMBAI_RPC_URL
);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const create3Factory = new ethers.Contract(
"0x93FEC2C00BfE902F733B57c5a6CeeD7CD1384AE1",
create3Abi,
provider
);

const ProxyAdmin = await hre.deployments.get("ProxyAdmin");
const proxyAdmin = await hre.ethers.getContractAt(
"ProxyAdmin",
ProxyAdmin.address
);

const box = await Box.connect(wallet).deploy();
await box.deployed();
console.log("box address: ", box.address);

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

const tx2 = await create3Factory
.connect(wallet)
.deploy(
"0x43f379c0214535bb128fca03870dd998b303c983a3d40d49c0ab85fc3f8c0fbb",
TransparentProxyCreationCode
);
const receipt = await tx2.wait();
console.log(receipt);
/\* const parsedEvents = receipt.events?.map((event) => {
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
)?.args;

console.log("proxyAddress: ", contractAddress);
await hre.deployments.save("Box", {
address: contractAddress,
abi: JSON.parse(Box.interface.format("json")),
}); \*/
};
const getCreationCode = async ({ contractName, constructorArgs }) => {
const bytecode = (await ethers.getContractFactory(contractName)).bytecode;

return `${bytecode}${ethers.utils.defaultAbiCoder
    .encode(constructorArgs.types, constructorArgs.values)
    .slice(2)}`;
};

module.exports.tags = ["all", "proxy"];
