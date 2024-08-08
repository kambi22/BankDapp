// src/Web3Context.js

import React, { createContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import BankABI from '../contracts/Bank.json'; // Ensure this path and ABI is correct

export const Web3Context = createContext();

const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [activeAccount, setActiveAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [owner, setOwner] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3);
      } else {
        console.error("Please install MetaMask!");
      }
    };

    const loadBlockchainData = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
        setActiveAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const bankData = BankABI.networks[networkId];

        if (bankData) {
          const contract = new web3.eth.Contract(BankABI.abi, bankData.address);
          setContract(contract);

          const owner = await contract.methods.owner().call();
          setOwner(owner);

          // Set up event listeners
          contract.events.deposit({}, (error, event) => {
            if (error) {
              console.log("erorr:",error)
            } else {
            console.log('event is:',event)
              
            }
          })
          .on('data', function(event){
            console.log("data event",event); // same results as the optional callback above
        })

          // contract.events.withdraw({}, (error, event) => {
          //   if (error) console.error(error);
          //   setEvents((prevEvents) => [...prevEvents, event]);
          // });
        } else {
          console.error("Smart contract not deployed to detected network.");
        }
      }
    };

    loadWeb3();
    loadBlockchainData();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setActiveAccount(accounts[0]);
      });
    }
  }, [web3]);

  return (
    <Web3Context.Provider value={{ web3, accounts, activeAccount, contract, owner, events }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
