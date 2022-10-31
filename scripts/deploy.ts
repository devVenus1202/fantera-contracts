import * as ethers from "ethers";
import * as dotenv from "dotenv";
import { expandDecimals, waitForTx } from "./helper";

dotenv.config();

async function main() {  
  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "", provider);
  
  const UtilityContract = require("../artifacts/contracts/FanteraToken.sol/FanteraToken.json");  
  const CollectionContract = require("../artifacts/contracts/FanteraCollection.sol/FanteraCollection.json");  

  const FanteraTokenfactory = new ethers.ContractFactory(UtilityContract.abi, UtilityContract.bytecode, wallet);
  const token = await FanteraTokenfactory.deploy(0);

  console.log("FanteraToken is deployed -> address: ", token.address);  

  const CollectionFactory = new ethers.ContractFactory(CollectionContract.abi, CollectionContract.bytecode, wallet);
  const collection = await CollectionFactory.deploy(token.address);

  console.log("FanteraCollection is deployed -> address: ", collection.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })