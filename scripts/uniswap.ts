import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { providers } from "ethers";

async function main() {
  //uniswap router address
  const ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  //dai token address
  const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  //uni token address
  const UNI = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  //dai holder
  const DAIHolder = "0x748dE14197922c4Ae258c7939C7739f3ff1db573";

  const amountToSwap = await ethers.utils.parseEther("100")
  console.log(amountToSwap)

  const amountAToProvide = await ethers.utils.parseEther("200");

  const amountADesired = await ethers.utils.parseEther("100");
  const amountBDesired = await ethers.utils.parseEther("100");

  const amountAmin = await ethers.utils.parseEther("0.01");
  const amountBmin = await ethers.utils.parseEther("0.01");

    let time = 1676722995;

  const Uniswap = await ethers.getContractAt("IUniswap", ROUTER);

    const helpers = require("@nomicfoundation/hardhat-network-helpers");
    await helpers.impersonateAccount(DAIHolder);
    const impersonatedSigner = await ethers.getSigner(DAIHolder);

    const DaiContract = await ethers.getContractAt("IToken", DAI);

    const UniContract = await ethers.getContractAt("IToken", UNI);

      const holderBalance = await DaiContract.balanceOf(DAIHolder);
      console.log(`Dai balance ${holderBalance}`);

       const uniBalance = await UniContract.balanceOf(DAIHolder);
       console.log(`uniBalance ${uniBalance}`);

       console.log("____________________ADD LIQUIDITY__________________________");


    await DaiContract.connect(impersonatedSigner).approve(ROUTER, amountToSwap);
    await UniContract.connect(impersonatedSigner).approve(ROUTER, amountToSwap);

    await DaiContract.connect(impersonatedSigner).approve(ROUTER, amountADesired);
    await UniContract.connect(impersonatedSigner).approve(ROUTER, amountBDesired);


    await Uniswap.connect(impersonatedSigner).addLiquidity(
        DAI,
        UNI,
        amountADesired,
        amountBDesired,
        amountAmin,
        amountBmin,
        DAIHolder,
        time
    );
      
    const holderBalanceAfter = await DaiContract.balanceOf(DAIHolder);
    console.log(`Dai balance After ${holderBalanceAfter}`);

    const uniBalanceAfter = await UniContract.balanceOf(DAIHolder);
    console.log(`uniBalance_After ${uniBalanceAfter}`);


    console.log("_______________________ADD LIQUIDITY ETH_______________________________");

    // const amountTokenDesired = await ethers.utils.parseEther("0.001");
    // console.log("balance of amountT0kenDesired")

    // const amountTokenMint = await ethers.utils.parseEther("0.000001");
    // console.log("amountTOkenMint")

    // const amountEthMin = await ethers.utils.parseEther("100");
    // console.log("amountEthMin");

    // await DaiContract.connect(impersonatedSigner).approve(ROUTER, amountToSwap);
    // await UniContract.connect(impersonatedSigner).approve(ROUTER, amountToSwap);

      const amountTokenDesired = await ethers.utils.parseEther("0.1");
      const amountTokenMint = await ethers.utils.parseEther("0.01");
      const amountEthMin = await ethers.utils.parseEther("0");

    await DaiContract.connect(impersonatedSigner).approve(ROUTER, amountTokenMint);

        await Uniswap.connect(impersonatedSigner).addLiquidityETH(
        DAI,
        amountTokenMint,
        amountTokenMint,
        amountEthMin,
        DAIHolder,
        time,
        { value: amountTokenDesired }
    );

      const DaiBalanceAfter = await DaiContract.balanceOf(DAIHolder);
      console.log(`Daibalance After ${DaiBalanceAfter}`);

      const UniBalanceAfter = await UniContract.balanceOf(DAIHolder);
      console.log(`uniBalance_After ${UniBalanceAfter}`);

      console.log("___________________REMOVE LIQUIDITY_____________________________");

      const FACTORY = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

      const factoryConnect = await ethers.getContractAt("IUniswap", FACTORY);

      const getPair = await factoryConnect.getPair(DAI, UNI);

      console.log(` get Pair ${getPair}`);

      const liquidityToken = await ethers.getContractAt("IToken", getPair);
      
      await liquidityToken.connect(impersonatedSigner).approve(ROUTER, amountAToProvide);

      const liquidity = await ethers.utils.parseEther("1");
      const amountAMin = 0;// the minimum amount of token A you want to receive
      const amountBMin = 0; // the minimum amount of token B you want to receive
  // the address that will receive the tokens
       /// the Unix timestamp after which the transaction will expire

  const removeLiquidity = await Uniswap.connect(
    impersonatedSigner
  ).removeLiquidity(
    DAI,
    UNI,
    liquidity,
    amountAMin,
    amountBMin,
    DAIHolder,
    time
  );


  console.log(removeLiquidity);


    console.log("________________________THE END_____________________________")






}

// 150,000 000 000 000 000 000 000

//150 014 568 346 647 994 343 514

// 150 000 000 000 000 000 000 249

// 15,110,085 000 000 000 000 000 000
//15,110 185 000 000 000 000 000 000

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
