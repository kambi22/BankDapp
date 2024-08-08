import React, { useEffect, useState } from "react"
import BankAdvace from "../components/BankAdvance";
import Web3 from "web3";
import AdBankAbi from '../contracts/AdvanceBank.json'

const BankAdvanceCon = (props) => {
    const [web3, setWeb3] = useState();
    const [account, setAccount] = useState();
    const [contract, setContract] = useState();
    const [Manager, setManager] = useState();
    const LoadBlockchain = async() => {
        if (window.ethereum) {
            try {
                const connection = new Web3(window.ethereum);
                setWeb3(connection)
                console.log('web3',connection)
                await window.ethereum.request({ method: "eth_requestAccounts" });

                

                const accounts = await connection.eth.getAccounts();
                setAccount(accounts[0])
                console.log("accouonts",accounts)
                window.ethereum.on("accountsChanged", (accounts) => {
                    setAccount(accounts[0]);
                });
                 

                const Abi = AdBankAbi.abi;
                const netId = await connection.eth.net.getId();
                const netData = AdBankAbi.networks[netId];
                if (netData) {
                    const contract = new connection.eth.Contract(Abi, netData.address);
                    console.log('Contract:', contract);
                    setContract(contract);
                } else {
                    console.log("Contract not deployed to the detected network.");
                }
                //
                

            } catch (error) {
                console.log("Make sure you connected with blockchain")
            }
        } else {
            console.log("Please install vailed provider for your system")
        }
    }
    useEffect(()=>{
        LoadBlockchain();
    },[]);
  return (
    <BankAdvace value={{web3, account, contract}}/>
  )
};

export default BankAdvanceCon;
