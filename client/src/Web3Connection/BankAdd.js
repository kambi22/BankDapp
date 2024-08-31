import React, { createContext, useEffect, useState } from "react"
import Routing from "../components/Addvance Bank Project/Routing";
import Web3, { ConnectionNotOpenError } from 'web3'
import BankAbi from '../contracts/AdvanceBank.json';
import SimpleAbi from '../contracts/SimpleStorage.json';
import Simple from "../components/Addvance Bank Project/simpleStorage";
import { Connection } from "./Web3Connection";
export const BlockchainContext = createContext();
const BankAddvance = (props) => {
    const [web3, setWeb3] = useState();
    const [contract, setContract] = useState();
    const [account, setAccount] = useState();
    const [contractAddress, setContractAddress] = useState();
    const [simple, setSimple] = useState();

    useEffect(()=>{
        LoadBlockchain();
    },[]);

    const LoadBlockchain = async() => {
        if (window.ethereum) {
        
          try {
            const connection = new Web3(new Web3.providers.HttpProvider('https://holesky.infura.io/v3/976912e38cc7411298f6682305819c51'));
            setWeb3(connection);

            await window.ethereum.request({method:"eth_requestAccounts"});

            const accounts = await connection.eth.getAccounts();
                setAccount(accounts[0]);
                window.ethereum.on('accountsChanged', (accounts)=>{
                    setAccount(accounts[0]);
                })
               
         // const Abi = BankAbi.abi;
          const simpleAbi = SimpleAbi.abi;
          console.log('simple Abi:',simpleAbi)

          const netId = await connection.eth.net.getId();
          //const netData = await  BankAbi.networks[netId];
          const simpleData = await SimpleAbi.networks[netId];
          const contractAddress = {
            5777: "0x601D182984d2ff5a77929393d0de3097E929961f",
            17000: "0x56FA819DED33dB5c60f23BaFdB7e94e154EC1222"
        };

          console.log('network id:',netId);
          console.log('simple storage address: ',simpleData.address)


          //setContractAddress(netData.address)
          //const contract = new connection.eth.Contract(Abi, netData.address)
          const simpleContract = new connection.eth.Contract(simpleAbi, contractAddress)
          console.log('simple storage contract insetence:',simpleContract)
          setSimple(simpleContract)
          //setContract(contract)
       


            } catch (error) {
            console.log("Error Load Data From Blockchain")
          }
        } else {
          alert("Please Install Metamask Wallet")
        }
    }
  return (
    <BlockchainContext.Provider value={{web3, contract,simple, account, contractAddress}}>
        <Routing/>
    </BlockchainContext.Provider>
  )
};

export default BankAddvance;
