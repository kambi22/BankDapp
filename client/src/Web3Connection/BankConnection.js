import React, { createContext, useEffect, useState } from "react";
import BankFront from "./components/BankFront";
import BankAbi  from './contracts/Bank.json'
import Web3 from "web3";

export const BankContext = createContext();

const BankConnection = (props) => {
    const [web3 ,setweb3 ] = useState(null);
    const [Contract ,setContract ] = useState(null);
    const [account ,setAccount ] = useState(null);
    const [owner ,setowner ] = useState(null);
    useEffect(()=>{
       const initWeb3 = async() => {
        if (window.ethereum) {
            try {
                const connection =  new Web3(window.ethereum);
                await window.ethereum.request({method:"eth_requestAccounts"});
                setweb3(connection);
                console.log("connects is ",connection)
                const accounts = await connection.eth.getAccounts();
                setAccount(accounts[0]);
                window.ethereum.on('accountsChanged', (accounts)=>{
                    setAccount(accounts[0]);
                })
                console.log("account is :",accounts[0]);
                const Abi =  BankAbi.abi;

                const NetworkId = await connection.eth.net.getId();
                const networkData = BankAbi.networks[NetworkId];
                console.log("contract address is:",networkData.address)
                const contract = new connection.eth.Contract(Abi,networkData.address);
                setContract(contract)
                const owner = await contract.methods.owner().call({from:account})
                setowner(owner)
                console.log("owner is",owner)
            
                console.log("defauld Account is" )
               
            } catch (error) {
                console.log("make sure your connected with blockchain  ")
            }
        } else {
            console.log("plese install provider")
        }
       }
     
       initWeb3();
    },[]);
  
    return (
        <BankContext.Provider value={{ web3, account, Contract, owner }}>
            <BankFront />
        </BankContext.Provider>
        
    );
};

export default BankConnection;
