import { ethers } from "hardhat";

async function main() {

    const [owner, acct1, acct2] = await ethers.getSigners();
    const myNFT = await ethers.getContractFactory("TADA");
    const deployMyNFT = await myNFT.deploy("TADA", "TAD");
    await deployMyNFT.deployed();

    console.log(deployMyNFT.address);

    const mint = await deployMyNFT.safeMint(
      owner.address,
      "QmTkFxjmaQvy6pYANoTXbBU3u6wwnvHYWRbCZiyXgsSLJb"
    );
    console.log(mint);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
