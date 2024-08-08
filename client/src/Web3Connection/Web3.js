// File: src/web3.js
import Web3 from "web3";
import SimpleStorage from '../contracts/SimpleStorage.json';

let web3;
let contract;
let account;


const initWeb3 = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.request({method:"eth_requestAccounts"});
      const accounts = await web3.eth.getAccounts();
      account = accounts[0];
      
      const abi = SimpleStorage.abi;
      const NetworkId = await web3.eth.net.getId();
      const networkData = SimpleStorage.networks[NetworkId];
      const contractAddress = networkData && networkData.address
      if (!contractAddress) {
        throw new Error('Contract not deployed on the current network');
      }

      contract = new web3.eth.Contract(abi, contractAddress);
      
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

const readValue = async () => {
  try {
    if (!contract) {
      await initWeb3();
    }
    const value = await contract.methods.read().call({ from: account });
    return value;
  } catch (err) {
    console.error("Error reading value from contract: ", err);
    throw err;
  }
};

const writeValue = async (newValue) => {
  try {
    if (!contract) {
      await initWeb3();
    }
    await contract.methods.write(newValue).send({ from: account });
    const value = await readValue();
    return value;
  } catch (err) {
    console.error("Error writing value to contract: ", err);
    throw err;
  }
};

const CheckBalance = () => {
    if (web3 && account) {
      try {
        const balance = web3.eth.getBalance(account);
        return balance;
      } catch (error) {
        console.log(error,"Balance is not detected");
      }
    }
}

export { readValue, writeValue,CheckBalance };
