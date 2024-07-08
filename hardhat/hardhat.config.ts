import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: "0.8.24",
  networks: {
    hardhat: {
      blockGasLimit: 30_000_000,
      chainId: 31337
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
  },
  mocha: {
    timeout: 60000
  },
  etherscan: {
    apiKey: "1337",
    customChains: [
      {
        chainId: 31337,
        network: "localhost",
        urls: {
          apiURL: "http://127.0.0.1/api",
          browserURL: "http://127.0.0.1/"
        }
      }
    ]
  }
};

export default config;
