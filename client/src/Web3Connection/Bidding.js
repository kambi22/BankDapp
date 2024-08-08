import React, { createContext, useEffect, useState } from "react"
import Bidding from "../components/Bidding";
import Web3 from "web3";
import BidAbi from '../contracts/Bidding.json';
export const BidProvider = createContext();
const BidConnection = (props) => {
    const [web3, setWeb3] = useState();
    const [account, setAccount] = useState();
    const [contract, setContract] = useState();

    const BlockchainConnection = async() => {
        if(window.ethereum){
            try {
                const connection = new Web3(window.ethereum);
                setWeb3(connection)
                await window.ethereum.request({method:"eth_requestAccounts"})

                const accounts = await connection.eth.getAccounts();
                setAccount(accounts[0]);
                await window.ethereum.on("accountsChanged", (accounts)=>{
                    setAccount(accounts[0]);
                })

                const Abi = BidAbi.abi;

                const netId = await connection.eth.net.getId();
                const netData = await BidAbi.networks[netId];

                const Contract = new connection.eth.Contract(Abi, netData.address);
                setContract(Contract);

            } catch (error) {
                console.log("Somthing wrong with connect to blockchain");
            }
        }else{
            console.log("please install vailed provider for your system like metamask")
        }
    }
    useEffect(()=>{
        BlockchainConnection();
    },[]);
  return (
    <BidProvider.Provider value={{web3, account, contract}}>
        <Bidding/>
    </BidProvider.Provider>
  )
};

export default BidConnection;
