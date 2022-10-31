import * as ethers from "ethers";
import * as dotenv from "dotenv";
import { expandDecimals, waitForTx } from "./helper";

dotenv.config();

const UtilityContract = require("../artifacts/contracts/FantraToken.sol/FantraToken.json");
const utilityContract = "0x704722A46b0BC205Ac243b632690C1fa8cA7B1eA";

const amount: number = 1000;

const main = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "", provider);
  
    const utilityInstance = new ethers.Contract(
      utilityContract,
      UtilityContract.abi,
      wallet
    );

    const mintTx = await utilityInstance.mint(expandDecimals(amount));
    console.log("Add Item transaction hash", mintTx.hash);
};

main()
  .then()
  .catch((e) => {
    console.log("catch", e);
  });
