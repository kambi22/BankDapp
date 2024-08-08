import React, { createContext, useEffect, useState } from "react"
import Routing from "../components/Addvance Bank Project/Routing";
import Web3 from "web3";
import BankAbi from '../contracts/AdvanceBank.json';
export const BlockchainContext = createContext();
const BankAddvance = (props) => {
    const [web3, setWeb3] = useState();
    const [contract, setContract] = useState();
    const [account, setAccount] = useState();
    const [contractAddress, setContractAddress] = useState();

    useEffect(()=>{
        LoadBlockchain();
    },[]);

    const LoadBlockchain = async() => {
        if (window.ethereum) {
          try {
            const connection = new Web3(window.ethereum);
            setWeb3(connection);
            connection.eth.getBalance()
      


            await window.ethereum.request({method:"eth_requestAccounts"});

            const accounts = await connection.eth.getAccounts();
                setAccount(accounts[0]);
                window.ethereum.on('accountsChanged', (accounts)=>{
                    setAccount(accounts[0]);
                })
               
          const Abi = BankAbi.abi;

          const netId = await connection.eth.net.getId();
          const netData = await  BankAbi.networks[netId];
          setContractAddress(netData.address)
          const contract = new connection.eth.Contract(Abi, netData.address)
          setContract(contract)
       


            } catch (error) {
            alert("Error Load Data From Blockchain")
          }
        } else {
          alert("Please Install Metamask Wallet")
        }
    }
  return (
    <BlockchainContext.Provider value={{web3, contract, account, contractAddress}}>
        <Routing/>
    </BlockchainContext.Provider>
  )
};

export default BankAddvance;
