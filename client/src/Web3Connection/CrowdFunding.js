import React, { createContext, useEffect, useState } from "react"
import CrowdFunding from '../components/CrowdFunding';
import Web3 from "web3";
import crowAbi from "../contracts/CrowdFunding.json";
export const CrowdFundingPovider = createContext();
const CrowdConnect = (props) => {
    const [web3, setWeb3] = useState("satnam singh");
    const [account, setAccount] = useState();
    const [contract, setContract] = useState();
    const [owner, setOwner] = useState();
    const LoadBlockchain = async() => {
        if (window.ethereum) {
            try {
                const connection = new Web3(window.ethereum);
                setWeb3(connection);
                await window.ethereum.request({method:"eth_requestAccounts"});

                const accounts = await connection.eth.getAccounts();
                setAccount(accounts[0]);
                window.ethereum.on('accountsChanged', (accounts)=>{
                    setAccount(accounts[0]);
                })
                const Abi = crowAbi.abi;
                //const address = crowAbi.networks[5777].address;
                const NetworkId = await connection.eth.net.getId();
                const networkData = crowAbi.networks[NetworkId];
                console.log("contract address is:",networkData.address)
                const contract = new connection.eth.Contract(Abi,networkData.address);
               
                setContract(contract);

                const owner = await contract.methods.Owner().call({from:account});
               
                console.log("owner is :",owner)
       
                setOwner(owner);
                
            } catch (error) {
                console.log("issue during load blockchain data, We are not connect with blockchain");
            }
        } else {
            console.log("Please install vailed provider for your system like Metamask wallet")
        }
    }
    useEffect(()=>{
        LoadBlockchain();
    },[]);
  return (
    <CrowdFundingPovider.Provider value={{web3, account, contract, owner}}>
        <CrowdFunding/>
    </CrowdFundingPovider.Provider>
  )
};

export default CrowdConnect;
