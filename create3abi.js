const create3Abi = [
  {
    inputs: [
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      { internalType: "bytes", name: "creationCode", type: "bytes" },
    ],
    name: "deploy",
    outputs: [{ internalType: "address", name: "deployed", type: "address" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "deployer", type: "address" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
    ],
    name: "getDeployed",
    outputs: [{ internalType: "address", name: "deployed", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

module.exports = create3Abi;
