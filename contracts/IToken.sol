// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


interface IToken {

    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);

}

// interface IUniswapV2Router {

//     function getPair(address a, address b) external;

// }