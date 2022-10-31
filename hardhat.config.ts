import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-waffle";

console.log("process.env.GOERLI_URL",process.env.GOERLI_URL)
const GOERLI_URL = "https://goerli.infura.io/v3/1ab1aff8d8fc45e09d68150fcf0e63bb";
const PRIVATE_KEY_1 = "35f63c4c46e1bc178153129b596caeb1efa8f25b25fb5b4e1b7d94a5344bbfe6";
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY_1],
    },
  }
};

export default config;
