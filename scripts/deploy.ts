import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const UtilityToken = await ethers.getContractFactory("FanteraToken");
  const token = await UtilityToken.deploy(0);

  console.log("FanteraToken is deployed -> address: ", token.address);

  const Collection = await ethers.getContractFactory("FanteraCollection");
  const collection = await Collection.deploy(token.address);

  console.log("FanteraCollection is deployed -> address: ", collection.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })