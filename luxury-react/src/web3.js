import Web3 from 'web3';

let ethereum = window.ethereum;

// Set Provider in web3.js
const web3 = new Web3(ethereum);

// for MetaMask and assume MetaMask is installed
// const web3 = new Web3(window.web3.currentProvider);

// for local Ganache
// const web3 = new Web3(new Web3.probiders.HttpProvider);????????????

export default web3;