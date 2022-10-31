import * as ethers from "ethers";
import * as dotenv from "dotenv";
import { expandDecimals, waitForTx } from "./helper";

dotenv.config();

const CollectionContract = require("../artifacts/contracts/FantraCollection.sol/FantraCollection.json");
const collectionAddress = "0xe66526b89EBeD1dfE1B9421Fa86E2faf27c9fa98";
const UtilityContract = require("../artifacts/contracts/FantraToken.sol/FantraToken.json");
const utilityAddress = "0x704722A46b0BC205Ac243b632690C1fa8cA7B1eA";
const tokenId = 0;
const amount : number = 500;

const uri = "https://gateway.pinata.cloud/ipfs/QmZ4bHZbhsiu5uzbgom7PVueQo16uDeQFQMEfpaxuJeRVu?filename=0000000000000000000000000000000000000000000000000000000000000001.json";

const main = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "", provider);

    const utilityInstance = new ethers.Contract(
      utilityAddress,
      UtilityContract.abi,
      wallet
    );
  
    const collectionInstance = new ethers.Contract(
      collectionAddress,
      CollectionContract.abi,
      wallet
    );    

    // approve the erc20 token to transfer to collection contract
    const approveTx = await utilityInstance.approve(collectionAddress, expandDecimals(amount));

    // wait for while approve transaction is successed...
    await waitForTx(provider, approveTx.hash);

    // depost erc20 token to collection contract & mint NFT to target address
    const mintTx = await collectionInstance.safeMint(tokenId, uri, expandDecimals(amount));
    console.log("Add Item transaction hash", mintTx.hash);
};

main()
  .then()
  .catch((e) => {
    console.log("catch", e);
  });
