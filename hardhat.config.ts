import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();
 
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/bEnNQESSgSFVISuAt8JucMlsPFGHngQO",
      },
    },
    goerli: {
      url: process.env.GOERLI_RPC,
      //@ts-ignore
      accounts: [process.env.PRIVATE_KEY],
    },
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  }
};

export default config;
