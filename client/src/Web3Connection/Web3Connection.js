import { useEffect } from "react";
import Web3 from "web3";
import Bank from '../contracts/Bank.json'
import simpleAbi from '../contracts/SimpleStorage.json'
//import { Contract } from "web3-eth-contract";

let web3;
let contract;
let account;
let simple;

const Connection = async () => {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.request({method:"eth_requestAccounts"});
        const accounts = await web3.eth.getAccounts();
        account = accounts[0];
        console.log("account si",account)
        const abi = Bank.abi;
        const SimpleAbi = simpleAbi.abi;
        const NetworkId = await web3.eth.net.getId();
        const networkData = Bank.networks[NetworkId];
        const simpleData = simpleAbi.networks[NetworkId];

        const contractAddress = networkData && networkData.address
        if (!contractAddress) {
          throw new Error('Contract not deployed on the current network');
        }
        const simple = new web3.eth.Contract(SimpleAbi, simpleData.address)
        contract = new web3.eth.Contract(abi, contractAddress);
      return account;

      } catch (error) {
        console.error("User denied account access or error occurred:", error);
        throw error;
      }
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      throw new Error('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };

export {Connection};