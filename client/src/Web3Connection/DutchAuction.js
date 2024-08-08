import React, { useEffect, useState } from "react";

import Web3 from "web3";
import DutchAbi from '../contracts/DutchAuction.json';
import DutchAuction from "../components/DutchAucntion";

const DutchConnection = (props) => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);

    const blockchain = async () => {
        if (window.ethereum) {
            try {
                const connection = new Web3(window.ethereum);
                await window.ethereum.request({ method: "eth_requestAccounts" });
                setWeb3(connection);

                const accounts = await connection.eth.getAccounts();
                console.log('Accounts:', accounts);
                setAccount(accounts[0]);

                window.ethereum.on("accountsChanged", (accounts) => {
                    setAccount(accounts[0]);
                });

                const Abi = DutchAbi.abi;
                const netId = await connection.eth.net.getId();
                const netData = DutchAbi.networks[netId];

                if (netData) {
                    const contract = new connection.eth.Contract(Abi, netData.address);
                    console.log('Contract:', contract);
                    setContract(contract);
                } else {
                    console.log("Contract not deployed to the detected network.");
                }
            } catch (error) {
                console.error("Error connecting to blockchain:", error);
            }
        } else {
            console.log("Please install a web3 provider like MetaMask.");
        }
    };

    useEffect(() => {
        blockchain();
        return () => {
            // Clean up event listeners on component unmount
            window.ethereum.removeListener("accountsChanged", setAccount);
        };
    }, []);

    return (
        <DutchAuction value={{web3, account, contract}}/>
    );
};

export default DutchConnection;
