require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy-ethers");
require("dotenv").config();

const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL;
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      chainId: 31337,
      url: "http://127.0.0.1:8545/",
    },

    ganache: {
      chainId: 1337,
      url: "http://127.0.0.1:7545/",
      accounts: [
        "d161029f74f34e340e51b157c9be8109108863824959b23c51441680a8737c1c",
      ],
    },
    mumbai1: {
      url: MUMBAI_RPC_URL,
      chainId: 80001,
      accounts: [PRIVATE_KEY],
      blockConfirmations: 6,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
    },
  },
  solidity: "0.8.18",
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY,
      polygonMumbai: process.env.ETHERSCAN_API_KEY_MUMBAI,
    },
  },
};
