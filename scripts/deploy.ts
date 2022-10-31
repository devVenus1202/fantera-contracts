import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const UtilityToken = await ethers.getContractFactory("FantraToken");
  const token = await UtilityToken.deploy(0);

  console.log("FantraToken is deployed -> address: ", token.address);

  const Collection = await ethers.getContractFactory("FantraCollection");
  const collection = await Collection.deploy(token.address);

  console.log("FantraCollection is deployed -> address: ", collection.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })